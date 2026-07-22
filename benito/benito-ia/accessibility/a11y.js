window.BenitoA11y=(function(){
  function init(root){
    root.setAttribute('role','region');
    root.setAttribute('aria-label','Asistente institucional Benito IA');
    const panel=root.querySelector('.bia-panel');
    const launcher=root.querySelector('.bia-launcher');
    if(panel){
      panel.setAttribute('role','dialog');
      panel.setAttribute('aria-modal','false');
      panel.setAttribute('aria-label','Conversación con Benito IA');
    }
    if(launcher)launcher.setAttribute('aria-expanded','false');

    const observer=new MutationObserver(()=>{
      root.querySelectorAll('button:not([type])').forEach(b=>b.type='button');
      root.querySelectorAll('a[target="_blank"]').forEach(a=>{
        a.rel='noopener noreferrer';
        if(!a.getAttribute('aria-label'))a.setAttribute('aria-label',a.textContent.trim()+' (abre en una pestaña nueva)');
      });
    });
    observer.observe(root,{subtree:true,childList:true});
  }
  return{init};
})();