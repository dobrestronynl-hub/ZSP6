export const links=[
  {id:'rekrutacja',title:'Informacje o rekrutacji',description:'Zasady przyjęcia i oficjalne odnośniki dla kandydatów.',roles:['rodzic'],url:'https://zsp6tom.pl/?page_id=2537'},
  {id:'kalendarz',title:'Kalendarz i informacje dla uczniów',description:'Organizacja roku szkolnego, terminy i sprawy uczniowskie.',roles:['uczen','rodzic'],url:'https://zsp6tom.pl/?page_id=3042'},
  {id:'rodzice',title:'Informacje dla rodziców',description:'Materiały i informacje opublikowane dla opiekunów.',roles:['rodzic'],url:'https://zsp6tom.pl/?page_id=2906'},
  {id:'erasmus',title:'Projekty Erasmus+',description:'Praktyki zawodowe i projekty europejskie szkoły.',roles:['uczen','rodzic'],url:'https://zsp6tom.pl/?page_id=1749'},
  {id:'kontakt',title:'Kontakt ze szkołą',description:'Dane kontaktowe i adres sekretariatu.',roles:['uczen','rodzic'],url:'https://zsp6tom.pl/?page_id=318'},
  {id:'galeria',title:'Galeria fotograficzna',description:'Fotografie i realizacje opublikowane w galerii szkoły.',roles:['uczen'],url:'https://zsp6tom.pl/?page_id=260'},
  {id:'podreczniki',title:'Wykaz podręczników 2026/2027',description:'Oficjalny szkolny zestaw podręczników, plik DOCX.',roles:['uczen','rodzic'],url:'https://zsp6tom.pl/wp-content/uploads/2026/08/SZKOLNY-ZESTAW-PODRECZNIKOW-na-rok-szkolny-2026.docx'},
  {id:'ochrona',title:'Polityka ochrony małoletnich',description:'Zasady ochrony uczniów, dokument PDF szkoły.',roles:['uczen','rodzic'],url:'https://zsp6tom.pl/wp-content/uploads/2024/02/POLITYKA-OCHRONY-MALOLETNICH-w-ZSP-nr-6.pdf'}
];
export const storageKey='zsp6:standalone:panel:v1';
export function sanitizePreferences(value) {
  const known=new Set(links.map(item=>item.id));
  const raw=value&&typeof value==='object'?value:{};
  return {role:raw.role==='rodzic'?'rodzic':'uczen',pins:Array.isArray(raw.pins)?[...new Set(raw.pins.filter(id=>typeof id==='string'&&known.has(id)))]:[]};
}
export function visibleLinks(role,pins=[]) {
  const validRole=role==='rodzic'?'rodzic':'uczen';
  const favourites=new Set(pins);
  return links.filter(item=>item.roles.includes(validRole)).map((item,position)=>({...item,position})).sort((a,b)=>Number(favourites.has(b.id))-Number(favourites.has(a.id))||a.position-b.position);
}
export function togglePin(pins,id) {
  const current=sanitizePreferences({pins}).pins;
  if(!links.some(item=>item.id===id))return current;
  return current.includes(id)?current.filter(item=>item!==id):[...current,id];
}
