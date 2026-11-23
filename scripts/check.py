#!/usr/bin/env python3
"""Lightweight structural checks for the three static ZSP6 pages; no network needed."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = ('index.html', 'oficjalna.html', 'kreatywna.html')


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.nodes = []
        self.contact_depth = 0
        self.contact_controls = []
        self.feed(path.read_text(encoding='utf-8'))
        self.ids = Counter(attrs['id'] for _, attrs, _ in self.nodes if attrs.get('id'))

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        self.nodes.append((tag, attrs, self.getpos()[0]))
        if tag == 'form' and 'data-contact-form' in attrs:
            self.contact_depth += 1
        if self.contact_depth and tag in ('input', 'textarea', 'select', 'button'):
            self.contact_controls.append((tag, attrs, self.getpos()[0]))

    def handle_startendtag(self, tag, pairs):
        self.handle_starttag(tag, pairs)

    def handle_endtag(self, tag):
        if tag == 'form' and self.contact_depth:
            self.contact_depth -= 1


def check():
    pages = {name: Page(ROOT / name) for name in PAGES}
    issues = []
    checked_links = 0
    checked_assets = 0

    def fail(name, line, message):
        issues.append(f'{name}:{line}: {message}')

    for name, page in pages.items():
        for value, count in page.ids.items():
            if count != 1:
                fail(name, 1, f'duplicate id={value!r} ({count})')
        for required_tag in ('h1', 'main', 'title'):
            count = sum(tag == required_tag for tag, _, _ in page.nodes)
            if count != 1:
                fail(name, 1, f'expected one {required_tag}, found {count}')
        for tag, attrs, line in page.nodes:
            if tag == 'html' and attrs.get('lang') != 'pl':
                fail(name, line, 'missing Polish document language')
            if tag == 'img':
                if 'alt' not in attrs:
                    fail(name, line, 'image has no alt attribute')
                if not attrs.get('width') or not attrs.get('height'):
                    fail(name, line, 'image has no intrinsic width/height')
            for key in ('aria-labelledby', 'aria-describedby', 'aria-controls'):
                for target in (attrs.get(key) or '').split():
                    if target not in page.ids:
                        fail(name, line, f'{key} references absent id={target!r}')
            if tag == 'label' and attrs.get('for') and attrs['for'] not in page.ids:
                fail(name, line, f'label references absent id={attrs["for"]!r}')
            for key in ('href', 'src'):
                value = attrs.get(key)
                if not value:
                    continue
                url = urlsplit(value)
                if url.scheme or url.netloc:
                    continue
                target_path = (page.path.parent / unquote(url.path)).resolve() if url.path else page.path
                if url.path and not target_path.is_file():
                    fail(name, line, f'missing local {key}: {value}')
                    continue
                if tag in ('script', 'link', 'img', 'source'):
                    checked_assets += 1
                if tag == 'a':
                    checked_links += 1
                if url.fragment:
                    target_page = next((item for item in pages.values() if item.path.resolve() == target_path), None)
                    if target_page and unquote(url.fragment) not in target_page.ids:
                        fail(name, line, f'broken fragment: {value}')
        for tag, attrs, line in page.contact_controls:
            if attrs.get('name'):
                fail(name, line, 'contact demo has a serializable named field')
            if tag == 'button' and attrs.get('type', 'submit').lower() == 'submit':
                fail(name, line, 'contact demo has a native submit button')
            if tag == 'input' and attrs.get('type', '').lower() in ('submit', 'image'):
                fail(name, line, 'contact demo has a native submit control')

    for css in (ROOT / 'assets').glob('*.css'):
        for value in re.findall(r'url\(\s*[\'"]?([^\'"\)]+)', css.read_text(encoding='utf-8')):
            url = urlsplit(value.strip())
            if not url.scheme and not url.netloc and url.path:
                checked_assets += 1
                if not (css.parent / unquote(url.path)).is_file():
                    fail(css.name, 1, f'missing CSS asset: {value}')
    for script in ('site.js',):
        result = subprocess.run(['node', '--check', str(ROOT / 'assets' / script)], capture_output=True, text=True)
        if result.returncode:
            fail(script, 1, result.stderr.strip())
    if issues:
        print('\n'.join(issues))
        return 1
    print(f'PASS: {len(pages)} HTML pages; {checked_links} local links; {checked_assets} local assets; unique IDs, ARIA references, labels, image attributes, no contact serialization; 1 JavaScript syntax check.')
    print('Scope: static structure only. Remote resources, visual layout, accessibility interaction and deployment need separate checks.')
    return 0


if __name__ == '__main__':
    sys.exit(check())
