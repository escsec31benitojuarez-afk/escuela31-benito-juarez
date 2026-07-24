window.BenitoFeedback=(function(){
  function controls(messageId){
    const wrap=document.createElement('div');
    wrap.className='bia-feedback';
    wrap.innerHTML='<span>¿Te resultó útil?</span><button type="button" aria-label="Respuesta útil">👍</button><button type="button" aria-label="Respuesta no útil">👎</button>';
    const buttons=wrap.querySelectorAll('button');
    buttons[0].onclick=()=>record('positive',messageId,wrap);
    buttons[1].onclick=()=>record('negative',messageId,wrap);
    return wrap;
  }
  function record(value,messageId,wrap){
    window.BenitoTelemetry?.add('feedback',{feedback:value});
    wrap.innerHTML='<span>Gracias por tu devolución.</span>';
  }
  return{controls};
})();