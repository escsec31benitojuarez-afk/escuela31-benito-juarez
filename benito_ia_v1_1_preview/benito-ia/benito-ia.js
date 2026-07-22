(function () {
  'use strict';
  const C = window.BENITO_IA_CONFIG;
  const KB = window.BENITO_IA_KNOWLEDGE || [];
  if (!C || document.getElementById('benitoIA')) return;

  const normalize = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñü\s]/g,' ').replace(/\s+/g,' ').trim();
  const tokenize = s => normalize(s).split(' ').filter(w => w.length > 2);
  const escapeHTML = s => s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function rank(query, item){
    const q = normalize(query), qTokens = tokenize(query);
    let score = 0;
    (item.patterns || []).forEach(p => {
      const n = normalize(p);
      if (q === n) score += 20;
      else if (q.includes(n)) score += 8 + n.split(' ').length * 2;
      else {
        const overlap = tokenize(n).filter(t => qTokens.includes(t)).length;
        score += overlap * 2;
      }
    });
    return score + (item.priority || 0);
  }
  function findAnswer(query){
    const ranked = KB.map(item => ({item,score:rank(query,item)})).sort((a,b)=>b.score-a.score);
    if (!ranked[0] || ranked[0].score < 6) return null;
    return ranked[0].item;
  }
  function el(tag, cls, html){ const n=document.createElement(tag); if(cls)n.className=cls; if(html!==undefined)n.innerHTML=html; return n; }

  const root = el('div','bia-root'); root.id='benitoIA';
  const launcher = el('button','bia-launcher',`<span class="bia-launcher-avatar">BJ</span><span class="bia-launcher-copy"><strong>${C.launcherLabel}</strong><small>¿Necesitás ayuda?</small></span><span class="bia-dot" aria-hidden="true"></span>`);
  launcher.type='button'; launcher.setAttribute('aria-label','Abrir Benito IA'); launcher.setAttribute('aria-expanded','false');
  const panel = el('section','bia-panel'); panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','false'); panel.setAttribute('aria-label',`${C.assistantName}, ${C.assistantSubtitle}`); panel.setAttribute('aria-hidden','true');
  panel.innerHTML = `
    <header class="bia-header">
      <div class="bia-avatar">BJ</div>
      <div class="bia-title"><strong>${C.assistantName}</strong><span>${C.assistantSubtitle}<br>${C.schoolName}</span></div>
      <div class="bia-tools"><button class="bia-icon-btn bia-reset" type="button" title="Reiniciar conversación" aria-label="Reiniciar conversación">↻</button><button class="bia-icon-btn bia-close" type="button" title="Cerrar" aria-label="Cerrar Benito IA">×</button></div>
    </header>
    <div class="bia-body">
      <div class="bia-welcome"><h3>${C.welcomeTitle}</h3><p>${C.welcomeText}</p></div>
      <div class="bia-messages" aria-live="polite"></div>
    </div>
    <div class="bia-quick" aria-label="Consultas sugeridas"></div>
    <form class="bia-composer"><input class="bia-input" type="text" autocomplete="off" maxlength="240" placeholder="Escribí tu consulta..." aria-label="Escribí tu consulta"><button class="bia-send" type="submit" aria-label="Enviar consulta">➤</button></form>
    <p class="bia-note">${C.privacyText}</p>`;
  root.append(launcher,panel); document.body.appendChild(root);

  const messages=panel.querySelector('.bia-messages'), body=panel.querySelector('.bia-body'), input=panel.querySelector('.bia-input'), send=panel.querySelector('.bia-send'), quick=panel.querySelector('.bia-quick');
  const quicks=['Aula Digital','Aprender a Aprender','Becas','Vida Escolar','Contacto'];
  quicks.forEach(q=>{ const b=el('button','bia-chip',q); b.type='button'; b.addEventListener('click',()=>submit(q)); quick.appendChild(b); });

  function scrollBottom(){ requestAnimationFrame(()=>{ body.scrollTop=body.scrollHeight; }); }
  function addMessage(role, html, item){
    const row=el('div',`bia-message ${role}`);
    if(role==='assistant') row.appendChild(el('div','bia-mini-avatar','BJ'));
    const bubble=el('div','bia-bubble'); bubble.innerHTML=`<p>${html}</p>`;
    if(item && item.action){ const a=el('a','bia-action',item.action.label+' →'); a.href=item.action.href; bubble.appendChild(a); }
    if(item && item.followups){ const wrap=el('div','bia-followups'); item.followups.forEach(text=>{const b=el('button','bia-followup',text);b.type='button';b.addEventListener('click',()=>submit(text));wrap.appendChild(b)});bubble.appendChild(wrap); }
    row.appendChild(bubble); messages.appendChild(row); scrollBottom();
  }
  function typing(on){
    const old=messages.querySelector('.bia-message.typing'); if(old)old.remove();
    if(!on)return;
    const row=el('div','bia-message assistant typing'); row.appendChild(el('div','bia-mini-avatar','BJ'));
    const bubble=el('div','bia-bubble'); bubble.innerHTML='<div class="bia-typing"><i></i><i></i><i></i></div>'; row.appendChild(bubble); messages.appendChild(row); scrollBottom();
  }
  function fallback(){
    return {response:'Todavía no tengo una respuesta específica para esa consulta. Puedo ayudarte con Aula Digital, becas, contacto, Vida Escolar, programas y técnicas de estudio. Probá escribir una frase breve o elegí una opción sugerida.',followups:['Aula Digital','¿Cómo estudio mejor?','Contacto']};
  }
  function submit(text){
    const q=(text || input.value).trim(); if(!q)return;
    addMessage('user',escapeHTML(q)); input.value=''; send.disabled=true; typing(true);
    const item=findAnswer(q) || fallback();
    window.setTimeout(()=>{ typing(false); addMessage('assistant',item.response,item); send.disabled=false; input.focus(); },C.typingDelay);
  }
  function setOpen(open){ root.classList.toggle('is-open',open); launcher.setAttribute('aria-expanded',String(open)); panel.setAttribute('aria-hidden',String(!open)); try{localStorage.setItem(C.storageKey,JSON.stringify({open:false}))}catch(e){} if(open)setTimeout(()=>input.focus(),150); }
  launcher.addEventListener('click',()=>setOpen(!root.classList.contains('is-open')));
  panel.querySelector('.bia-close').addEventListener('click',()=>setOpen(false));
  panel.querySelector('.bia-reset').addEventListener('click',()=>{messages.innerHTML='';addMessage('assistant','Conversación reiniciada. ¿En qué puedo ayudarte?');input.focus()});
  panel.querySelector('.bia-composer').addEventListener('submit',e=>{e.preventDefault();submit()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('is-open'))setOpen(false)});
  addMessage('assistant','Podés comenzar eligiendo una opción o escribiendo tu consulta.');
})();
