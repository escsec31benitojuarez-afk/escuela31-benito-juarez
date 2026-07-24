window.BenitoAPIResponseValidator=(function(){
  function validate(data,request){
    const errors=[];
    if(!data||typeof data!=='object')errors.push('Respuesta vacía o inválida.');
    if(typeof data?.answer!=='string'||!data.answer.trim())errors.push('Falta el texto de respuesta.');
    if(!Array.isArray(data?.citations))errors.push('Faltan las citas.');
    if(typeof data?.confidence!=='number'||data.confidence<0||data.confidence>1)errors.push('Confianza inválida.');
    if(typeof data?.provider!=='string')errors.push('Proveedor no identificado.');

    const allowed=new Set((request.context||[]).map(x=>x.chunkId));
    (data?.citations||[]).forEach(id=>{
      if(!allowed.has(id))errors.push(`Cita no autorizada: ${id}`);
    });

    return{valid:errors.length===0,errors};
  }
  return{validate};
})();