window.BenitoIAGExternalProvider=(function(){
  async function generate(request){
    const C=window.BENITO_IA_CONFIG;
    if(!C.iag.enabled)throw new Error('La conexión con IAG externa está desactivada.');
    if(!C.iag.endpoint)throw new Error('No se configuró un endpoint institucional.');

    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),C.iag.timeoutMs||15000);
    try{
      const response=await fetch(C.iag.endpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(request),
        signal:controller.signal
      });
      if(!response.ok)throw new Error(`Proveedor externo: HTTP ${response.status}`);
      return await response.json();
    }finally{
      clearTimeout(timer);
    }
  }
  return{generate};
})();