export const TOPICS = Object.freeze({
  pracownie: 'Poznanie pracowni',
  oferta: 'Rozmowa o kierunkach',
  rekrutacja: 'Pytania o rekrutację'
});
const TIME_ZONE = 'Europe/Warsaw';
const partsFormatter = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23' });

function partsAt(instant) {
  return Object.fromEntries(partsFormatter.formatToParts(new Date(instant)).filter(part=>part.type!=='literal').map(part=>[part.type,Number(part.value)]));
}
function representedAt(instant) {
  const p=partsAt(instant);
  return Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second);
}
export function warsawToUtc(day,time) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !/^\d{2}:\d{2}$/.test(time)) throw new RangeError('Podaj prawidłową datę i godzinę.');
  const [year,month,date]=day.split('-').map(Number),[hour,minute]=time.split(':').map(Number);
  if(year<2000||year>2100||month<1||month>12||date<1||date>31||hour>23||minute>59) throw new RangeError('Data musi mieścić się w latach 2000–2100, a godzina musi być prawidłowa.');
  const naive=Date.UTC(year,month-1,date,hour,minute);
  const check=new Date(naive);
  if(check.getUTCFullYear()!==year||check.getUTCMonth()+1!==month||check.getUTCDate()!==date) throw new RangeError('Wybrana data nie istnieje w kalendarzu.');
  const offsets=new Set([-36,0,36].map(hours=>{
    const sample=naive+hours*3600000;return representedAt(sample)-sample;
  }));
  const candidates=[...offsets].map(offset=>naive-offset).filter(instant=>{
    const p=partsAt(instant);return p.year===year&&p.month===month&&p.day===date&&p.hour===hour&&p.minute===minute;
  });
  if(candidates.length!==1) throw new RangeError(candidates.length ? 'Ta godzina występuje dwukrotnie przy zmianie czasu. Wybierz inną godzinę.' : 'Ta godzina nie istnieje przy zmianie czasu. Wybierz inną godzinę.');
  return new Date(candidates[0]);
}
export function defaultDate(now=new Date()) {
  if(!(now instanceof Date)||Number.isNaN(now.getTime())) throw new RangeError('Nieprawidłowa data odniesienia.');
  const p=partsAt(now.getTime()+7*86400000);
  return `${p.year}-${String(p.month).padStart(2,'0')}-${String(p.day).padStart(2,'0')}`;
}
export function eventDetails({date,time,duration,topic}) {
  if(!Object.hasOwn(TOPICS,topic)) throw new RangeError('Wybierz temat spotkania.');
  if(!['10:00','12:00','16:00'].includes(time)) throw new RangeError('Wybierz jedną z podanych godzin.');
  const minutes=Number(duration);
  if(![30,60,90].includes(minutes)) throw new RangeError('Wybierz czas trwania 30, 60 lub 90 minut.');
  const start=warsawToUtc(date,time);
  return {start,end:new Date(start.getTime()+minutes*60000),minutes,title:TOPICS[topic],date,time};
}
export const stamp = date => date.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
export function escapeText(text) {return String(text).replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
export function foldLine(line) {
  const encoder=new TextEncoder();let result='',bytes=0;
  for(const character of line){const size=encoder.encode(character).length;if(bytes+size>75){result+='\r\n ';bytes=1;}result+=character;bytes+=size;}
  return result;
}
export function calendarFile(options,now=new Date()) {
  if(!(now instanceof Date)||Number.isNaN(now.getTime())) throw new RangeError('Nieprawidłowy czas utworzenia.');
  const event=eventDetails(options);
  const description='Demonstracja funkcjonalności ZSP6. Data została wybrana przez użytkownika, a godzina dotyczy strefy Europe/Warsaw. To nie jest wydarzenie ogłoszone przez szkołę ani rezerwacja miejsca. Rzeczywiste terminy należy sprawdzić na oficjalnej stronie szkoły.';
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ZSP6//Standalone Demo//PL','CALSCALE:GREGORIAN','BEGIN:VEVENT',
    `UID:zsp6-demo-${now.getTime()}-${event.start.getTime()}@demo.invalid`,
    `DTSTAMP:${stamp(now)}`,`DTSTART:${stamp(event.start)}`,`DTEND:${stamp(event.end)}`,
    `SUMMARY:${escapeText('DEMO: '+event.title)}`,`DESCRIPTION:${escapeText(description)}`,
    'CATEGORIES:DEMO','STATUS:TENTATIVE','END:VEVENT','END:VCALENDAR'].map(foldLine).join('\r\n')+'\r\n';
}
