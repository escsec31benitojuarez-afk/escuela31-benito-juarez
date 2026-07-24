(function(){
  'use strict';

  const KB = [
    {
      id:'contacto', title:'Contacto institucional', icon:'📞',
      keywords:['contacto','telefono','teléfono','correo','email','mail','direccion','dirección','donde queda','ubicacion','ubicación','comunicarme','secretaria'],
      answer:'La Escuela Secundaria N.º 31 “Benito Juárez” está ubicada en Estación Yuquerí, Concordia, Entre Ríos. Teléfono: +54 345 4949814. Correo: secundaria31.cd@entrerios.edu.ar.',
      actions:[['Llamar','tel:+543454949814'],['Enviar correo','mailto:secundaria31.cd@entrerios.edu.ar'],['Abrir contacto','../contacto.html']]
    },
    {
      id:'aula', title:'Aula Digital', icon:'💻',
      keywords:['aula digital','materiales','material','curso','repositorio','drive','actividades por curso','recursos del curso'],
      answer:'El Aula Digital organiza materiales, actividades y producciones por curso. Podés ingresar y seleccionar el curso correspondiente.',
      actions:[['Abrir Aula Digital','../aula-digital.html']]
    },
    {
      id:'recursos', title:'Recursos educativos', icon:'📚',
      keywords:['recurso','recursos','tecnicas de estudio','técnicas de estudio','aprender a aprender','estudiar mejor','infografia','infografía','video educativo'],
      answer:'La sección Recursos reúne servicios institucionales y materiales educativos, incluido “Aprender a Aprender”, con técnicas de estudio y autonomía.',
      actions:[['Abrir Recursos','../recursos.html'],['Ir a Aprender a Aprender','../recursos.html#aprender-a-aprender']]
    },
    {
      id:'estudio', title:'Orientación para estudiar', icon:'🧠',
      keywords:['no se estudiar','no sé estudiar','tengo prueba','tengo examen','como estudio','cómo estudio','necesito estudiar','plan de estudio','me distraigo'],
      answer:'Podés comenzar con un plan breve: 1) definí una meta concreta; 2) estudiá activamente durante 15 minutos; 3) cerrá el material y explicá lo aprendido sin mirar; 4) corregí errores y anotá qué revisar.',
      actions:[['Ver técnicas de estudio','../recursos.html#aprender-a-aprender']]
    },
    {
      id:'becas', title:'Becas y acompañamiento', icon:'🎒',
      keywords:['beca','becas','progresar','instituto becario','ayuda economica','ayuda económica'],
      answer:'La información sobre becas y servicios de acompañamiento se encuentra en Recursos. Para una situación particular, Benito recomienda confirmar los requisitos vigentes con la escuela.',
      actions:[['Ver Recursos','../recursos.html'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id:'sage', title:'SAGE y seguimiento escolar', icon:'📊',
      keywords:['sage','calificaciones','notas','boletin','boletín','inasistencias','asistencia'],
      answer:'El acceso a SAGE y los servicios de seguimiento escolar se encuentra en la sección Recursos. Las situaciones particulares deben consultarse con la escuela.',
      actions:[['Ir a Recursos','../recursos.html'],['Contacto institucional','../contacto.html']]
    },
    {
      id:'institucion', title:'La institución', icon:'🏫',
      keywords:['institucion','institución','autoridades','rector','secretaria','asesora pedagogica','asesora pedagógica','quienes somos','quiénes somos'],
      answer:'La sección Institución reúne información sobre autoridades, organización escolar, modalidad y equipo institucional.',
      actions:[['Abrir Institución','../institucion.html']]
    },
    {
      id:'historia', title:'Historia e identidad', icon:'📜',
      keywords:['historia','benito juarez','benito juárez','identidad','origen de la escuela'],
      answer:'La historia de la escuela y su identidad institucional vinculada a Benito Juárez están desarrolladas en la sección Historia.',
      actions:[['Abrir Historia','../historia.html']]
    },
    {
      id:'vida', title:'Vida Escolar', icon:'🌱',
      keywords:['vida escolar','novedades','reconocimientos','cuadro de honor','alumno solidario','centro de estudiantes','promo 2026','egresados'],
      answer:'Vida Escolar reúne novedades, reconocimientos, participación estudiantil, campañas e identidad institucional.',
      actions:[['Abrir Vida Escolar','../vida-escolar.html'],['Ver Promo 2026','../promo-2026.html']]
    },
    {
      id:'actividades', title:'Actividades y producciones', icon:'🎨',
      keywords:['actividades','producciones','trabajos de estudiantes','ciclo del agua','experiencias educativas'],
      answer:'La sección Actividades reúne experiencias de aprendizaje y producciones realizadas por estudiantes, organizadas para su difusión institucional.',
      actions:[['Abrir Actividades','../actividades.html']]
    },
    {
      id:'programas', title:'Programas y proyectos', icon:'📘',
      keywords:['programas','programa de estudio','proyectos','proyecto institucional','abp','innovacion educativa','innovación educativa'],
      answer:'La sección Programas reúne programas de estudio y proyectos institucionales vinculados con innovación educativa, territorio y alfabetización digital.',
      actions:[['Abrir Programas','../programas.html']]
    },
    {
      id:'multimedia', title:'Multimedia institucional', icon:'🎵',
      keywords:['multimedia','videos','audio','podcast','identidad sonora','producciones audiovisuales'],
      answer:'La sección Multimedia reúne videos, audios, identidad sonora y producciones institucionales.',
      actions:[['Abrir Multimedia','../multimedia.html']]
    },
    {
      id:'tramites', title:'Orientación sobre trámites', icon:'📄',
      keywords:['tramite','trámite','certificado','constancia','pase','inscripcion','inscripción','reinscripcion','reinscripción','documentacion','documentación'],
      answer:'Para certificados, constancias, pases o inscripciones, la información debe confirmarse con Secretaría. Benito puede llevarte al contacto institucional para verificar requisitos y horarios vigentes.',
      actions:[['Contactar a Secretaría','../contacto.html']]
    }
  ];

  function normalize(text){
    return (text||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñü\s]/g,' ').replace(/\s+/g,' ').trim();
  }

  function score(query,item){
    const q=normalize(query); let total=0;
    item.keywords.forEach(k=>{
      const nk=normalize(k);
      if(q===nk) total+=100;
      else if(q.includes(nk)) total+=35;
      else {
        const words=nk.split(' ').filter(w=>w.length>2);
        words.forEach(w=>{ if(q.includes(w)) total+=6; });
      }
    });
    return total;
  }

  function findAnswer(query){
    const ranked=KB.map(item=>({item,score:score(query,item)})).sort((a,b)=>b.score-a.score);
    return ranked[0] && ranked[0].score>=8 ? ranked[0].item : null;
  }

  function esc(text){
    return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  const root=document.createElement('div');
  root.className='bfa-root';
  root.innerHTML=`
    <button class="bfa-launcher" type="button" aria-expanded="false" aria-controls="bfaPanel">
      <span class="bfa-mark">B</span><span><strong>Benito IA</strong><small>Consultá ahora</small></span>
    </button>
    <section class="bfa-panel" id="bfaPanel" aria-label="Asistente Benito IA">
      <header class="bfa-header"><div><strong>Benito IA</strong><small>Asistente institucional</small></div><button class="bfa-close" type="button" aria-label="Cerrar">×</button></header>
      <div class="bfa-status">● En línea · Base institucional local</div>
      <div class="bfa-messages" aria-live="polite"></div>
      <div class="bfa-chips"></div>
      <form class="bfa-form"><label class="sr-only" for="bfaInput">Escribí tu consulta</label><input id="bfaInput" autocomplete="off" placeholder="Ej.: ¿Dónde está el Aula Digital?"><button type="submit">Enviar</button></form>
      <p class="bfa-note">No compartas datos personales ni información sensible.</p>
    </section>`;
  document.body.appendChild(root);

  const launcher=root.querySelector('.bfa-launcher');
  const panel=root.querySelector('.bfa-panel');
  const closeBtn=root.querySelector('.bfa-close');
  const messages=root.querySelector('.bfa-messages');
  const form=root.querySelector('.bfa-form');
  const input=root.querySelector('#bfaInput');
  const chips=root.querySelector('.bfa-chips');

  function addUser(text){
    const node=document.createElement('div'); node.className='bfa-message user'; node.innerHTML=`<div>${esc(text)}</div>`; messages.appendChild(node); scroll();
  }
  function addAssistant(item){
    const node=document.createElement('div'); node.className='bfa-message assistant';
    const actions=(item.actions||[]).map(a=>`<a href="${esc(a[1])}">${esc(a[0])} →</a>`).join('');
    node.innerHTML=`<div class="bfa-avatar">B</div><div class="bfa-card"><h3>${item.icon||'🤖'} ${esc(item.title)}</h3><p>${esc(item.answer)}</p>${actions?`<div class="bfa-actions">${actions}</div>`:''}</div>`;
    messages.appendChild(node); scroll();
  }
  function addFallback(){
    addAssistant({title:'Necesito un poco más de precisión',icon:'🔎',answer:'No encontré información institucional suficiente para responder con precisión. Puedo ayudarte con Aula Digital, contacto, trámites, becas, SAGE, recursos, actividades, programas o Vida Escolar.',actions:[['Contacto institucional','../contacto.html']]});
  }
  function scroll(){ messages.scrollTop=messages.scrollHeight; }
  function ask(text){
    const q=(text||input.value).trim(); if(!q) return;
    addUser(q); input.value='';
    window.setTimeout(()=>{ const item=findAnswer(q); item?addAssistant(item):addFallback(); },220);
  }
  function open(){ root.classList.add('open'); launcher.setAttribute('aria-expanded','true'); window.setTimeout(()=>input.focus(),100); }
  function close(){ root.classList.remove('open'); launcher.setAttribute('aria-expanded','false'); }

  launcher.addEventListener('click',()=>root.classList.contains('open')?close():open());
  closeBtn.addEventListener('click',close);
  form.addEventListener('submit',e=>{e.preventDefault();ask();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});

  ['Aula Digital','Contacto','Trámites','Becas','Necesito estudiar'].forEach(label=>{
    const b=document.createElement('button'); b.type='button'; b.textContent=label; b.addEventListener('click',()=>ask(label)); chips.appendChild(b);
  });

  addAssistant({title:'Hola, soy Benito IA',icon:'👋',answer:'Puedo orientarte con información institucional, Aula Digital, recursos, trámites, becas, SAGE, actividades y contacto. Escribí tu consulta o elegí una opción.'});

  // Abrir desde cualquier botón o enlace interno que invoque al asistente.
  document.querySelectorAll('[data-open-benito]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();open();}));
  window.BenitoFuncional={open,ask};
})();
