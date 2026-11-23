import {documents,findDocuments} from './logic.mjs';
const query=document.querySelector('#document-query');
const audience=document.querySelector('#document-audience');
const list=document.querySelector('#document-results');
const status=document.querySelector('#document-status');
const empty=document.querySelector('#document-empty');
const reset=document.querySelector('#document-reset');

function render() {
  const found=findDocuments(query.value,audience.value);
  const ids=new Set(found.map(item=>item.id));
  list.querySelectorAll('[data-document]').forEach(row=>{row.hidden=!ids.has(row.dataset.document);});
  status.textContent=`Znalezione materiały: ${found.length} z ${documents.length}.`;
  empty.hidden=found.length>0;
  reset.disabled=!query.value && audience.value==='all';
}
query.addEventListener('input',render);
audience.addEventListener('change',render);
reset.addEventListener('click',()=>{query.value='';audience.value='all';render();query.focus();});
render();
