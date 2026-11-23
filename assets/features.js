/* Optional modules: real browser-local demonstrations and a shared quotation scope. */
(() => {
  'use strict';
  if (!document.body.matches('.editorial, .creative') || new URLSearchParams(location.search).get('preview') === 'gate') return;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const normal = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L').toLowerCase();
  const node = (tag, attributes = {}, text) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const markup = text => { const wrapper = document.createElement('div'); wrapper.innerHTML = text; return wrapper; };
  const KEYS = { scope: 'zsp6:quote:modules:v1', checklist: 'zsp6:demo:checklist:v1', favourites: 'zsp6:demo:favourites:v1' };
  let storageAvailable = true;
  const sessionValues = new Map();
  const read = (key, fallback) => {
    if (sessionValues.has(key)) return sessionValues.get(key);
    try {
      const raw = localStorage.getItem(key), value = raw ? JSON.parse(raw) : fallback;
      sessionValues.set(key, value); return value;
    } catch { storageAvailable = false; sessionValues.set(key, fallback); return fallback; }
  };
  const save = (key, value) => {
    sessionValues.set(key, value);
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { storageAvailable = false; return false; }
  };
  const storageNote = subject => storageAvailable
    ? `${subject} zapamiętujemy tylko w tej przeglądarce. Nie wysyłamy danych do szkoły.`
    : `${subject} są pamiętane tylko w tej sesji, do odświeżenia lub zamknięcia strony. Przeglądarka blokuje trwały zapis.`;
  const modules = [
    { id: 'kierunek', title: 'Asystent wyboru kierunku', short: 'Asystent kierunku', intro: 'Kilka prostych pytań pomaga kandydatowi znaleźć kierunek, któremu warto przyjrzeć się bliżej.', demo: courseDemo, scope: ['Pytania i reguły dopasowania uzgodnione ze szkołą.', 'Wynik z opisem kierunku i przejściem do rekrutacji.', 'Możliwość aktualizacji treści przez redakcję szkoły.'], dependencies: 'Wycena zależy od liczby pytań, sposobu dopasowania i edycji treści. Nie wymaga kont uczniów.' },
    { id: 'rekrutacja', title: 'Osobista checklista rekrutacji', short: 'Checklista rekrutacji', intro: 'Kandydat widzi kolejne kroki i zaznacza, co już sprawdził. Może wrócić do listy później.', demo: recruitmentDemo, scope: ['Oddzielne ścieżki dla liceum i technikum.', 'Terminy i odnośniki do aktualnych dokumentów.', 'Zapamiętywanie postępu na urządzeniu.'], dependencies: 'Ta wersja przechowuje wyłącznie zaznaczenia lokalnie, bez wysyłania danych. Konto, przypomnienia e-mail i synchronizacja między urządzeniami wymagają dodatkowego wdrożenia.' },
    { id: 'spotkania', title: 'Dni otwarte i spotkania', short: 'Dni otwarte i spotkania', intro: 'Czytelny wybór terminu i zapis spotkania w osobistym kalendarzu. Przy wdrożeniu można dodać rzeczywiste zapisy.', demo: calendarDemo, scope: ['Lista terminów zarządzana przez szkołę.', 'Eksport wydarzenia do kalendarza.', 'Opcjonalne limity miejsc, formularz zapisu i potwierdzenia.'], dependencies: 'Rezerwacja miejsca, lista uczestników i wiadomości e-mail wymagają serwera oraz obsługi danych osobowych. Demonstracja nie rezerwuje miejsc.' },
    { id: 'dokumenty', title: 'Biblioteka dokumentów', short: 'Biblioteka dokumentów', intro: 'Dokumenty i ważne strony zebrane w jednym miejscu, z wyszukiwaniem oraz podziałem na odbiorców.', demo: documentsDemo, scope: ['Kategorie, odbiorcy i opisy dokumentów.', 'Wyszukiwanie po tytule i opisie oraz oznaczanie aktualnych wersji.', 'Panel dodawania plików i archiwum.'], dependencies: 'Przeszukiwanie treści PDF, automatyczne wersjonowanie i dokumenty wymagające logowania są osobnymi rozszerzeniami.' },
    { id: 'portfolio', title: 'Portfolio uczniów', short: 'Portfolio uczniów', intro: 'Galeria, która pozwala obejrzeć materiał w większym rozmiarze i zawęzić zestaw do wybranej kategorii.', demo: portfolioDemo, scope: ['Kategorie, filtrowanie i powiększanie prac.', 'Opisy projektów oraz opcjonalne profile autorów.', 'Dodawanie materiałów i zatwierdzanie publikacji przez szkołę.'], dependencies: 'Przed publikacją należy ustalić prawa do prac, zdjęć i wizerunków. Konta uczniów oraz przesyłanie prac wymagają dodatkowej obsługi na serwerze.' },
    { id: 'skroty', title: 'Panel ucznia i rodzica', short: 'Panel ucznia i rodzica', intro: 'Najczęściej używane odnośniki można dopasować do swojej roli i przypiąć na górze listy.', demo: shortcutsDemo, scope: ['Widoki dla ucznia i rodzica.', 'Ulubione odnośniki i szybki dostęp do dokumentów.', 'Konfiguracja skrótów przez administratora.'], dependencies: 'Demonstracja nie zakłada konta i nie łączy się z e-dziennikiem. Logowanie, dane ucznia i integracje z zewnętrznymi systemami wymagają osobnych uzgodnień.' },
    { id: 'sekretariat', title: 'Przewodnik po sprawach szkolnych', short: 'Sprawy sekretariatu', intro: 'Odwiedzający wybiera temat i od razu widzi właściwą ścieżkę kontaktu oraz listę rzeczy do ustalenia.', demo: officeDemo, scope: ['Uzgodnione ze szkołą ścieżki najczęstszych spraw.', 'Powiązane dokumenty i dane właściwej osoby.', 'Opcjonalny formularz zgłoszenia ze statusem sprawy.'], dependencies: 'Przyjmowanie zgłoszeń, załączniki i powiadomienia wymagają backendu, reguł przechowywania danych i wdrożenia skrzynki odbiorczej.' },
    { id: 'redakcja', title: 'Edytor aktualności', short: 'Edytor aktualności', intro: 'Redakcja szkoły może przygotować wpis i zobaczyć jego wygląd przed publikacją.', demo: editorDemo, scope: ['Edytor wpisów, zdjęć i kategorii.', 'Szkice, podgląd oraz role redaktora i administratora.', 'Publikacja aktualności w obu układach strony.'], dependencies: 'Pełna wersja wymaga systemu CMS, logowania, przechowywania treści i kopii zapasowych. Podgląd poniżej niczego nie publikuje.' }
  ];
  const byId = Object.fromEntries(modules.map(item => [item.id, item]));
  const ownsModule = id => typeof id === 'string' && Object.hasOwn(byId, id);
  const initial = read(KEYS.scope, []);
  let selected = new Set(Array.isArray(initial) ? initial.filter(ownsModule) : []);
  let returnFocus = null;
  let currentModule = null;
  let lastModule = null;
  let returningToList = false;
  let collapsed = false;
  const wide = window.matchMedia('(min-width: 1280px)');

  const railContent = closeLabel => `
    <div class="fx-rail-head"><span class="fx-rail-eyebrow">Zakres do wyceny</span><h2>Rozbuduj<br>stronę szkoły.</h2><p>Otwórz moduł, wypróbuj go i wybierz potrzebne funkcje.</p><button type="button" class="fx-collapse" data-fx-close-menu>${closeLabel}</button></div>
    <ul class="fx-module-list">${modules.map(item => `<li><button type="button" data-fx-open="${item.id}" aria-haspopup="dialog"><span>${item.short}</span><span class="fx-list-mark" aria-hidden="true">+</span></button></li>`).join('')}</ul>
    <div class="fx-rail-foot"><button type="button" class="fx-scope-button" data-fx-summary aria-haspopup="dialog">Twój zakres <span data-fx-count>(0)</span></button><p>Wybór pomoże ustalić wycenę.<br>Ceny po ustaleniu zakresu.</p></div>`;
  const sidebar = node('aside', { id: 'fx-sidebar', class: 'fx-sidebar', 'aria-label': 'Dodatkowe funkcjonalności do wyceny' });
  sidebar.innerHTML = railContent('Zwiń panel');
  const trigger = node('button', { type: 'button', class: 'fx-trigger', 'aria-haspopup': 'dialog', 'aria-controls': 'fx-menu-dialog', 'aria-expanded': 'false' });
  trigger.innerHTML = 'Funkcje do wyceny <span class="fx-trigger-count" data-fx-count>(0)</span>';
  const menu = node('dialog', { id: 'fx-menu-dialog', class: 'fx-menu-dialog', 'aria-label': 'Dodatkowe funkcjonalności do wyceny' });
  menu.innerHTML = railContent('Zamknij panel');
  const dialog = node('dialog', { id: 'fx-module-dialog', class: 'fx-dialog', 'aria-labelledby': 'fx-dialog-title' });
  const lightbox = node('dialog', { class: 'fx-lightbox', 'aria-label': 'Powiększenie materiału z galerii' });
  lightbox.innerHTML = '<button type="button" class="fx-close">Zamknij zdjęcie</button><img alt=""><p></p>';
  const printArea = node('section', { class: 'fx-print', 'aria-label': 'Zakres funkcjonalności do wydruku' });
  document.body.append(sidebar, trigger, menu, dialog, lightbox, printArea);

  function update() {
    $$('[data-fx-count]').forEach(element => { element.textContent = `(${selected.size})`; });
    $$('[data-fx-open]').forEach(button => {
      const yes = selected.has(button.dataset.fxOpen);
      button.dataset.selected = String(yes);
      $('.fx-list-mark', button).textContent = yes ? '✓' : '+';
      button.setAttribute('aria-label', `${byId[button.dataset.fxOpen].short}. ${yes ? 'Dodano do zakresu. ' : ''}Otwórz demonstrację`);
    });
    const checkbox = $('#fx-add-scope', dialog);
    if (checkbox && currentModule) checkbox.checked = selected.has(currentModule);
    document.body.classList.toggle('has-feature-sidebar', wide.matches && !collapsed);
    trigger.hidden = wide.matches && !collapsed;
  }
  function saveSelection() { save(KEYS.scope, [...selected]); update(); }
  function closeMenu() { if (menu.open) menu.close(); trigger.setAttribute('aria-expanded', 'false'); }
  function openMenu(focusId) {
    const id = ownsModule(focusId) ? focusId : lastModule;
    const focusItem = scope => {
      const target = (id && $(`[data-fx-open="${id}"]`, scope)) || $('[data-fx-open]', scope);
      if (target) { target.focus(); target.scrollIntoView({ block: 'nearest' }); }
    };
    if (wide.matches) { collapsed = false; update(); focusItem(sidebar); return; }
    if (!menu.open) menu.showModal(); trigger.setAttribute('aria-expanded', 'true'); focusItem(menu);
  }
  function showAllFeatures() {
    returningToList = true;
    dialog.close();
    openMenu(lastModule);
  }
  function prepareDialog(title, subtitle = 'Dodatkowa funkcjonalność') {
    dialog.replaceChildren();
    const head = markup(`<div class="fx-dialog-head"><div><p class="fx-rail-eyebrow"></p><h2 id="fx-dialog-title" tabindex="-1"></h2></div><div class="fx-dialog-controls"><button type="button" class="fx-close" data-fx-all-functions aria-label="Wróć do listy dodatkowych funkcjonalności">Wszystkie funkcje</button><button type="button" class="fx-close" data-fx-close-dialog>Zamknij</button></div></div>`).firstElementChild;
    $('h2', head).textContent = title; $('.fx-rail-eyebrow', head).textContent = subtitle;
    dialog.append(head);
    $('[data-fx-close-dialog]', head).addEventListener('click', () => dialog.close());
    $('[data-fx-all-functions]', head).addEventListener('click', showAllFeatures);
  }
  function openModule(id, origin) {
    if (!ownsModule(id)) return;
    const item = byId[id];
    returnFocus = menu.open ? trigger : origin || trigger;
    closeMenu(); currentModule = id; lastModule = id; prepareDialog(item.title);
    dialog.append(node('p', { class: 'fx-dialog-intro' }, item.intro));
    const demo = node('div', { class: 'fx-demo' });
    demo.append(node('span', { class: 'fx-demo-badge' }, 'Wypróbuj demonstrację'));
    item.demo(demo); dialog.append(demo);
    const section = node('section', { class: 'fx-scope-section', 'aria-label': 'Zakres wdrożenia modułu' });
    const scope = node('div'); scope.append(node('h3', {}, 'Co obejmuje wdrożenie'));
    const list = node('ul'); item.scope.forEach(text => list.append(node('li', {}, text))); scope.append(list);
    const choice = markup('<div class="fx-selection"><label for="fx-add-scope"><input type="checkbox" id="fx-add-scope"><span>Dodaj do zakresu wyceny</span></label><p>Cena zostanie ustalona po uzgodnieniu zakresu.</p><button type="button" class="fx-demo-action fx-secondary" data-fx-summary>Zobacz wybrane moduły</button></div>').firstElementChild;
    const checkbox = $('#fx-add-scope', choice); checkbox.checked = selected.has(id);
    checkbox.addEventListener('change', () => { if (checkbox.checked) selected.add(id); else selected.delete(id); saveSelection(); });
    section.append(scope, choice); dialog.append(section);
    dialog.append(node('p', { class: 'fx-dialog-intro', style: 'padding-top:0;padding-bottom:27px;font-size:14px' }, item.dependencies));
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0; $('#fx-dialog-title').focus();
  }
  function scopeText() {
    const chosen = modules.filter(item => selected.has(item.id));
    const lines = ['ZSP6 | Dodatkowe funkcjonalności do wyceny', '', `Wybrane moduły: ${chosen.length}`, 'Koncepcja graficzna: do uzgodnienia. Wybrane funkcje można zastosować w obu wizualizacjach.', '', 'Ten plik opisuje zakres do rozmowy. Nie stanowi oferty cenowej ani zamówienia.', 'Demonstracje działają lokalnie. Nie wysyłają zgłoszeń i nie łączą się z systemami szkoły.', ''];
    chosen.forEach((item, index) => { lines.push(`${index + 1}. ${item.title}`, ...item.scope.map(text => `   • ${text}`), `   Do ustalenia: ${item.dependencies}`, ''); });
    lines.push('Wycena: po uzgodnieniu zakresu, treści, integracji i sposobu obsługi.', 'Do ustalenia także: hosting, utrzymanie, odpowiedzialność za aktualizacje oraz prawa do materiałów.');
    return lines.join('\n');
  }
  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = node('a', { href: url, download: filename }); document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function printScope() {
    printArea.replaceChildren(node('h1', {}, 'ZSP6. Zakres funkcjonalności'));
    printArea.append(node('p', {}, 'Podsumowanie wyboru do wyceny. Nie stanowi oferty cenowej ani zamówienia.'));
    modules.filter(item => selected.has(item.id)).forEach(item => {
      const article = node('article'); article.append(node('h2', {}, item.title));
      const ul = node('ul'); item.scope.forEach(text => ul.append(node('li', {}, text))); article.append(ul, node('p', {}, item.dependencies)); printArea.append(article);
    });
    printArea.append(node('h2', {}, 'Ustalenia do wyceny'), node('p', {}, 'Cena, treści, integracje, hosting, utrzymanie oraz prawa do materiałów wymagają osobnych ustaleń. Demonstracje działają lokalnie i nie są połączone z systemami szkoły.'));
    document.body.classList.add('fx-printing'); window.print();
  }
  function openSummary(origin) {
    if (!dialog.open) returnFocus = menu.open ? trigger : origin || trigger;
    closeMenu(); currentModule = null; prepareDialog('Twój zakres do wyceny', 'Wybrane funkcjonalności');
    const body = node('div', { class: 'fx-summary-body' });
    body.append(node('p', {}, 'Wybierz moduły potrzebne szkole. Podsumowanie ułatwia ustalenie zakresu i ostatecznej ceny.'));
    if (!selected.size) body.append(node('p', { class: 'fx-empty' }, 'Nie wybrano jeszcze dodatkowych modułów. Otwórz demonstrację i zaznacz „Dodaj do zakresu wyceny”.'));
    const ul = node('ul', { class: 'fx-summary-list' });
    modules.filter(item => selected.has(item.id)).forEach(item => {
      const li = node('li'), text = node('div'); text.append(node('h3', {}, item.title), node('p', {}, item.dependencies));
      const remove = node('button', { type: 'button', class: 'fx-remove', 'aria-label': `Usuń z zakresu: ${item.title}` }, 'Usuń');
      remove.addEventListener('click', () => { selected.delete(item.id); saveSelection(); openSummary(); }); li.append(text, remove); ul.append(li);
    }); body.append(ul);
    body.append(node('p', { class: 'fx-summary-note' }, 'Cena po ustaleniu zakresu. Wybór modułów nie stanowi zamówienia. Integracje, treści, utrzymanie i dostęp do danych szkoły wymagają osobnych ustaleń.'));
    const actions = node('div', { class: 'fx-actions' });
    const txt = node('button', { type: 'button', class: 'fx-demo-action', 'data-fx-download-scope': '' }, 'Pobierz podsumowanie');
    const print = node('button', { type: 'button', class: 'fx-demo-action fx-secondary' }, 'Drukuj lub zapisz PDF');
    txt.disabled = !selected.size; print.disabled = !selected.size;
    txt.addEventListener('click', () => download('ZSP6-zakres-do-wyceny.txt', '\ufeff' + scopeText())); print.addEventListener('click', printScope);
    actions.append(txt, print); body.append(actions);
    const storageText = storageAvailable ? 'Wybór zapisuje się tylko w tej przeglądarce i jest wspólny dla obu wersji strony. Nie wysyłamy go do szkoły ani do wykonawcy.' : 'Przeglądarka nie udostępnia zapisu. Wybór działa podczas tej wizyty; pobierz podsumowanie, aby go zachować.';
    body.append(node('p', { class: 'fx-note' }, storageText)); dialog.append(body);
    if (!dialog.open) dialog.showModal(); dialog.scrollTop = 0; $('#fx-dialog-title').focus();
  }
  document.addEventListener('click', event => {
    const open = event.target.closest('[data-fx-open]'); if (open) openModule(open.dataset.fxOpen, open);
    const summary = event.target.closest('[data-fx-summary]'); if (summary) openSummary(summary);
    const closer = event.target.closest('[data-fx-close-menu]'); if (closer) {
      if (sidebar.contains(closer)) { collapsed = true; update(); trigger.focus(); }
      else closeMenu();
    }
  });
  trigger.addEventListener('click', openMenu);
  menu.addEventListener('close', () => trigger.setAttribute('aria-expanded', 'false'));
  dialog.addEventListener('close', () => {
    if (returningToList) { returningToList = false; return; }
    if (returnFocus?.isConnected && returnFocus.getClientRects().length) { returnFocus.focus(); return; }
    if (!trigger.hidden) { trigger.focus(); return; }
    const fallback = (lastModule && $(`[data-fx-open="${lastModule}"]`, sidebar)) || $('[data-fx-open]', sidebar);
    if (fallback?.getClientRects().length) fallback.focus();
  });
  [dialog, menu, lightbox].forEach(modal => modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  }));
  $('.fx-close', lightbox).addEventListener('click', () => lightbox.close());
  wide.addEventListener('change', () => { closeMenu(); update(); });
  window.addEventListener('afterprint', () => document.body.classList.remove('fx-printing'));
  window.addEventListener('storage', event => {
    if (event.key !== KEYS.scope) return;
    let values = [];
    try { values = event.newValue ? JSON.parse(event.newValue) : []; } catch { values = []; }
    sessionValues.set(KEYS.scope, values); selected = new Set(Array.isArray(values) ? values.filter(ownsModule) : []); update();
  });
  update();

  function courseDemo(container) {
    const box = markup(`<h3>Co najbardziej Cię interesuje?</h3><p>Wybierz obszar. Pokażemy kierunek do dalszego poznania.</p><div class="fx-grid-two"><div><label class="fx-field">Chcę pracować przede wszystkim z…<select data-interest><option value="plastyk">Rysunkiem, malarstwem i przestrzenią</option><option value="grafik">Grafiką, składem i drukiem</option><option value="foto">Fotografią, filmem i multimediami</option><option value="fryzjer">Fryzurą, wizerunkiem i stylizacją</option></select></label><label class="fx-field">Na stronie chcę najpierw zobaczyć…<select data-next><option value="oferta">Opis programu i specjalizacji</option><option value="rekrutacja">Warunki przyjęcia do szkoły</option></select></label><button type="button" class="fx-demo-action" data-match>Pokaż kierunek</button></div><div class="fx-result" data-course-result aria-live="polite"><p>Zaznacz zainteresowanie i sprawdź propozycję.</p></div></div><p class="fx-note">To proste dopasowanie na podstawie wyboru, nie test predyspozycji. Szczegóły oferty należy potwierdzić na oficjalnej stronie szkoły.</p>`);
    container.append(...box.childNodes);
    const courses = {
      plastyk: ['Liceum Sztuk Plastycznych', 'Sprawdź kształcenie plastyczne, projektowanie przestrzeni i projektowanie graficzne.', '?page_id=3467'],
      grafik: ['Technik grafiki i poligrafii cyfrowej', 'Poznaj kierunek łączący projektowanie publikacji z przygotowaniem i wykonaniem druku.', '?page_id=3520'],
      foto: ['Technik fotografii i multimediów', 'Sprawdź program związany z fotografią oraz tworzeniem i obróbką materiałów multimedialnych.', '?page_id=23259'],
      fryzjer: ['Technik usług fryzjerskich', 'Poznaj kierunek związany z usługami fryzjerskimi i stylizacją.', '?page_id=23255']
    };
    $('[data-match]', container).addEventListener('click', () => {
      const course = courses[$('[data-interest]', container).value]; const result = $('[data-course-result]', container);
      const recruitment = $('[data-next]', container).value === 'rekrutacja';
      result.replaceChildren(node('h4', {}, course[0]), node('p', {}, course[1]), node('a', { href: `https://zsp6tom.pl/${recruitment ? '?page_id=2537' : course[2]}`, target: '_blank', rel: 'noopener noreferrer' }, recruitment ? 'Zobacz informacje o rekrutacji' : 'Zobacz oficjalny opis kierunku'));
    });
  }
  function recruitmentDemo(container) {
    const tasks = ['Poznałem ofertę kierunków', 'Sprawdziłem aktualne zasady przyjęcia', 'Sprawdziłem terminy i wymagane dokumenty', 'Sprawdziłem, czy obowiązuje egzamin lub dodatkowy warunek'];
    let saved = read(KEYS.checklist, []); if (!Array.isArray(saved)) saved = [];
    const progress = node('progress', { class: 'fx-progress', max: tasks.length, value: 0, 'aria-label': 'Postęp checklisty rekrutacji' });
    const count = node('p', { class: 'fx-status', 'aria-live': 'polite' });
    container.append(node('h3', {}, 'Moja lista do sprawdzenia'), progress, count);
    const fields = node('fieldset'); fields.append(node('legend', {}, 'Przygotowanie do rekrutacji'));
    tasks.forEach((text, i) => { const label = node('label', { class: 'fx-check' }); const input = node('input', { type: 'checkbox', value: i }); input.checked = saved.includes(i); label.append(input, node('span', {}, text)); fields.append(label); });
    container.append(fields);
    const draw = () => { const checked = $$('input:checked', fields).length; progress.value = checked; count.textContent = `Sprawdzone: ${checked} z ${tasks.length}`; const note = $('[data-checklist-storage]', container); if (note) note.textContent = storageNote('Zaznaczenia') + ' Lista nie zastępuje oficjalnego harmonogramu ani zgłoszenia do szkoły.'; };
    fields.addEventListener('change', () => { save(KEYS.checklist, $$('input:checked', fields).map(input => Number(input.value))); draw(); });
    const actions = node('div', { class: 'fx-actions' }); const reset = node('button', { type: 'button', class: 'fx-demo-action fx-secondary' }, 'Wyczyść zaznaczenia');
    reset.addEventListener('click', () => { $$('input', fields).forEach(input => { input.checked = false; }); save(KEYS.checklist, []); draw(); });
    actions.append(node('a', { class: 'fx-demo-action', href: 'https://zsp6tom.pl/?page_id=2537', target: '_blank', rel: 'noopener noreferrer' }, 'Oficjalne zasady rekrutacji'), reset);
    container.append(actions, node('p', { class: 'fx-note', 'data-checklist-storage': '' }, '')); draw();
  }
  // Match a Warsaw wall-clock time to a UTC instant, including seasonal offset changes.
  function warsawDate(day, time) {
    const [year, month, date] = day.split('-').map(Number), [hour, minute] = time.split(':').map(Number);
    const target = Date.UTC(year, month - 1, date, hour, minute);
    const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Warsaw', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
    let instant = target;
    for (let n = 0; n < 3; n += 1) {
      const parts = Object.fromEntries(formatter.formatToParts(new Date(instant)).map(part => [part.type, part.value]));
      const represented = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
      instant += target - represented;
    }
    return new Date(instant);
  }
  const utcCalendarStamp = date => date.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  function foldCalendarLine(line) {
    const encoder = new TextEncoder(); let result = '', bytes = 0;
    for (const character of line) {
      const size = encoder.encode(character).length;
      if (bytes + size > 75) { result += '\r\n '; bytes = 1; }
      result += character; bytes += size;
    }
    return result;
  }
  function calendarDemo(container) {
    const box = markup(`<h3>Dodaj przykładowe spotkanie do kalendarza</h3><p>Sprawdź wygodę wyboru terminu. Samodzielnie ustawiona data służy wyłącznie demonstracji.</p><div class="fx-grid-two"><label class="fx-field">Przykładowa data<input type="date" data-demo-date required></label><label class="fx-field">Godzina rozpoczęcia (czas w Polsce)<select data-demo-time><option value="10:00">10:00</option><option value="12:00">12:00</option><option value="16:00">16:00</option></select></label></div><button type="button" class="fx-demo-action" data-calendar-export>Pobierz wydarzenie (.ics)</button><p class="fx-status" data-calendar-status aria-live="polite"></p><p class="fx-note">To nie jest ogłoszony termin szkoły ani rezerwacja miejsca. Wybrana godzina dotyczy strefy Europe/Warsaw. Plik zapisuje ją w UTC i zawiera oznaczenie „DEMO”, bez danych osobowych.</p>`);
    container.append(...box.childNodes);
    const date = $('[data-demo-date]', container); const next = new Date(); next.setDate(next.getDate() + 7);
    date.value = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`;
    $('[data-calendar-export]', container).addEventListener('click', () => {
      if (!date.reportValidity()) return;
      const time = $('[data-demo-time]', container).value;
      const stamp = utcCalendarStamp(new Date());
      const starts = utcCalendarStamp(warsawDate(date.value, time));
      const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ZSP6 wizualizacja//Demonstracja//PL', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:zsp6-demo-${Date.now()}@local.invalid`, `DTSTAMP:${stamp}`, `DTSTART:${starts}`, 'DURATION:PT1H', 'SUMMARY:DEMO — przykładowe spotkanie ZSP6', 'DESCRIPTION:Demonstracja interfejsu. Termin wybrany przez użytkownika w strefie Europe/Warsaw. To nie jest wydarzenie ogłoszone przez szkołę ani rezerwacja miejsca.', 'STATUS:TENTATIVE', 'END:VEVENT', 'END:VCALENDAR'];
      const content = lines.map(foldCalendarLine).join('\r\n') + '\r\n';
      download('ZSP6-spotkanie-DEMO.ics', content, 'text/calendar;charset=utf-8');
      $('[data-calendar-status]', container).textContent = 'Przygotowano plik kalendarza. Nie zapisano Cię na żadne spotkanie.';
    });
  }
  function documentsDemo(container) {
    const documents = [
      { title: 'Polityka ochrony małoletnich', audience: 'wszyscy', type: 'PDF', description: 'Dokument udostępniony na oficjalnej stronie szkoły.', url: 'https://zsp6tom.pl/wp-content/uploads/2024/02/POLITYKA-OCHRONY-MALOLETNICH-w-ZSP-nr-6.pdf' },
      { title: 'Rekrutacja i informacje dla kandydatów', audience: 'kandydat', type: 'Strona szkoły', description: 'Zasady oraz aktualne informacje o przyjęciu.', url: 'https://zsp6tom.pl/?page_id=2537' },
      { title: 'Informacje dla uczniów', audience: 'uczen', type: 'Strona szkoły', description: 'Informacje organizacyjne i terminy.', url: 'https://zsp6tom.pl/?page_id=3042' },
      { title: 'Projekty Erasmus+', audience: 'uczen', type: 'Strona szkoły', description: 'Informacje o projektach i mobilnościach.', url: 'https://zsp6tom.pl/?page_id=1749' }
    ];
    const box = markup('<h3>Znajdź dokument lub informację</h3><div class="fx-grid-two"><label class="fx-field">Szukaj po nazwie i opisie<input type="search" placeholder="np. małoletnich" data-doc-search></label><label class="fx-field">Dla kogo?<select data-doc-audience><option value="wszyscy">Wszystkie materiały</option><option value="kandydat">Kandydaci</option><option value="uczen">Uczniowie i rodzice</option></select></label></div><p class="fx-status" data-doc-status aria-live="polite"></p><ul class="fx-doc-list" data-doc-results></ul><p class="fx-note">Demonstracja przeszukuje nazwy i opisy czterech odnośników. Nie przeszukuje zawartości PDF. Dokumenty otwierają się na oficjalnej stronie szkoły.</p>');
    container.append(...box.childNodes);
    const draw = () => {
      const term = normal($('[data-doc-search]', container).value.trim()), audience = $('[data-doc-audience]', container).value;
      const matches = documents.filter(item => (audience === 'wszyscy' || item.audience === 'wszyscy' || item.audience === audience) && normal(`${item.title} ${item.description}`).includes(term));
      const list = $('[data-doc-results]', container); list.replaceChildren();
      matches.forEach(item => { const li = node('li'), text = node('div'); text.append(node('strong', {}, item.title), node('span', {}, item.description)); li.append(text, node('a', { class: 'fx-doc-link', href: item.url, target: '_blank', rel: 'noopener noreferrer' }, item.type === 'PDF' ? 'Otwórz PDF' : 'Otwórz stronę')); list.append(li); });
      $('[data-doc-status]', container).textContent = matches.length ? `Znalezione materiały: ${matches.length}` : 'Brak wyników. Zmień hasło lub odbiorcę.';
    };
    $('[data-doc-search]', container).addEventListener('input', draw); $('[data-doc-audience]', container).addEventListener('change', draw); draw();
  }
  function portfolioDemo(container) {
    const originals = $$('.gallery-piece img, .cr-gallery-item img').length ? $$('.gallery-piece img, .cr-gallery-item img') : $$('main figure img');
    const sources = []; const seen = new Set();
    originals.forEach(image => {
      const src = image.getAttribute('src'); if (!src || seen.has(src)) return; seen.add(src);
      const figure = image.closest('figure'), caption = $('figcaption', figure || document)?.textContent.trim();
      const category = figure?.dataset.category || 'materialy';
      sources.push({ src, alt: image.alt || 'Materiał z galerii szkoły', caption: caption || image.alt, category });
    });
    const categoryNames = { plastyka: 'Plastyka', foto: 'Fotografia', grafika: 'Grafika', fryzjerstwo: 'Fryzjerstwo', materialy: 'Materiały szkoły' };
    container.append(node('h3', {}, 'Obejrzyj materiał w większym rozmiarze'));
    const filters = node('div', { class: 'fx-filter-buttons', role: 'group', 'aria-label': 'Kategorie portfolio' });
    const categories = ['all', ...new Set(sources.map(item => item.category))];
    const gallery = node('div', { class: 'fx-gallery' }), status = node('p', { class: 'fx-status', 'aria-live': 'polite' });
    categories.forEach(category => { const button = node('button', { type: 'button', 'aria-pressed': String(category === 'all') }, category === 'all' ? 'Wszystkie' : categoryNames[category] || 'Materiały szkoły'); button.addEventListener('click', () => { $$('button', filters).forEach(item => item.setAttribute('aria-pressed', String(item === button))); draw(category); }); filters.append(button); });
    function draw(category) {
      gallery.replaceChildren(); const matches = sources.filter(item => category === 'all' || item.category === category);
      matches.forEach(item => {
        const figure = node('figure'), button = node('button', { type: 'button', 'aria-label': `Powiększ: ${item.alt}`, 'aria-haspopup': 'dialog' });
        const image = node('img', { src: item.src, alt: item.alt, loading: 'lazy', decoding: 'async' });
        button.append(image); button.addEventListener('click', () => { const full = $('img', lightbox); full.src = item.src; full.alt = item.alt; $('p', lightbox).textContent = item.caption; lightbox.showModal(); });
        figure.append(button, node('figcaption', {}, item.alt)); gallery.append(figure);
      });
      status.textContent = matches.length ? `Materiały w tej kategorii: ${matches.length}. Kliknij zdjęcie, aby je powiększyć.` : 'Brak materiałów w tej kategorii.';
    }
    container.append(filters, gallery, status, node('p', { class: 'fx-note' }, 'Podgląd korzysta z materiałów już pokazanych w wizualizacji. Docelowe portfolio wymaga od szkoły prac, opisów i ustalenia praw do ich publikacji. Nie przypisujemy fikcyjnych autorów.')); draw('all');
  }
  function shortcutsDemo(container) {
    const links = [
      { id: 'rekrutacja', title: 'Informacje o rekrutacji', roles: ['rodzic'], url: 'https://zsp6tom.pl/?page_id=2537' },
      { id: 'uczniowie', title: 'Informacje dla uczniów', roles: ['uczen', 'rodzic'], url: 'https://zsp6tom.pl/?page_id=3042' },
      { id: 'erasmus', title: 'Projekty Erasmus+', roles: ['uczen', 'rodzic'], url: 'https://zsp6tom.pl/?page_id=1749' },
      { id: 'kontakt', title: 'Kontakt ze szkołą', roles: ['uczen', 'rodzic'], url: 'https://zsp6tom.pl/?page_id=318' },
      { id: 'galeria', title: 'Galeria fotograficzna', roles: ['uczen'], url: 'https://zsp6tom.pl/?page_id=260' }
    ];
    let saved = read(KEYS.favourites, []); const favourites = new Set(Array.isArray(saved) ? saved.filter(id => links.some(item => item.id === id)) : []);
    const box = markup('<h3>Moje najważniejsze odnośniki</h3><label class="fx-field">Pokaż widok dla<select data-role><option value="uczen">Ucznia</option><option value="rodzic">Rodzica</option></select></label><div class="fx-shortcuts" data-shortcuts></div><p class="fx-status" data-favourites-status aria-live="polite"></p><p class="fx-note" data-shortcut-storage></p>'); container.append(...box.childNodes);
    const draw = () => {
      const list = $('[data-shortcuts]', container), role = $('[data-role]', container).value; list.replaceChildren();
      links.filter(item => item.roles.includes(role)).sort((a, b) => Number(favourites.has(b.id)) - Number(favourites.has(a.id))).forEach(item => {
        const row = node('div', { class: 'fx-shortcut' }), pin = node('button', { type: 'button', 'aria-pressed': String(favourites.has(item.id)), 'aria-label': `${favourites.has(item.id) ? 'Odepnij' : 'Przypnij'}: ${item.title}` }, favourites.has(item.id) ? 'Przypięte' : 'Przypnij');
        pin.addEventListener('click', () => { if (favourites.has(item.id)) favourites.delete(item.id); else favourites.add(item.id); save(KEYS.favourites, [...favourites]); draw(); $(`[data-shortcut-id="${item.id}"] button`, container)?.focus(); });
        row.dataset.shortcutId = item.id; row.append(node('a', { href: item.url, target: '_blank', rel: 'noopener noreferrer' }, item.title), pin); list.append(row);
      }); $('[data-favourites-status]', container).textContent = `Przypięte odnośniki: ${favourites.size}`; $('[data-shortcut-storage]', container).textContent = 'Osobiste skróty, bez logowania i danych szkolnych. ' + storageNote('Wybrane odnośniki');
    };
    $('[data-role]', container).addEventListener('change', draw); draw();
  }
  function officeDemo(container) {
    const box = markup('<h3>Z jaką sprawą przychodzisz?</h3><label class="fx-field">Wybierz temat<select data-office-topic><option value="kandydat">Pytanie o przyjęcie do szkoły</option><option value="dokument">Dokument lub zaświadczenie</option><option value="projekt">Propozycja współpracy ze szkołą</option></select></label><div class="fx-result" data-office-result aria-live="polite"></div><p class="fx-note">Przykładowy sposób prowadzenia użytkownika. Docelowe procedury i wymagania zatwierdza szkoła. Nie przyjmujemy zgłoszeń ani danych osobowych.</p>'); container.append(...box.childNodes);
    const topics = {
      kandydat: ['Zacznij od informacji o rekrutacji', ['Sprawdź opis interesującego Cię kierunku.', 'Zapoznaj się z aktualnymi zasadami i terminami.', 'Jeśli potrzebujesz wyjaśnienia, skontaktuj się ze szkołą.'], 'https://zsp6tom.pl/?page_id=2537', 'Otwórz stronę rekrutacji'],
      dokument: ['Ustal sposób załatwienia sprawy', ['Zapytaj sekretariat, kto obsługuje dany dokument.', 'Potwierdź, jakie informacje są potrzebne i jak je bezpiecznie przekazać.', 'Uzgodnij sposób oraz termin odbioru.'], 'https://zsp6tom.pl/?page_id=318', 'Otwórz kontakt do szkoły'],
      projekt: ['Przygotuj krótki opis propozycji', ['Opisz temat i cel współpracy.', 'Określ grupę odbiorców i proponowany termin.', 'Zapytaj szkołę o właściwą osobę do rozmowy.'], 'https://zsp6tom.pl/?page_id=318', 'Otwórz kontakt do szkoły']
    };
    const draw = () => { const [title, points, url, link] = topics[$('[data-office-topic]', container).value]; const result = $('[data-office-result]', container); const list = node('ol'); points.forEach(point => list.append(node('li', {}, point))); result.replaceChildren(node('h4', {}, title), list, node('a', { href: url, target: '_blank', rel: 'noopener noreferrer' }, link)); };
    $('[data-office-topic]', container).addEventListener('change', draw); draw();
  }
  function editorDemo(container) {
    const box = markup(`<h3>Przygotuj przykładową aktualność</h3><div class="fx-grid-two"><div><label class="fx-field">Tytuł wpisu<input type="text" maxlength="110" value="Zajrzyj do naszej pracowni" data-editor-title></label><label class="fx-field">Kategoria<select data-editor-category><option>Życie szkoły</option><option>Projekty</option><option>Rekrutacja</option></select></label><label class="fx-field">Krótka treść<textarea maxlength="1500" data-editor-text>To przykładowa treść do sprawdzenia wyglądu wpisu. Wpisz własny tekst i zobacz, jak zmienia się podgląd.</textarea></label></div><article class="fx-article-preview" aria-label="Podgląd przykładowej aktualności"><p class="fx-article-category" data-preview-category></p><h4 data-preview-title></h4><p data-preview-text></p><small>Podgląd demonstracyjny. Wpis nie jest opublikowany.</small></article></div><button type="button" class="fx-demo-action fx-secondary" data-editor-download>Pobierz szkic jako tekst</button><p class="fx-note">Treść pozostaje tylko w tym oknie i znika po jego zamknięciu. Nie wpisuj danych osobowych. Publikacja w serwisie i wspólna praca redakcji wymagają CMS.</p>`);
    container.append(...box.childNodes);
    const draw = () => { $('[data-preview-title]', container).textContent = $('[data-editor-title]', container).value.trim() || 'Tytuł aktualności'; $('[data-preview-category]', container).textContent = $('[data-editor-category]', container).value; $('[data-preview-text]', container).textContent = $('[data-editor-text]', container).value || 'Treść aktualności'; };
    $$('input,select,textarea', container).forEach(input => input.addEventListener('input', draw));
    $('[data-editor-download]', container).addEventListener('click', () => download('ZSP6-szkic-aktualnosci-DEMO.txt', '\ufeffDEMONSTRACJA — nieopublikowany szkic\n\n' + $('[data-editor-title]', container).value + '\nKategoria: ' + $('[data-editor-category]', container).value + '\n\n' + $('[data-editor-text]', container).value)); draw();
  }
})();
