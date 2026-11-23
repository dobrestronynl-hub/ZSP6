import { defaultDate,eventDetails,calendarFile } from './logic.mjs';

const day=document.querySelector('#meeting-date'),time=document.querySelector('#meeting-time'),duration=document.querySelector('#meeting-duration'),topic=document.querySelector('#meeting-topic');
const status=document.querySelector('#calendar-status');
const preview=document.querySelector('#event-preview');
day.value=defaultDate();
const options=()=>({date:day.value,time:time.value,duration:duration.value,topic:topic.value});
function updatePreview(announce=false){
  try{
    const event=eventDetails(options());
    document.querySelector('#preview-title').textContent='DEMO: '+event.title;
    document.querySelector('#preview-date').textContent=new Intl.DateTimeFormat('pl-PL',{timeZone:'Europe/Warsaw',dateStyle:'full'}).format(event.start);
    document.querySelector('#preview-time').textContent=new Intl.DateTimeFormat('pl-PL',{timeZone:'Europe/Warsaw',hour:'2-digit',minute:'2-digit'}).format(event.start)+' – '+new Intl.DateTimeFormat('pl-PL',{timeZone:'Europe/Warsaw',hour:'2-digit',minute:'2-digit'}).format(event.end)+' (czas w Polsce)';
    document.querySelector('#preview-duration').textContent=event.minutes+' minut';
    preview.hidden=false;
    if(announce)status.textContent='Podgląd zaktualizowany. To termin testowy, bez zapisu na spotkanie.';
    return true;
  }catch(error){preview.hidden=true;if(announce)status.textContent=error.message;return false;}
}
[day,time,duration,topic].forEach(field=>field.addEventListener('change',()=>updatePreview(true)));
document.querySelector('#export').addEventListener('click',()=>{
  if(!day.reportValidity()){status.textContent='Uzupełnij prawidłową datę przed pobraniem pliku.';return;}
  if(!updatePreview(true))return;
  const content=calendarFile(options());
  const url=URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download=`ZSP6-spotkanie-DEMO-${day.value}.ics`;
  document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
  status.textContent='Przygotowano plik ICS. Możesz zaimportować go do własnego kalendarza. Nie zapisano Cię na wydarzenie szkoły.';
});
updatePreview();
