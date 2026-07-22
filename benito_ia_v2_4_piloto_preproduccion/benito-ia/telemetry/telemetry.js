window.BenitoTelemetry=(function(){
  const KEY='benitoIA_v24_telemetry';
  function anonymize(text){
    return(text||'')
      .replace(/\b\d{7,8}\b/g,'[documento]')
      .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi,'[correo]')
      .replace(/\+?\d[\d\s()-]{7,}/g,'[telefono]')
      .slice(0,180);
  }
  function add(type,data={}){
    if(!window.BENITO_IA_CONFIG.pilot.telemetryEnabled)return;
    let list=[];try{list=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
    list.push({
      at:new Date().toISOString(),
      type,
      query:data.query?anonymize(data.query):'',
      profile:data.profile||'',
      provider:data.provider||'',
      confidence:data.confidence??null,
      success:data.success!==false,
      latencyMs:data.latencyMs??null,
      sourceCount:data.sourceCount??0,
      feedback:data.feedback||''
    });
    list=list.slice(-300);
    try{localStorage.setItem(KEY,JSON.stringify(list))}catch(e){}
  }
  function list(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
  function clear(){localStorage.removeItem(KEY)}
  function summary(){
    const rows=list(),queries=rows.filter(x=>x.type==='query'),feedback=rows.filter(x=>x.type==='feedback');
    const avg=a=>a.length?Math.round(a.reduce((s,x)=>s+x,0)/a.length):0;
    return{
      events:rows.length,
      queries:queries.length,
      successful:queries.filter(x=>x.success).length,
      avgLatency:avg(queries.map(x=>x.latencyMs).filter(Number.isFinite)),
      avgConfidence:avg(queries.map(x=>x.confidence*100).filter(Number.isFinite)),
      positiveFeedback:feedback.filter(x=>x.feedback==='positive').length,
      negativeFeedback:feedback.filter(x=>x.feedback==='negative').length
    };
  }
  return{add,list,clear,summary};
})();