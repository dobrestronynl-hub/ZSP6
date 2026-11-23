/* ZSP6 — local demonstration interactions. No analytics, persistence or backend. */
(() => {
  'use strict';

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const normalize = value => String(value).toLocaleLowerCase('pl').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
  const compact = value => String(value || '').replace(/\s+/g, ' ').trim();
  const plainClick = event => !event.ctrlKey && !event.metaKey && !event.shiftKey &&
    !event.altKey && (event.button === undefined || event.button === 0);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const visible = node => !node.closest('[hidden], [inert]') && node.getClientRects().length > 0;
  const focusTarget = node => {
    if (!node) return;
    const temporary = !node.hasAttribute('tabindex') && !node.matches('a,button,input,textarea,select');
    if (temporary) {
      node.setAttribute('tabindex', '-1');
      node.addEventListener('blur', () => node.removeAttribute('tabindex'), { once: true });
    }
    node.focus({ preventScroll: true });
  };

  // One overlay at a time, with the rest of the page inert and focus restored on dismissal.
  let activeOverlay = null;
  function modal(dialog) {
    let previousFocus = null;
    let background = [];
    let wasScrollLocked = false;
    const restore = () => {
      background.forEach(({ node, inert, hidden }) => {
        node.inert = inert;
        if (hidden === null) node.removeAttribute('aria-hidden');
        else node.setAttribute('aria-hidden', hidden);
      });
      background = [];
    };
    const close = (returnFocus = true) => {
      if (dialog.hidden) return;
      dialog.hidden = true;
      restore();
      if (!wasScrollLocked) document.body.classList.remove('no-scroll');
      if (activeOverlay === controls) activeOverlay = null;
      if (returnFocus) {
        const returnTarget = previousFocus?.isConnected && visible(previousFocus) ? previousFocus :
          qa('[data-menu-toggle], [data-search-open]').find(visible);
        returnTarget?.focus();
      }
    };
    const open = firstFocus => {
      if (activeOverlay) activeOverlay.close();
      previousFocus = document.activeElement;
      document.dispatchEvent(new CustomEvent('zsp:overlayopen'));
      wasScrollLocked = document.body.classList.contains('no-scroll');
      dialog.hidden = false;
      dialog.setAttribute('aria-modal', 'true');
      document.body.classList.add('no-scroll');
      (firstFocus || q('button,input,a[href]', dialog) || dialog).focus();
      background = [...document.body.children]
        .filter(node => node !== dialog && !node.contains(dialog) && !node.matches('script,style'))
        .map(node => ({ node, inert: node.inert, hidden: node.getAttribute('aria-hidden') }));
      background.forEach(({ node }) => {
        node.inert = true;
        node.setAttribute('aria-hidden', 'true');
      });
      activeOverlay = controls;
    };
    dialog.addEventListener('click', event => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
      if (event.key !== 'Tab') return;
      const nodes = qa('a[href],button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[tabindex="0"]', dialog)
        .filter(visible);
      if (!nodes.length) { event.preventDefault(); return; }
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    });
    const controls = { open, close };
    return controls;
  }

  function navigation() {
    qa('[data-menu-toggle]').forEach(button => {
      const menu = document.getElementById(button.getAttribute('aria-controls'));
      if (!menu) return;
      const close = returnFocus => {
        const wasOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        if (returnFocus && wasOpen) button.focus();
      };
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('open', open);
      });
      menu.addEventListener('click', event => {
        if (event.target.closest('a')) close(false);
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
          event.preventDefault(); close(true);
        }
      });
      document.addEventListener('click', event => {
        if (!menu.contains(event.target) && !button.contains(event.target)) close(false);
      });
      document.addEventListener('zsp:overlayopen', () => close(false));
      window.addEventListener('resize', () => {
        if (getComputedStyle(button).display === 'none') close(false);
      }, { passive: true });
      window.addEventListener('pageshow', () => close(false));
    });
  }

  const courses = {
    plastyk: {
      title: 'Liceum Sztuk Plastycznych',
      detail: 'Rysunek, malarstwo i projektowanie. Nauka łączy warsztat artystyczny z projektowaniem graficznym oraz projektowaniem przestrzeni.',
      url: 'https://zsp6tom.pl/?page_id=3467'
    },
    foto: {
      title: 'Technik fotografii i multimediów',
      detail: 'Praca z obrazem: fotografia, oświetlenie, obróbka zdjęć i multimedia. Zobacz program oraz informacje o kierunku na stronie szkoły.',
      url: 'https://zsp6tom.pl/?page_id=23259'
    },
    grafik: {
      title: 'Technik grafiki i poligrafii cyfrowej',
      detail: 'Projektowanie materiałów graficznych i publikacji, przygotowanie do druku oraz poligrafia cyfrowa. Zobacz szczegóły programu szkoły.',
      url: 'https://zsp6tom.pl/?page_id=3520'
    },
    fryzjer: {
      title: 'Technik usług fryzjerskich',
      detail: 'Techniki fryzjerskie, stylizacja i zajęcia praktyczne. Szkoła przedstawia ten kierunek z dodatkowym profilem kosmetycznym.',
      url: 'https://zsp6tom.pl/?page_id=23255'
    }
  };
  const courseData = button => {
    const base = courses[button.dataset.courseSelect];
    if (!base) return null;
    return {
      title: button.dataset.courseTitle || base.title,
      detail: button.dataset.courseDescription || base.detail,
      url: button.dataset.courseUrl || base.url
    };
  };

  function buildSearchIndex() {
    const index = [], seen = new Set();
    let serial = 0;
    const anchorFor = node => {
      if (!node.id) {
        let id;
        do { serial += 1; id = 'search-entry-' + serial; }
        while (document.getElementById(id));
        node.id = id;
      }
      return '#' + node.id;
    };
    const add = (type, title, description, url, keywords = '') => {
      title = compact(title);
      if (!title || !url) return;
      const key = normalize(title) + '|' + url;
      if (seen.has(key)) return;
      seen.add(key);
      index.push({ type, title, description: compact(description).slice(0, 240), url,
        text: normalize([title, description, keywords].join(' ')) });
    };
    qa('main [data-course-select]').forEach(button => {
      const data = courseData(button);
      if (data) add('Kierunki', data.title, data.detail, '#kierunki', button.textContent);
    });
    qa('main .document-list a, main [data-document-link]').forEach(link => {
      const item = link.closest('li,article,[data-document]') || link;
      add('Dokumenty', link.dataset.searchTitle || compact(item.textContent).replace(/(?:Otwórz|Pobierz)\s*↗?$/, ''),
        'Odnośnik do dokumentu lub informacji. Wyszukiwanie obejmuje jego tytuł i opis, bez treści zewnętrznych plików.',
        link.getAttribute('href'), link.textContent);
    });
    qa('main article, main .catalog-line, main [data-filter-item="news"]').forEach(article => {
      if (article.matches('[data-course-detail]')) return;
      const heading = q('h2,h3,h4', article);
      if (!heading) return;
      add(article.closest('#aktualnosci') ? 'Aktualności' : 'Informacje', heading.textContent,
        qa('p', article).map(node => node.textContent).join(' '), anchorFor(article));
    });
    qa('main section[id]').forEach(section => {
      const heading = q('h1,h2,h3', section);
      if (!heading) return;
      add('Na tej stronie', heading.textContent, q('p', section)?.textContent || '', '#' + section.id,
        section.dataset.searchKeywords || section.id);
    });
    return index;
  }

  function search() {
    const dialog = q('#search-dialog'), input = q('#search-input'), list = q('#search-results');
    if (!dialog || !input || !list) return;
    const overlay = modal(dialog);
    const summary = q('[data-search-summary]', dialog) || make('p', 'search-summary');
    summary.setAttribute('role', 'status');
    summary.setAttribute('aria-live', 'polite');
    summary.setAttribute('aria-atomic', 'true');
    summary.id ||= 'search-summary';
    list.before(summary);
    list.removeAttribute('aria-live');
    const scope = q('[data-search-scope]', dialog) || q('.tool-caption', dialog);
    if (scope) {
      scope.textContent = 'Przeszukujesz treści tej wizualizacji oraz tytuły i opisy dokumentów. Wyszukiwarka nie czyta zawartości zewnętrznych PDF ani bazy szkoły.';
      scope.id ||= 'search-scope';
      input.setAttribute('aria-describedby', scope.id);
    }
    let index = [];
    const draw = () => {
      const words = normalize(input.value).trim().split(/\s+/).filter(Boolean);
      const matches = index.filter(item => words.every(word => item.text.includes(word)));
      if (words.length) matches.sort((a, b) => Number(words.every(word => normalize(b.title).includes(word))) -
        Number(words.every(word => normalize(a.title).includes(word))));
      list.replaceChildren();
      summary.textContent = matches.length ? `Liczba wyników: ${matches.length}${matches.length > 30 ? '. Pokazano pierwsze 30. Doprecyzuj wyszukiwanie.' : '.'}` :
        'Brak wyników. Wpisz inne słowo, np. fotografia, rekrutacja lub dokumenty.';
      matches.slice(0, 30).forEach(item => {
        const li = make('li'), link = make('a');
        link.href = item.url;
        link.append(make('span', '', item.type), make('strong', '', item.title),
          make('small', 'search-result-description', item.description));
        link.addEventListener('click', event => {
          if (!plainClick(event)) return;
          overlay.close(false);
          if (item.url.startsWith('#')) {
            const target = document.getElementById(item.url.slice(1));
            if (target) {
              const filterItem = target.closest('[data-filter-item]');
              if (filterItem?.hidden) {
                const group = qa('[data-filter-group]').find(node => node.dataset.filterGroup === filterItem.dataset.filterItem);
                q('[data-filter="wszystkie"]', group || document)?.click();
              }
              requestAnimationFrame(() => focusTarget(target));
            }
          }
        });
        li.append(link); list.append(li);
      });
    };
    qa('[data-search-open]').forEach(button => button.addEventListener('click', () => {
      index = buildSearchIndex();
      input.value = '';
      draw();
      overlay.open(input);
    }));
    q('[data-search-close]', dialog)?.addEventListener('click', () => overlay.close());
    input.addEventListener('input', draw);
  }

  function filters() {
    qa('[data-filter-group]').forEach(group => {
      const name = group.dataset.filterGroup;
      const buttons = qa('button[data-filter]', group);
      const items = qa('[data-filter-item]').filter(item => item.dataset.filterItem === name);
      const status = qa('[data-filter-status]').find(node => node.dataset.filterStatus === name);
      const choose = value => {
        buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
        let count = 0;
        items.forEach(item => {
          const categories = (item.dataset.category || '').split(/\s+/);
          const show = value === 'wszystkie' || categories.includes(value);
          item.hidden = !show;
          if (show) count += 1;
        });
        if (status) status.textContent = count ? `Liczba wyświetlonych pozycji: ${count}.` : 'Brak pozycji w tej kategorii.';
      };
      buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.filter)));
      if (buttons.length) choose(buttons.find(button => button.getAttribute('aria-pressed') === 'true')?.dataset.filter || 'wszystkie');
    });
  }

  function courseCatalog() {
    qa('[data-course-detail]').forEach((box, boxIndex) => {
      const section = box.closest('section') || document;
      const buttons = qa('[data-course-select]', section);
      if (!buttons.length) return;
      box.id ||= 'course-detail-' + (boxIndex + 1);
      box.setAttribute('aria-live', 'polite');
      box.setAttribute('aria-atomic', 'true');
      const choose = button => {
        const data = courseData(button);
        if (!data) return;
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        const title = q('[data-detail-title]', box), copy = q('[data-detail-copy]', box), link = q('[data-detail-link]', box);
        if (title) title.textContent = data.title;
        if (copy) copy.textContent = data.detail;
        if (link) link.href = data.url;
        const number = q('[data-detail-number]', box) || q('.eyebrow', box);
        if (number) number.textContent = 'Kierunek / ' + String(buttons.indexOf(button) + 1).padStart(2, '0');
      };
      buttons.forEach(button => {
        button.setAttribute('aria-controls', box.id);
        button.addEventListener('click', () => choose(button));
      });
      choose(buttons.find(button => button.getAttribute('aria-pressed') === 'true') || buttons[0]);
    });
  }

  const validDate = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
    const date = new Date(value + 'T12:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  };
  const monthNumber = value => {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value || '')) return null;
    return Number(value.slice(0, 4)) * 12 + Number(value.slice(5)) - 1;
  };
  const dateKey = (year, month, day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Published school calendar, checked 23 November 2026: https://zsp6tom.pl/?page_id=3042
  // This local snapshot is not a live connection to the school's systems.
  const schoolCalendar = [
    { date: '2026-09-01', title: 'Rozpoczęcie zajęć 2026/2027' },
    { date: '2026-11-17', end: '2026-12-14', title: 'Praktyki zawodowe klas 4Fo i 4F' },
    { date: '2026-12-23', end: '2026-12-31', title: 'Zimowa przerwa świąteczna' },
    { date: '2027-01-18', end: '2027-01-29', title: 'Ferie zimowe' },
    { date: '2027-03-25', end: '2027-03-30', title: 'Wiosenna przerwa świąteczna' },
    { date: '2027-04-30', title: 'Zakończenie zajęć klas maturalnych' },
    { date: '2027-05-04', end: '2027-05-31', title: 'Egzamin maturalny — termin główny' },
    { date: '2027-06-25', title: 'Zakończenie zajęć dydaktycznych' },
    { date: '2027-06-28', end: '2027-08-31', title: 'Ferie letnie' }
  ].map(event => ({ ...event, url: 'https://zsp6tom.pl/?page_id=3042' }));

  function calendar() {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(new Date());
    const today = Object.fromEntries(parts.map(part => [part.type, part.value]));
    const yearNow = Number(today.year), monthNow = Number(today.month) - 1;
    const todayKey = dateKey(yearNow, monthNow, Number(today.day));
    const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    qa('[data-calendar]').forEach((widget, widgetIndex) => {
      const label = q('[data-calendar-title]', widget), grid = q('[data-calendar-grid]', widget), detail = q('[data-calendar-detail]', widget);
      if (!label || !grid || !detail) return;
      let events = schoolCalendar;
      const source = q('script[data-calendar-events]', widget);
      if (source) {
        try {
          const records = JSON.parse(source.textContent);
          if (Array.isArray(records) && records.length) {
            const valid = records.filter(item => validDate(item.date) &&
              (!item.end || (validDate(item.end) && item.end >= item.date)) && typeof item.title === 'string');
            if (valid.length) events = valid;
          }
        } catch { /* Retain the verified snapshot when optional replacement data is malformed. */ }
      }
      let start = monthNumber(widget.dataset.calendarStart) ?? 2026 * 12 + 8;
      let end = monthNumber(widget.dataset.calendarEnd) ?? 2027 * 12 + 7;
      if (end < start) end = start;
      let current = yearNow * 12 + monthNow;
      if (current < start || current > end) current = start;
      widget.dataset.calendarMode = 'source';
      const note = q('.calendar-note', widget) || q('.tool-caption', widget) || make('p', 'calendar-note');
      if (!note.isConnected) widget.append(note);
      if (!source) {
        note.replaceChildren(document.createTextNode('Wybrane terminy z kalendarza szkoły 2026/2027. Stan danych: 23.11.2026. '));
        const sourceLink = make('a', 'underlined', 'Pełny kalendarz szkoły ↗');
        sourceLink.href = 'https://zsp6tom.pl/?page_id=3042'; sourceLink.target = '_blank'; sourceLink.rel = 'noopener';
        note.append(sourceLink);
      }
      const moves = qa('[data-calendar-move]', widget);
      let selected = todayKey;
      const eventsAt = key => events.filter(event => key >= event.date && key <= (event.end || event.date));
      const showDay = key => {
        selected = key;
        qa('button[data-date]', grid).forEach(button => {
          const active = button.dataset.date === key;
          button.setAttribute('aria-pressed', String(active));
          button.tabIndex = active ? 0 : -1;
        });
        const found = eventsAt(key);
        const humanDate = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(key + 'T12:00:00Z'));
        detail.replaceChildren(make('strong', '', humanDate));
        if (!found.length) detail.append(make('p', '',
          'Brak wpisu na ten dzień w prezentowanym zestawie. Pełny terminarz jest dostępny na stronie szkoły.'));
        found.forEach(event => {
          detail.append(make('p', '', event.title + (event.desc || event.description ? ' — ' + (event.desc || event.description) : '')));
          if (typeof event.url === 'string' && /^https:\/\//.test(event.url)) {
            const link = make('a', 'underlined', 'Szczegóły w źródle ↗');
            link.href = event.url; link.target = '_blank'; link.rel = 'noopener'; detail.append(link);
          }
        });
      };
      const draw = (preferredDay, focus = false) => {
        const year = Math.floor(current / 12), month = current % 12;
        const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
        label.textContent = months[month] + ' ' + year;
        label.id ||= 'calendar-title-' + widgetIndex;
        grid.setAttribute('role', 'group');
        grid.setAttribute('aria-labelledby', label.id);
        grid.replaceChildren();
        ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].forEach(name => {
          const dayName = make('span', 'day-name', name); dayName.setAttribute('aria-hidden', 'true'); grid.append(dayName);
        });
        for (let blank = 0; blank < firstWeekday; blank += 1) grid.append(make('span'));
        const chosenDay = Math.max(1, Math.min(preferredDay || 1, days));
        for (let day = 1; day <= days; day += 1) {
          const key = dateKey(year, month, day), found = eventsAt(key);
          const button = make('button', 'calendar-day' + (found.length ? ' event-day' : ''), String(day));
          button.type = 'button'; button.dataset.date = key;
          button.setAttribute('aria-label', `${day} ${months[month]} ${year}${found.length ? ': ' + found.map(event => event.title).join(', ') : ''}`);
          if (key === todayKey) button.setAttribute('aria-current', 'date');
          button.addEventListener('click', () => showDay(key));
          grid.append(button);
        }
        moves.forEach(button => {
          const next = current + Number(button.dataset.calendarMove);
          button.disabled = next < start || next > end;
          button.setAttribute('aria-disabled', String(button.disabled));
        });
        showDay(dateKey(year, month, chosenDay));
        if (focus) q('[data-date="' + selected + '"]', grid)?.focus();
      };
      moves.forEach(button => button.addEventListener('click', () => {
        const next = current + Number(button.dataset.calendarMove);
        if (next < start || next > end) return;
        current = next;
        draw(1);
      }));
      grid.addEventListener('keydown', event => {
        const button = event.target.closest('button[data-date]');
        if (!button) return;
        const date = new Date(button.dataset.date + 'T12:00:00Z');
        const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
        let next = null;
        if (delta !== undefined) next = new Date(date.getTime() + delta * 86400000);
        if (event.key === 'Home') next = new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * 86400000);
        if (event.key === 'End') next = new Date(date.getTime() + (6 - (date.getUTCDay() + 6) % 7) * 86400000);
        if (event.key === 'PageUp' || event.key === 'PageDown') {
          event.preventDefault();
          const nextMonth = current + (event.key === 'PageUp' ? -1 : 1);
          if (nextMonth >= start && nextMonth <= end) { current = nextMonth; draw(date.getUTCDate(), true); }
          return;
        }
        if (!next) return;
        event.preventDefault();
        const nextMonth = next.getUTCFullYear() * 12 + next.getUTCMonth();
        if (nextMonth < start || nextMonth > end) return;
        current = nextMonth;
        draw(next.getUTCDate(), true);
      });
      draw(current === yearNow * 12 + monthNow ? Number(today.day) : 1);
    });
  }

  function contact() {
    qa('[data-contact-form]').forEach(form => {
      const status = q('[data-contact-status]', form);
      const check = () => {
        if (!form.reportValidity()) return;
        if (status) status.textContent = 'Pola są wypełnione poprawnie. To demonstracja: żadna wiadomość nie została wysłana ani zapisana. Skontaktuj się ze szkołą przez e-mail lub telefon.';
      };
      form.addEventListener('submit', event => { event.preventDefault(); check(); });
      qa('[data-contact-submit]', form).forEach(button => {
        button.type = 'button'; button.disabled = false;
        button.addEventListener('click', check);
      });
      form.addEventListener('keydown', event => {
        if (event.key === 'Enter' && event.target.matches('input')) { event.preventDefault(); check(); }
      });
      form.addEventListener('input', () => { if (status) status.textContent = ''; });
    });
  }

  function lightbox() {
    const triggers = qa('[data-lightbox]').filter(trigger => q('img', trigger));
    if (!triggers.length) return;
    const dialog = make('div', 'lightbox-dialog');
    dialog.hidden = true; dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-labelledby', 'lightbox-title');
    const panel = make('div', 'lightbox-panel'), toolbar = make('div', 'lightbox-toolbar');
    const title = make('h2', 'sr-only', 'Galeria prac i życia szkoły'); title.id = 'lightbox-title';
    const count = make('span', 'lightbox-count'); count.setAttribute('aria-live', 'polite');
    const close = make('button', 'lightbox-close', 'Zamknij ×'); close.type = 'button'; close.setAttribute('aria-label', 'Zamknij podgląd zdjęcia');
    const image = make('img', 'lightbox-image'); image.decoding = 'async';
    const caption = make('p', 'lightbox-caption'); caption.id = 'lightbox-caption';
    const error = make('p', 'lightbox-error', 'Nie udało się załadować powiększonego zdjęcia. Możesz otworzyć materiał źródłowy.'); error.hidden = true; error.setAttribute('role', 'status');
    const original = make('a', 'underlined lightbox-original', 'Otwórz zdjęcie ↗'); original.target = '_blank'; original.rel = 'noopener';
    const nav = make('div', 'lightbox-nav');
    const previous = make('button', 'lightbox-prev', '← Poprzednie'), next = make('button', 'lightbox-next', 'Następne →');
    previous.type = next.type = 'button';
    toolbar.append(count, close); nav.append(previous, next); panel.append(title, toolbar, image, error, caption, nav, original); dialog.append(panel); document.body.append(dialog);
    dialog.setAttribute('aria-describedby', caption.id);
    const overlay = modal(dialog);
    let items = [], selected = 0;
    const draw = () => {
      const trigger = items[selected], thumbnail = q('img', trigger);
      const src = trigger.dataset.fullSrc || (trigger.matches('a[href]') ? trigger.href : '') || thumbnail.currentSrc || thumbnail.src;
      image.alt = thumbnail.alt;
      image.hidden = false; error.hidden = true;
      image.src = src; original.href = src;
      caption.textContent = trigger.dataset.caption || compact(q('figcaption', trigger.closest('figure') || trigger)?.textContent) || thumbnail.alt;
      count.textContent = `Zdjęcie ${selected + 1} z ${items.length}`;
      previous.disabled = next.disabled = items.length < 2;
    };
    const move = step => { selected = (selected + step + items.length) % items.length; draw(); };
    image.addEventListener('error', () => { error.hidden = false; image.hidden = true; });
    close.addEventListener('click', () => overlay.close());
    previous.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    });
    triggers.forEach(trigger => trigger.addEventListener('click', event => {
      if (!plainClick(event)) return;
      event.preventDefault();
      const gallery = trigger.closest('[data-lightbox-group], #galeria') || document;
      items = triggers.filter(item => gallery.contains(item) && visible(item));
      selected = items.indexOf(trigger);
      if (selected < 0) return;
      draw(); overlay.open(close);
    }));
  }

  function gate() {
    const main = q('[data-gate]');
    if (!main) return;
    const links = qa('[data-gate-link]', main), leaves = qa('.door', main), preview = q('[data-gate-preview]', main);
    const originalTabs = links.map(link => link.getAttribute('tabindex'));
    let opening = false, fallback = null, finish = null;
    const cancel = () => {
      clearTimeout(fallback);
      leaves.forEach(leaf => leaf.removeEventListener('transitionend', onTransitionEnd));
      finish = null;
    };
    const reset = () => {
      cancel(); opening = false;
      main.classList.remove('opening'); main.removeAttribute('aria-busy');
      links.forEach((link, index) => {
        link.removeAttribute('aria-disabled');
        if (originalTabs[index] === null) link.removeAttribute('tabindex');
        else link.setAttribute('tabindex', originalTabs[index]);
      });
      if (preview) { preview.removeAttribute('src'); preview.inert = true; }
    };
    const completed = new Set();
    function onTransitionEnd(event) {
      if (!leaves.includes(event.target) || event.propertyName !== 'transform') return;
      completed.add(event.target);
      if (completed.size === leaves.length) finish?.();
    }
    const transitionTime = leaf => {
      const style = getComputedStyle(leaf);
      const seconds = value => value.trim().endsWith('ms') ? parseFloat(value) : parseFloat(value) * 1000;
      const durations = style.transitionDuration.split(',').map(seconds);
      const delays = style.transitionDelay.split(',').map(seconds);
      return Math.max(0, ...durations.map((duration, index) => duration + delays[index % delays.length]));
    };
    links.forEach(link => link.addEventListener('click', event => {
      if (!plainClick(event) || link.target === '_blank' || link.hasAttribute('download')) return;
      if (opening) { event.preventDefault(); return; }
      if (reducedMotion.matches) return; // Native navigation has no animation, delay or extra state.
      event.preventDefault(); opening = true; completed.clear();
      const destination = link.href;
      finish = () => { cancel(); window.location.assign(destination); };
      main.setAttribute('aria-busy', 'true');
      links.forEach(item => { item.setAttribute('aria-disabled', 'true'); item.tabIndex = -1; });
      if (preview) {
        const previewURL = new URL(destination);
        previewURL.searchParams.set('preview', 'gate');
        preview.loading = 'eager'; preview.inert = true; preview.src = previewURL.href;
      }
      const title = q('[data-gate-title]', main);
      if (title) title.textContent = link.dataset.gateLink === '1' ? 'Wersja 1 — Wyspiański Editorial' : 'Wersja 2 — Kreatywna Pracownia';
      leaves.forEach(leaf => leaf.addEventListener('transitionend', onTransitionEnd));
      main.classList.add('opening');
      const duration = Math.max(0, ...leaves.map(transitionTime));
      fallback = setTimeout(() => finish?.(), duration + 180);
    }));
    reducedMotion.addEventListener('change', event => { if (event.matches && opening) finish?.(); });
    window.addEventListener('pageshow', reset);
    reset();
  }

  function init() {
    navigation(); courseCatalog(); filters(); calendar(); contact(); search(); lightbox(); gate();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
