window.BenitoAuditLog=(function(){
  const KEY='benitoIA_v23_audit';
  function sanitize(text){
    return(text||'').replace(/\b\d{7,8}\b/g,'[dato oculto]').replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi,'[correo oculto]');
  }
  function add(event){
    let items=[];
    try{items=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
    items.push({
      at:new Date().toISOString(),
      type:event.type||'interaction',
      query:sanitize(event.query||''),
      provider:event.provider||'',
      confidence:event.confidence??null,
      citations:event.citations||[],
      warnings:event.warnings||[],
      status:event.status||'ok'
    });
    items=items.slice(-100);
    try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}
  }
  function list(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
  function clear(){localStorage.removeItem(KEY)}
  function exportData(){return{generatedAt:new Date().toISOString(),events:list()}}
  return{add,list,clear,exportData};
})();