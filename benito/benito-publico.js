(function(){
  'use strict';
  const messages=document.getElementById('messages');
  const form=document.getElementById('chatForm');
  const input=document.getElementById('question');

  const normalize=(value)=>value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñ\s]/g,' ').replace(/\s+/g,' ').trim();
  const has=(text,words)=>words.some(word=>text.includes(word));

  const answers=[
    {keys:['telefono','celular','correo','mail','contacto','comunicar','whatsapp'],title:'Contacto institucional',html:'Podés comunicarte con la escuela por los siguientes canales oficiales:<ul><li><strong>Celular:</strong> +54 345 4949814</li><li><strong>Correo institucional:</strong> secundaria31.cd@entrerios.edu.ar</li><li><strong>Secretaría:</strong> secretaria31benitojuarez@gmail.com</li></ul>',actions:[['Ver contacto','../contacto.html'],['Llamar','tel:+543454949814']]},
    {keys:['ubicacion','direccion','donde queda','como llegar','mapa'],title:'Ubicación de la escuela',html:'La Escuela Secundaria N.º 31 “Benito Juárez” está ubicada en <strong>Ruta Provincial 22 y vías del ferrocarril, Estación Yuquerí, Concordia, Entre Ríos</strong>.',actions:[['Ver información institucional','../institucion.html']]},
    {keys:['aula digital','materiales','repositorio','drive','curso','tareas'],title:'Aula Digital',html:'En el Aula Digital podés acceder a los repositorios y materiales organizados por curso. Elegí tu curso para encontrar los recursos disponibles.',actions:[['Abrir Aula Digital','../aula-digital.html']]},
    {keys:['equipo','autoridades','rector','secretaria','asesora','preceptor','tutor','rti','administrativa'],title:'Equipo institucional',html:'El equipo institucional está integrado por Rectoría, Secretaría, Asesoría Pedagógica, Preceptoría, Tutorías, Administración y RTI. En la página institucional se encuentran los nombres, funciones y horarios disponibles.',actions:[['Ver equipo institucional','../institucion.html#equipo']]},
    {keys:['certificado','constancia','pase','inscripcion','inscribir','tramite','documentacion','legajo'],title:'Trámites y documentación',html:'Los certificados, constancias, pases, inscripciones y consultas sobre legajos se gestionan a través de <strong>Secretaría o Administración</strong>. La atención administrativa informada es de lunes a viernes, de 7:30 a 13:00.',actions:[['Ver contacto','../contacto.html'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]},
    {keys:['horario','atienden','atencion'],title:'Horarios de atención',html:'La atención administrativa se realiza de <strong>lunes a viernes, de 7:30 a 13:00</strong>. Los horarios específicos de Asesoría Pedagógica, Tutorías, Preceptoría y RTI están publicados en la sección Institución.',actions:[['Consultar horarios','../institucion.html#equipo']]},
    {keys:['actividad','actividades','producciones','proyecto','proyectos','vida escolar','novedades'],title:'Actividades y producciones',html:'Podés conocer proyectos, jornadas, producciones estudiantiles y experiencias de la comunidad educativa desde las secciones Actividades y Vida Escolar.',actions:[['Ver actividades','../actividades.html'],['Ver Vida Escolar','../vida-escolar.html']]},
    {keys:['recurso','recursos','estudiar','estudio','aprender','tecnica'],title:'Recursos para aprender',html:'La escuela dispone de recursos digitales y materiales para acompañar el aprendizaje. También podés consultar el Aula Digital para acceder a contenidos organizados por curso.',actions:[['Ver recursos','../recursos.html'],['Abrir Aula Digital','../aula-digital.html']]},
    {keys:['beca','becas','progresar'],title:'Becas y acompañamiento',html:'Para consultas sobre becas, requisitos o situación académica, comunicate con Secretaría o con el equipo institucional. Benito no solicita ni muestra datos personales.',actions:[['Contactar a la escuela','../contacto.html']]},
    {keys:['historia','quien fue benito','benito juarez'],title:'Historia e identidad',html:'La escuela lleva el nombre de Benito Juárez, referente histórico vinculado con la educación, la libertad y la construcción de ciudadanía. Podés conocer más en la sección Historia.',actions:[['Conocer la historia','../historia.html']]},
    {keys:['comedor','biblioteca','comunidad'],title:'Comunidad educativa',html:'La escuela cuenta con espacios de acompañamiento como la biblioteca escolar y el comedor. La información disponible se encuentra en la sección Comunidad.',actions:[['Ver Comunidad','../comunidad.html']]},
    {keys:['facebook','red social','redes'],title:'Redes institucionales',html:'Las actividades y novedades también se comparten por el Facebook institucional.',actions:[['Abrir Facebook','https://www.facebook.com/profile.php?id=100057420641002&mibextid=ZbWKwL']]},
    {keys:['hola','buen dia','buenas','que podes hacer','ayuda'],title:'¿Cómo puedo ayudarte?',html:'Puedo orientarte sobre <strong>contacto, ubicación, trámites, Aula Digital, equipo institucional, actividades, recursos y servicios de la escuela</strong>. Escribí tu consulta con tus propias palabras.'}
  ];

  function addMessage(html,type='assistant',title=''){
    const row=document.createElement('div'); row.className='message '+type;
    if(type==='assistant'){const avatar=document.createElement('div');avatar.className='avatar';avatar.textContent='BJ';row.appendChild(avatar)}
    const bubble=document.createElement('div');bubble.className='bubble';
    if(title){const heading=document.createElement('p');heading.innerHTML='<strong>'+title+'</strong>';bubble.appendChild(heading)}
    const content=document.createElement('div');content.innerHTML=html;bubble.appendChild(content);row.appendChild(bubble);messages.appendChild(row);messages.scrollTop=messages.scrollHeight;
    return bubble;
  }

  function addActions(bubble,actions){if(!actions||!actions.length)return;const wrap=document.createElement('div');wrap.className='actions';actions.forEach(([label,href],index)=>{const a=document.createElement('a');a.href=href;a.textContent=label;if(index>0)a.className='secondary';if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener'}wrap.appendChild(a)});bubble.appendChild(wrap)}

  function answer(question){
    const text=normalize(question);
    const match=answers.find(item=>has(text,item.keys));
    if(match){const bubble=addMessage(match.html,'assistant',match.title);addActions(bubble,match.actions);return}
    const fallback=addMessage('No encontré información institucional suficiente para responder esa consulta con precisión. Podés reformularla o comunicarte con la escuela para recibir orientación.','assistant','Necesito un poco más de información');
    addActions(fallback,[['Ver contacto','../contacto.html'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]);
  }

  function submit(question){const value=(question||input.value).trim();if(!value)return;addMessage(value.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])),'user');input.value='';setTimeout(()=>answer(value),180)}

  form.addEventListener('submit',event=>{event.preventDefault();submit()});
  document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>submit(button.dataset.question)));

  addMessage('Hola. Soy <strong>Benito IA</strong>, el asistente virtual oficial de la Escuela Secundaria N.º 31 “Benito Juárez”.<br><br>¿En qué puedo ayudarte? Podés escribir una pregunta o elegir una consulta frecuente.','assistant','Bienvenido');
  input.focus();
})();
