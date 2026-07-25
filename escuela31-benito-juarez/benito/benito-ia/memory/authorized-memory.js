window.BenitoAuthorizedMemory=(function(){
  const KEY='benitoIA_v30_authorized_memory';
  function load(){
    try{return JSON.parse(localStorage.getItem(KEY)||'{"enabled":false,"items":[]}')}
    catch(e){return{enabled:false,items:[]}}
  }
  function save(data){localStorage.setItem(KEY,JSON.stringify(data))}
  function enable(value){const d=load();d.enabled=!!value;save(d);return d}
  function remember(item){
    const d=load();
    if(!d.enabled)return{saved:false,reason:'memory-disabled'};
    d.items.push({
      id:'mem-'+Date.now(),
      createdAt:new Date().toISOString(),
      type:item.type||'preference',
      label:item.label||'',
      value:item.value||'',
      scope:item.scope||'session',
      authorized:true
    });
    d.items=d.items.slice(-30);save(d);return{saved:true};
  }
  function list(){return load().items||[]}
  function forget(id){const d=load();d.items=(d.items||[]).filter(x=>x.id!==id);save(d)}
  function clear(){localStorage.removeItem(KEY)}
  function context(){
    const d=load();
    if(!d.enabled)return[];
    return(d.items||[]).map(x=>({type:x.type,label:x.label,value:x.value,scope:x.scope}));
  }
  return{load,enable,remember,list,forget,clear,context};
})();