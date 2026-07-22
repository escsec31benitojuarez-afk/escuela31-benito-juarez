(function () {
  'use strict';
  const C = window.BENITO_IA_CONFIG;
  const KB = window.BENITO_IA_KNOWLEDGE || [];
  if (!C || document.getElementById('benitoIA')) return;

  const state = { profile:null, context:'general', history:[] };

  const normalize = s => (s || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñü\s]/g,' ')
    .replace(/\s+/g,' ').trim();
  const tokenize = s => normalize(s).split(' ').filter(w => w.length > 2);
  const escapeHTML = s => s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function levenshtein(a,b){
    a=normalize(a); b=normalize(b);
    const m=a.length,n=b.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
    for(let i=0;i<=m;i++)dp[i][0]=i;
    for(let j=0;j<=n;j++)dp[0][j]=j;
    for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){
      dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    }
    return dp[m][n];
  }
  function similarity(a,b){
    const max=Math.max(normalize(a).length,normalize(b).length)||1;
    return 1-(levenshtein(a,b)/max);
  }
  function rank(query,item){
    const q=normalize(query),qt=tokenize(query);
    let score=0;
    (item.patterns||[]).forEach(p=>{
      const n=normalize(p);
      if(q===n) score+=24;
      else if(q.includes(n)||n.includes(q)) score+=10;
      const overlap=tokenize(n).filter(t=>qt.includes(t)).length;
      score+=overlap*3;
      const sim=similarity(q,n);
      if(sim>=C.fuzzyThreshold) score+=Math.round(sim*9);
    });
    if(state.context && item.context===state.context) score+=5;
    if(item.contextualPatterns && item.context===state.context){
      item.contextualPatterns.forEach(p=>{ if(q.includes(normalize(p))) score+=10; });
    }
    if(state.profile && item.profiles && item.profiles.includes(state.profile)) score+=4;
    return score+(item.priority||0);
  }
  function findAnswer(query){
    const ranked=KB.map(item=>({item,score:rank(query,item)})).sort((a,b)=>b.score-a.score);
    return (!ranked[0]||ranked[0].score<7)?null:ranked[0].item;
  }
  const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n};

  const root=el('div','bia-root'); root.id='benitoIA';
  const launcher=el('button','bia-launcher',`<span class="bia-launcher-avatar">BJ</span><span class="bia-launcher-copy"><strong>${C.launcherLabel}</strong><small>¿Necesitás ayuda?</small></span><span class="bia-dot"></span>`);
  launcher.type='button'; launcher.setAttribute('aria-label','Abrir Benito IA'); launcher.setAttribute('aria-expanded','false');

  const panel=el('section','bia-panel'); panel.setAttribute('role','dialog'); panel.setAttribute('aria-label',`${C.assistantName}, ${C.assistantSubtitle}`); panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`
    <header class="bia-header">
      <div class="bia-avatar">BJ</div>
      <div class="bia-title"><strong>${C.assistantName}</strong><span>${C.assistantSubtitle}<br>${C.schoolName}</span></div>
      <div class="bia-tools">
        <button class="bia-icon-btn bia-profile-change" type="button" title="Cambiar perfil" aria-label="Cambiar perfil">👤</button>
        <button class="bia-icon-btn bia-reset" type="button" title="Reiniciar conversación" aria-label="Reiniciar conversación">↻</button>
        <button class="bia-icon-btn bia-close" type="button" title="Cerrar" aria-label="Cerrar Benito IA">×</button>
      </div>
    </header>
    <div class="bia-body">
      <div class="bia-welcome"><h3>${C.welcomeTitle}</h3><p>${C.welcomeText}</p></div>
      <div class="bia-profile-panel" aria-label="Elegir perfil"></div>
      <div class="bia-messages" aria-live="polite"></div>
    </div>
    <div class="bia-quick" aria-label="Consultas sugeridas"></div>
    <form class="bia-composer"><input class="bia-input" type="text" autocomplete="off" maxlength="240" placeholder="Escribí tu consulta..." aria-label="Escribí tu consulta"><button class="bia-send" type="submit" aria-label="Enviar consulta">➤</button></form>
    <p class="bia-note">${C.privacyText}</p>`;
  root.append(launcher,panel); document.body.appendChild(root);

  const messages=panel.querySelector('.bia-messages'), body=panel.querySelector('.bia-body');
  const input=panel.querySelector('.bia-input'), send=panel.querySelector('.bia-send');
  const quick=panel.querySelector('.bia-quick'), profilePanel=panel.querySelector('.bia-profile-panel');

  function save(){
    try{localStorage.setItem(C.storageKey,JSON.stringify({profile:state.profile,context:state.context}))}catch(e){}
  }
  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(C.storageKey)||'{}');
      if(saved.profile&&C.profiles[saved.profile]) state.profile=saved.profile;
      if(saved.context) state.context=saved.context;
    }catch(e){}
  }
  function scrollBottom(){requestAnimationFrame(()=>{body.scrollTop=body.scrollHeight})}
  function renderQuick(){
    quick.innerHTML='';
    const items=state.profile?C.profiles[state.profile].quicks:['Aula Digital','Aprender a Aprender','Becas','Contacto'];
    items.forEach(q=>{const b=el('button','bia-chip',q);b.type='button';b.addEventListener('click',()=>submit(q));quick.appendChild(b)});
  }
  function renderProfiles(show=true){
    profilePanel.innerHTML='';
    profilePanel.hidden=!show;
    if(!show)return;
    Object.entries(C.profiles).forEach(([id,p])=>{
      const b=el('button','bia-profile-card',`<span>${p.icon}</span><strong>${p.label}</strong>`);
      b.type='button'; b.addEventListener('click',()=>selectProfile(id)); profilePanel.appendChild(b);
    });
  }
  function selectProfile(id){
    state.profile=id; save(); renderProfiles(false); renderQuick();
    const p=C.profiles[id];
    addMessage('assistant',`Perfecto. Voy a adaptar la orientación para el perfil <strong>${p.label.replace('Soy ','').toLowerCase()}</strong>. ¿Qué necesitás consultar?`);
    input.focus();
  }
  function addMessage(role,html,item){
    const row=el('div',`bia-message ${role}`);
    if(role==='assistant')row.appendChild(el('div','bia-mini-avatar','BJ'));
    const bubble=el('div','bia-bubble'); bubble.innerHTML=`<p>${html}</p>`;
    if(item&&item.action){const a=el('a','bia-action',item.action.label+' →');a.href=item.action.href;bubble.appendChild(a)}
    if(item&&item.followups){
      const wrap=el('div','bia-followups');
      item.followups.forEach(text=>{const b=el('button','bia-followup',text);b.type='button';b.addEventListener('click',()=>submit(text));wrap.appendChild(b)});
      bubble.appendChild(wrap);
    }
    row.appendChild(bubble); messages.appendChild(row); scrollBottom();
  }
  function typing(on){
    const old=messages.querySelector('.bia-message.typing');if(old)old.remove();if(!on)return;
    const row=el('div','bia-message assistant typing');row.appendChild(el('div','bia-mini-avatar','BJ'));
    const bubble=el('div','bia-bubble');bubble.innerHTML='<div class="bia-typing"><i></i><i></i><i></i></div>';row.appendChild(bubble);messages.appendChild(row);scrollBottom();
  }
  function fallback(){
    return {response:'Todavía no tengo una respuesta específica para esa consulta. Puedo orientarte sobre Aula Digital, becas, contacto, Vida Escolar, programas y técnicas de estudio.',followups:['Aula Digital','¿Cómo estudio mejor?','Contacto']};
  }
  function submit(text){
    const q=(text||input.value).trim();if(!q)return;
    addMessage('user',escapeHTML(q));input.value='';send.disabled=true;typing(true);
    const item=findAnswer(q)||fallback();
    if(item.context)state.context=item.context;
    state.history.push({q,id:item.id||'fallback'});state.history=state.history.slice(-C.maxHistory);save();
    setTimeout(()=>{typing(false);addMessage('assistant',item.response,item);send.disabled=false;input.focus()},C.typingDelay);
  }
  function reset(full=false){
    messages.innerHTML='';state.context='general';state.history=[];
    if(full){state.profile=null;renderProfiles(true)}
    renderQuick();save();
    addMessage('assistant',full?'Elegí nuevamente tu perfil para personalizar la orientación.':'Conversación reiniciada. ¿En qué puedo ayudarte?');
  }
  function setOpen(open){
    root.classList.toggle('is-open',open);launcher.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));
    if(open)setTimeout(()=>input.focus(),150);
  }

  launcher.addEventListener('click',()=>setOpen(!root.classList.contains('is-open')));
  panel.querySelector('.bia-close').addEventListener('click',()=>setOpen(false));
  panel.querySelector('.bia-reset').addEventListener('click',()=>reset(false));
  panel.querySelector('.bia-profile-change').addEventListener('click',()=>reset(true));
  panel.querySelector('.bia-composer').addEventListener('submit',e=>{e.preventDefault();submit()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('is-open'))setOpen(false)});

  load(); renderProfiles(!state.profile); renderQuick();
  addMessage('assistant',state.profile?`Bienvenido nuevamente. Tu perfil actual es <strong>${C.profiles[state.profile].label.toLowerCase()}</strong>. ¿En qué puedo ayudarte?`:'Para comenzar, elegí el perfil que mejor te representa.');
})();