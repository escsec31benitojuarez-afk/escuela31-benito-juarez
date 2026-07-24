(function(global){
  'use strict';
  const patterns = [
    {type:'email', re:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/ig},
    {type:'dni', re:/\b\d{7,8}\b/g},
    {type:'phone', re:/\b(?:\+?54\s?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{6,10}\b/g}
  ];
  function inspect(text){
    const input=String(text||'');
    const findings=[];
    patterns.forEach(p=>{ let m; while((m=p.re.exec(input))!==null){ findings.push({type:p.type,value:m[0],index:m.index}); } p.re.lastIndex=0; });
    return {safe:findings.length===0, findings, message:findings.length?'Se detectaron posibles datos sensibles. Utilice datos sintéticos o anonimizados.':'No se detectaron datos sensibles evidentes.'};
  }
  global.BenitoSensitiveDataGuard={inspect};
})(window);
