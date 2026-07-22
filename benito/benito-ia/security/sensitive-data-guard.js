(function(global){
  'use strict';
  const patterns=[
    {label:'DNI o documento',re:/\b(?:dni|documento|cuil|cuit)\s*[:#-]?\s*\d{7,11}\b/i},
    {label:'correo electrónico',re:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i},
    {label:'teléfono',re:/(?:\+?54\s*)?(?:\(?\d{2,4}\)?[\s-]*)?\d{6,10}/},
    {label:'domicilio',re:/\b(?:domicilio|direcci[oó]n|calle|avenida|av\.)\s*[:#-]?\s*[^,;\n]{4,}/i},
    {label:'dato de salud',re:/\b(?:diagn[oó]stico|enfermedad|tratamiento|medicaci[oó]n|discapacidad|salud)\b/i},
    {label:'nombre nominal',re:/\b(?:apellido\s+y\s+nombre|nombre\s+completo|estudiante|alumno|alumna)\s*[:#-]\s*[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ' -]{3,}/i}
  ];
  function inspect(value){
    const text=typeof value==='string'?value:JSON.stringify(value||'');
    const findings=patterns.filter(p=>p.re.test(text)).map(p=>({label:p.label}));
    return {safe:findings.length===0,findings};
  }
  global.BenitoSensitiveDataGuard={inspect};
})(window);
