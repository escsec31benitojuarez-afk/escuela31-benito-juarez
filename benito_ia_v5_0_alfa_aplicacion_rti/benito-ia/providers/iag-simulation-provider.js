window.BenitoIAGSimulationProvider=(function(){
  async function generate(request){
    const valid=request.context.filter(x=>x.validated);
    if(!valid.length){
      return{
        answer:'No encuentro evidencia institucional validada suficiente para responder con seguridad. Es necesario revisar el Centro de Conocimiento o consultar a la escuela.',
        citations:[],
        confidence:.18,
        provider:'simulador-iag-local',
        warnings:['Evidencia insuficiente']
      };
    }

    const selected=valid.slice(0,3);
    const answer=selected.map(x=>x.text).join(' ');
    return{
      answer,
      citations:selected.map(x=>x.chunkId),
      confidence:Math.min(.94,.55+selected.length*.11),
      provider:'simulador-iag-local',
      warnings:['Respuesta simulada: no se utilizó un modelo externo.']
    };
  }
  return{generate};
})();