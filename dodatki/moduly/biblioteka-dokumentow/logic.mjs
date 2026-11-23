export const documents = [
  { id:'ochrona', title:'Polityka ochrony małoletnich', description:'Zasady ochrony i bezpieczeństwa uczniów udostępnione przez szkołę.', type:'PDF', audiences:['wszyscy'], url:'https://zsp6tom.pl/wp-content/uploads/2024/02/POLITYKA-OCHRONY-MALOLETNICH-w-ZSP-nr-6.pdf' },
  { id:'kalendarz', title:'Kalendarz roku szkolnego 2026/2027', description:'Terminy zajęć, przerw, egzaminów i wydarzeń organizacyjnych.', type:'Strona', audiences:['uczen','rodzic'], url:'https://zsp6tom.pl/?page_id=3042' },
  { id:'rekrutacja', title:'Rekrutacja i informacje dla kandydatów', description:'Zasady przyjęcia, dokumenty i oficjalne odnośniki do naboru.', type:'Strona', audiences:['kandydat','rodzic'], url:'https://zsp6tom.pl/?page_id=2537' },
  { id:'erasmus', title:'Projekty europejskie Erasmus+', description:'Materiały, mobilności i sprawozdania z praktyk zawodowych.', type:'Strona', audiences:['uczen','rodzic'], url:'https://zsp6tom.pl/?page_id=1749' },
  { id:'duplikat', title:'Podanie o wydanie duplikatu świadectwa', description:'Formularz podania dla osoby, która potrzebuje duplikatu świadectwa.', type:'PDF', audiences:['uczen','absolwent'], url:'https://zsp6tom.pl/wp-content/uploads/2023/01/Podanie-o-wydanie-duplikatu-swiadectwa.pdf' },
  { id:'statut-technikum', title:'Statut Technikum nr 5', description:'Dokument dotyczący organizacji Technikum nr 5 im. Stanisława Wyspiańskiego.', type:'DOCX', audiences:['wszyscy'], url:'https://zsp6tom.pl/wp-content/uploads/2024/09/STATUT-TECHNIKUM.docx' },
  { id:'statut-liceum', title:'Statut Liceum Sztuk Plastycznych', description:'Dokument dotyczący organizacji Liceum Sztuk Plastycznych im. Stanisława Wyspiańskiego.', type:'DOCX', audiences:['wszyscy'], url:'https://zsp6tom.pl/wp-content/uploads/2024/12/STATUT-Liceum-Sztuk-Plastycznych-im.-S.-Wysianskiego.docx' },
  { id:'podreczniki', title:'Wykaz podręczników 2026/2027', description:'Szkolny zestaw podręczników na rok szkolny 2026/2027.', type:'DOCX', audiences:['uczen','rodzic'], url:'https://zsp6tom.pl/wp-content/uploads/2026/08/SZKOLNY-ZESTAW-PODRECZNIKOW-na-rok-szkolny-2026.docx' }
];

export function normalize(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/gi,'l').toLocaleLowerCase('pl');
}

export function findDocuments(query='', audience='all', collection=documents) {
  if (!['all','uczen','rodzic','kandydat','absolwent'].includes(audience)) return [];
  const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
  return collection.filter(item => (audience==='all' || item.audiences.includes('wszyscy') || item.audiences.includes(audience)) && terms.every(term=>normalize(`${item.title} ${item.description} ${item.type}`).includes(term)));
}
