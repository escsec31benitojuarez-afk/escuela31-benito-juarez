window.BenitoPilotUI=(function(){
  function init(root){
    const C=window.BENITO_IA_CONFIG;
    if(!C.pilot?.enabled)return;
    if(C.pilot.showPilotBadge){
      const badge=document.createElement('div');
      badge.className='bia-pilot-badge';
      badge.textContent='PILOTO';
      root.appendChild(badge);
    }
    const panel=root.querySelector('.bia-panel');
    if(panel){
      const notice=document.createElement('div');
      notice.className='bia-pilot-notice';
      notice.innerHTML='<strong>Versión piloto institucional</strong><span>Las respuestas pueden requerir verificación humana.</span>';
      panel.querySelector('.bia-body')?.prepend(notice);
    }
    window.BenitoNetworkStatus?.subscribe(status=>{
      root.classList.toggle('is-offline',status==='offline');
      const st=root.querySelector('.status-text');
      if(st&&status==='offline')st.textContent='Modo local sin conexión';
    });
  }
  return{init};
})();