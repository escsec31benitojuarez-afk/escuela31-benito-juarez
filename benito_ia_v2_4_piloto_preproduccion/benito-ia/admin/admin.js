(async function(){
  const store=window.BenitoKnowledgeStore;
  const knowledge=await store.load();
  let entities=JSON.parse(JSON.stringify(knowledge.entities||[]));

  const $=s=>document.querySelector(s);
  const cards=$('#cards'), search=$('#search'), moduleFilter=$('#moduleFilter'), statusFilter=$('#statusFilter');

  function stats(){
    $('#total').textContent=entities.length;
    $('#validated').textContent=entities.filter(x=>x.validation?.status==='validado').length;
    $('#pending').textContent=entities.filter(x=>x.validation?.status!=='validado').length;
    $('#modules').textContent=new Set(entities.map(x=>x.module)).size;
  }

  function render(){
    stats();
    const q=search.value.toLowerCase().trim();
    const mod=moduleFilter.value, st=statusFilter.value;
    cards.innerHTML='';
    entities.filter(e=>{
      const text=[e.title,e.summary,...(e.keywords||[])].join(' ').toLowerCase();
      return (!q||text.includes(q))&&(!mod||e.module===mod)&&(!st||e.validation?.status===st);
    }).forEach(e=>{
      const card=document.createElement('article');
      card.className='card';
      const status=e.validation?.status||'pendiente';
      card.innerHTML=`
        <h3>${e.icon||'•'} ${e.title}</h3>
        <div class="meta">
          <span class="tag">${e.module}</span>
          <span class="tag ${status==='validado'?'valid':'pending'}">${status}</span>
        </div>
        <p>${e.summary}</p>
        <div class="actions">
          <button data-edit="${e.id}">Editar</button>
          <button class="secondary" data-valid="${e.id}">${status==='validado'?'Marcar pendiente':'Validar'}</button>
        </div>`;
      cards.appendChild(card);
    });
  }

  function populateModules(){
    const mods=[...new Set(entities.map(x=>x.module))].sort();
    moduleFilter.innerHTML='<option value="">Todos los módulos</option>'+mods.map(x=>`<option>${x}</option>`).join('');
  }

  function openEdit(id){
    const e=entities.find(x=>x.id===id);
    if(!e)return;
    $('#editId').value=e.id;
    $('#editTitle').value=e.title||'';
    $('#editModule').value=e.module||'';
    $('#editSummary').value=e.summary||'';
    $('#editKeywords').value=(e.keywords||[]).join(', ');
    $('#editStatus').value=e.validation?.status||'pendiente';
    $('#editDialog').showModal();
  }

  cards.addEventListener('click',ev=>{
    const edit=ev.target.dataset.edit, valid=ev.target.dataset.valid;
    if(edit)openEdit(edit);
    if(valid){
      const e=entities.find(x=>x.id===valid);
      e.validation=e.validation||{};
      e.validation.status=e.validation.status==='validado'?'pendiente':'validado';
      e.validation.reviewedAt=e.validation.status==='validado'?new Date().toISOString().slice(0,10):'';
      e.validation.reviewedBy=e.validation.status==='validado'?'Revisión local':'';
      render();
    }
  });

  $('#editForm').addEventListener('submit',ev=>{
    ev.preventDefault();
    const e=entities.find(x=>x.id===$('#editId').value);
    e.title=$('#editTitle').value.trim();
    e.module=$('#editModule').value.trim();
    e.summary=$('#editSummary').value.trim();
    e.keywords=$('#editKeywords').value.split(',').map(x=>x.trim()).filter(Boolean);
    e.validation=e.validation||{};
    e.validation.status=$('#editStatus').value;
    $('#editDialog').close();
    populateModules();render();
  });

  $('#cancelEdit').onclick=()=>$('#editDialog').close();

  $('#exportKnowledge').onclick=()=>{
    download('benito-ia-conocimiento.json',JSON.stringify({...knowledge,entities},null,2),'application/json');
  };

  $('#exportRag').onclick=()=>{
    const rag=window.BenitoRAGExport.build({...knowledge,entities});
    download('benito-ia-rag-chunks.json',JSON.stringify(rag,null,2),'application/json');
  };

  $('#importKnowledge').addEventListener('change',async ev=>{
    const file=ev.target.files[0];
    if(!file)return;
    try{
      const data=JSON.parse(await file.text());
      if(!Array.isArray(data.entities))throw new Error('Formato inválido');
      entities=data.entities;
      populateModules();render();
    }catch(e){alert('No se pudo importar el archivo: '+e.message)}
  });

  function download(name,text,type){
    const blob=new Blob([text],{type});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download=name;a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }

  [search,moduleFilter,statusFilter].forEach(x=>x.addEventListener('input',render));
  populateModules();render();
})();