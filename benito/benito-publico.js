(function () {
  'use strict';

  const messages = document.getElementById('messages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('question');

  const normalize = (value) => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));

  const STOP_WORDS = new Set(['a','al','algo','como','con','cual','cuando','de','del','donde','el','en','es','esta','hay','la','las','lo','los','me','mi','necesito','para','por','que','quiero','se','si','sobre','un','una','y']);

  function tokens(text) {
    return normalize(text).split(' ').filter((token) => token.length > 1 && !STOP_WORDS.has(token));
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i += 1) {
      let previous = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const current = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
        previous = current;
      }
    }
    return row[b.length];
  }

  function closeToken(a, b) {
    if (a.length < 4 || b.length < 4) return false;
    const distance = levenshtein(a, b);
    return distance <= (Math.max(a.length, b.length) >= 8 ? 2 : 1);
  }

  const knowledge = [
    {
      id: 'contacto', priority: 8,
      phrases: ['como me comunico', 'datos de contacto', 'contactar la escuela', 'telefono de la escuela', 'correo institucional'],
      keywords: ['telefono','celular','correo','mail','email','contacto','comunicar','whatsapp','llamar'],
      title: 'Contacto institucional',
      html: 'Estos son los canales oficiales de la escuela:<ul><li><strong>Celular:</strong> +54 345 4949814</li><li><strong>Correo institucional:</strong> secundaria31.cd@entrerios.edu.ar</li><li><strong>Secretaría:</strong> secretaria31benitojuarez@gmail.com</li></ul>',
      actions: [['Ver contacto','../contacto.html'],['Llamar','tel:+543454949814'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
    },
    {
      id: 'ubicacion', priority: 8,
      phrases: ['donde queda la escuela','como llegar a la escuela','direccion de la escuela'],
      keywords: ['ubicacion','direccion','queda','llegar','mapa','ruta','yuqueri'],
      title: 'Ubicación de la escuela',
      html: 'La Escuela Secundaria N.º 31 “Benito Juárez” está ubicada en <strong>Ruta Provincial 22 y vías del ferrocarril, Estación Yuquerí, Concordia, Entre Ríos</strong>.',
      actions: [['Ver datos institucionales','../institucion.html#datos']]
    },
    {
      id: 'datos-institucionales', priority: 7,
      phrases: ['cual es el cue','datos institucionales','modalidad de la escuela','orientacion de la escuela'],
      keywords: ['cue','modalidad','orientacion','gestion','estatal','naturales'],
      title: 'Datos institucionales',
      html: '<ul><li><strong>Nombre:</strong> Escuela Secundaria N.º 31 “Benito Juárez”.</li><li><strong>CUE:</strong> 3002566.</li><li><strong>Gestión:</strong> estatal.</li><li><strong>Nivel:</strong> Secundario.</li><li><strong>Modalidad:</strong> común orientada en Ciencias Naturales.</li></ul>',
      actions: [['Ver Institución','../institucion.html']]
    },
    {
      id: 'rector', priority: 10,
      phrases: ['quien es el rector','nombre del rector'], keywords: ['rector','rectoria','director','gallardo'],
      title: 'Rectoría',
      html: 'El rector es el <strong>Mg. Julio Gallardo</strong>. Tiene a su cargo la conducción general, la organización escolar, la articulación pedagógica y la representación institucional.',
      actions: [['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'secretaria-persona', priority: 10,
      phrases: ['quien es la secretaria','nombre de la secretaria'], keywords: ['romina','benitti'],
      title: 'Secretaría',
      html: 'La secretaria es la <strong>Prof. Romina Benitti</strong>. Su función comprende la organización administrativa, la documentación institucional, las certificaciones, las comunicaciones y el seguimiento de registros escolares.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
    },
    {
      id: 'asesoria', priority: 10,
      phrases: ['quien es la asesora','horario de la asesora','asesoria pedagogica'], keywords: ['asesora','asesoria','daiana','mohr','pedagogica'],
      title: 'Asesoría Pedagógica',
      html: 'La asesora pedagógica es la <strong>Prof. Daiana Mohr</strong>. Acompaña pedagógicamente a la institución y realiza el seguimiento de trayectorias educativas.<ul><li><strong>Lunes:</strong> 8:00 a 11:00.</li><li><strong>Miércoles:</strong> 8:00 a 11:00.</li><li><strong>Viernes:</strong> 8:00 a 10:00.</li></ul>',
      actions: [['Ver equipo y horarios','../institucion.html#equipo']]
    },
    {
      id: 'preceptoria', priority: 10,
      phrases: ['quienes son los preceptores','horario de preceptoria','hablar con preceptoria'], keywords: ['preceptor','preceptores','preceptoria','lucas','acosta','flavia','romani','asistencia','inasistencia'],
      title: 'Preceptoría',
      html: 'Los preceptores son <strong>Lucas Gastón Acosta</strong> y <strong>Flavia Romani</strong>. Realizan el seguimiento de asistencia, convivencia escolar, comunicación con las familias y organización cotidiana.<br><strong>Horario:</strong> lunes a viernes, de 7:20 a 13:00.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'administracion', priority: 10,
      phrases: ['quien atiende administracion','horario administrativo','horario de administracion'], keywords: ['administracion','administrativa','carina','galarza','legajo','certificacion'],
      title: 'Administración institucional',
      html: 'La administrativa es <strong>Carina Galarza</strong>. Atiende a estudiantes y familias, gestiona constancias, certificaciones, legajos y trámites escolares, y brinda apoyo a Secretaría.<br><strong>Horario:</strong> lunes a viernes, de 7:30 a 13:00.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
    },
    {
      id: 'orientador', priority: 10,
      phrases: ['orientador educacional','horario del orientador'], keywords: ['orientador','julian','mahler','orientacion'],
      title: 'Orientación educacional',
      html: 'El orientador educacional es el <strong>Prof. Julián Mahler</strong>.<ul><li><strong>Lunes:</strong> 11:40 a 12:50.</li><li><strong>Miércoles:</strong> 8:20 a 9:40.</li><li><strong>Jueves:</strong> 7:20 a 12:50.</li></ul>',
      actions: [['Ver tutorías y orientación','../institucion.html#equipo']]
    },
    {
      id: 'tutor-cuarto', priority: 11,
      phrases: ['tutor de cuarto','tutor 4 año','horario tutor cuarto'], keywords: ['maximiliano','acevedo','4to','cuarto'], required: ['tutor'],
      title: 'Tutoría de 4.º año',
      html: 'El tutor de 4.º año es el <strong>Prof. Maximiliano Acevedo</strong>.<br><strong>Horario:</strong> lunes, de 8:00 a 10:00.',
      actions: [['Ver tutorías','../institucion.html#equipo']]
    },
    {
      id: 'tutor-quinto', priority: 11,
      phrases: ['tutor de quinto','tutor 5 año','horario tutor quinto'], keywords: ['luciano','velazquez','5to','quinto'], required: ['tutor'],
      title: 'Tutoría de 5.º año',
      html: 'El tutor de 5.º año es el <strong>Prof. Luciano Velázquez</strong>.<br><strong>Horario:</strong> viernes, de 9:25 a 10:45.',
      actions: [['Ver tutorías','../institucion.html#equipo']]
    },
    {
      id: 'tutorias', priority: 8,
      phrases: ['quienes son los tutores','necesito una tutoria','hablar con un tutor'], keywords: ['tutor','tutores','tutoria','tutorias','acompañamiento'],
      title: 'Tutorías y orientación',
      html: 'La escuela cuenta con orientación educacional y tutorías específicas para 4.º y 5.º año. Estos espacios acompañan las trayectorias, la organización escolar y las dificultades que puedan surgir durante la cursada.',
      actions: [['Consultar responsables y horarios','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'rti', priority: 10,
      phrases: ['quien es el rti','horario del rti','ayuda con tecnologia'], keywords: ['rti','alfredo','esquivel','tecnologia','digital','computadora','netbook'],
      title: 'RTI y Tecnología Educativa',
      html: 'El RTI es <strong>Alfredo Esquivel</strong>. Brinda acompañamiento pedagógico-digital, alfabetización digital situada, integración tecnológica, producción de recursos y desarrollo de proyectos.<ul><li><strong>Martes:</strong> 7:30 a 11:40.</li><li><strong>Jueves:</strong> 7:30 a 10:00.</li></ul>',
      actions: [['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'certificados', priority: 12,
      phrases: ['certificado de alumno regular','constancia de alumno regular','necesito un certificado','necesito una constancia','pedir certificado','solicitar constancia'],
      keywords: ['certificado','certificados','constancia','constancias','regular','escolaridad'],
      title: 'Certificados y constancias',
      html: 'Las constancias y certificaciones se gestionan en <strong>Administración o Secretaría</strong>. La atención administrativa es de lunes a viernes, de 7:30 a 13:00. Para confirmar requisitos y plazo de entrega, comunicate por un canal oficial.',
      actions: [['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'pase', priority: 12,
      phrases: ['necesito un pase','solicitar pase escolar','pase a otra escuela','cambiar de escuela'],
      keywords: ['pase','traslado','transferencia','cambiarme'],
      title: 'Pase o traslado escolar',
      html: 'Los pases o traslados se gestionan en <strong>Secretaría</strong>. Como la documentación requerida depende de cada situación, primero comunicate con la escuela o acercate en el horario administrativo: lunes a viernes, de 7:30 a 13:00.',
      actions: [['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'inscripcion', priority: 12,
      phrases: ['como inscribirse','inscribir a mi hijo','inscripcion a la escuela','quiero anotarme'],
      keywords: ['inscripcion','inscribir','anotar','matricula','ingreso'],
      title: 'Inscripción escolar',
      html: 'La inscripción se gestiona mediante <strong>Secretaría o Administración</strong>. Benito no publica una lista cerrada de requisitos porque puede variar según el año y la situación del estudiante. Consultá directamente para recibir la información vigente.',
      actions: [['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'sage', priority: 11,
      phrases: ['como entrar a sage','solicitar usuario sage','no puedo entrar a sage','ver notas en sage','ver calificaciones'],
      keywords: ['sage','calificaciones','notas','boletin','usuario','contraseña','asistencia'],
      title: 'SAGE Entre Ríos',
      html: 'SAGE permite consultar información escolar y realizar gestiones habilitadas para familias y personal. Desde Recursos podés ingresar a SAGE o solicitar un usuario. Si el inconveniente corresponde a datos o registros escolares, comunicate con Secretaría.',
      actions: [['Abrir Recursos','../recursos.html#familias'],['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Solicitar usuario SAGE','https://sage.entrerios.gov.ar/solicitarUsuario/index.php']]
    },
    {
      id: 'aula-digital', priority: 11,
      phrases: ['como accedo al aula digital','donde estan los materiales','materiales de mi curso','repositorio de mi curso'],
      keywords: ['aula','digital','repositorio','materiales','curso','apuntes','tareas','actividades'],
      title: 'Aula Digital',
      html: 'El Aula Digital reúne materiales de estudio, actividades, recursos interactivos y producciones organizados por curso. Hay accesos para <strong>1.º A, 1.º B, 2.º A, 2.º B, 3.º, 4.º, 5.º y 6.º año</strong>.',
      actions: [['Abrir Aula Digital','../aula-digital.html']]
    },
    {
      id: 'recursos-estudio', priority: 8,
      phrases: ['como puedo estudiar','necesito ayuda para estudiar','tecnicas de estudio','recursos para aprender'],
      keywords: ['estudiar','estudio','aprender','repasar','tecnica','organizarme','examen'],
      title: 'Recursos para estudiar y aprender',
      html: 'Podés comenzar por el Aula Digital, donde los materiales están organizados por curso. También está disponible la sección Recursos, con accesos educativos y herramientas de acompañamiento. Para una dificultad específica con una materia, conviene hablar con el docente, Preceptoría, Tutoría u Orientación.',
      actions: [['Abrir Aula Digital','../aula-digital.html'],['Ver Recursos','../recursos.html']]
    },
    {
      id: 'becas', priority: 11,
      phrases: ['becas progresar','como anotarse a progresar','estado de mi beca','instituto becario'],
      keywords: ['beca','becas','progresar','becario'],
      title: 'Becas y programas de acompañamiento',
      html: 'En la sección Recursos están disponibles los accesos oficiales a <strong>Becas Progresar</strong>, su plataforma de inscripción y el <strong>Instituto Becario de Entre Ríos</strong>. Para verificar tu situación académica o la documentación escolar necesaria, consultá con Secretaría.',
      actions: [['Ver Recursos y enlaces oficiales','../recursos.html#enlaces'],['Becas Progresar','https://www.argentina.gob.ar/educacion/progresar'],['Instituto Becario','https://www.institutobecario.gov.ar/']]
    },
    {
      id: 'mesas-examen', priority: 11,
      phrases: ['mesas de examen','inscripcion a mesas','materias previas','rendir una previa','turno de examen'],
      keywords: ['mesa','mesas','previa','previas','rendir','examenes','libre','movilidad'],
      title: 'Mesas de exámenes',
      html: 'La información publicada sobre mesas de exámenes se encuentra en <strong>Vida Escolar</strong>. Allí se difunden convocatorias para estudiantes con espacios curriculares previos, libres o por movilidad estudiantil. Para confirmar fechas o inscripción vigente, consultá la comunicación institucional más reciente.',
      actions: [['Ver comunicaciones institucionales','../vida-escolar.html'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'actividades', priority: 8,
      phrases: ['actividades de la escuela','producciones de estudiantes','proyectos realizados','que hacen los estudiantes'],
      keywords: ['actividad','actividades','produccion','producciones','proyecto','proyectos','galeria','ciclo','agua'],
      title: 'Actividades y producciones',
      html: 'La sección Actividades reúne experiencias y producciones estudiantiles. Actualmente incluye, entre otras, una propuesta de <strong>Ciencias Naturales de 2.º Año B sobre el ciclo del agua</strong>, con investigación, maqueta, trabajo colaborativo y video explicativo.',
      actions: [['Ver Actividades','../actividades.html'],['Ver Multimedia','../multimedia.html']]
    },
    {
      id: 'programas', priority: 9,
      phrases: ['programas de la escuela','proyectos institucionales','la escuela va al barrio','tesoros ocultos'],
      keywords: ['programas','tesoros','ocultos','barrio','alfabetizacion','abp'],
      title: 'Programas y proyectos institucionales',
      html: 'La escuela desarrolla proyectos vinculados con memoria, participación comunitaria, trayectorias e integración tecnológica. Entre ellos se encuentran <strong>Tesoros ocultos de la escuela</strong>, <strong>La Escuela va al Barrio</strong>, <strong>Alfabetización Digital</strong> y <strong>Aula Digital</strong>.',
      actions: [['Ver Programas','../programas.html']]
    },
    {
      id: 'historia', priority: 9,
      phrases: ['historia de la escuela','cuando se creo la escuela','origen de la escuela','por que se llama benito juarez'],
      keywords: ['historia','origen','memoria','nombre','benito','juarez','25 años'],
      title: 'Historia e identidad institucional',
      html: 'La institución surgió entre fines de la década de 1990 y comienzos de los años 2000 para ampliar las oportunidades educativas de jóvenes de Estación Yuquerí y zonas cercanas. Su identidad se construyó junto a las familias, desde la pertenencia, la participación y el acompañamiento de las trayectorias.',
      actions: [['Conocer la historia','../historia.html']]
    },
    {
      id: 'biblioteca', priority: 10,
      phrases: ['horario de biblioteca','prestamo de libros','hay biblioteca'], keywords: ['biblioteca','libro','libros','lectura','prestamo'],
      title: 'Biblioteca escolar',
      html: 'La biblioteca ofrece lectura, consulta, préstamo de materiales, acompañamiento al estudio y apoyo a proyectos. <strong>El horario todavía figura como pendiente de confirmación</strong> en el sitio institucional.',
      actions: [['Ver Comunidad','../comunidad.html'],['Consultar a la escuela','../contacto.html']]
    },
    {
      id: 'comedor', priority: 10,
      phrases: ['horario del comedor','hay comedor','informacion del comedor'], keywords: ['comedor','comida','almuerzo','alimentario'],
      title: 'Comedor escolar',
      html: 'La escuela cuenta con comedor como espacio de cuidado y acompañamiento a la permanencia educativa. <strong>La información específica sobre horarios y organización todavía está pendiente de publicación</strong>.',
      actions: [['Ver Comunidad','../comunidad.html'],['Consultar a la escuela','../contacto.html']]
    },
    {
      id: 'facebook', priority: 8,
      phrases: ['facebook de la escuela','redes sociales','novedades en facebook'], keywords: ['facebook','redes','sociales'],
      title: 'Facebook institucional',
      html: 'En el Facebook institucional se comparten actividades, proyectos, comunicados, imágenes y novedades de la comunidad educativa.',
      actions: [['Abrir Facebook','https://www.facebook.com/profile.php?id=100057420641002&mibextid=ZbWKwL']]
    },
    {
      id: 'saludo', priority: 1,
      phrases: ['hola benito','buen dia','buenas tardes','buenas noches','que podes hacer','en que ayudas'],
      keywords: ['hola','buenas','ayuda'],
      title: '¿En qué puedo ayudarte?',
      html: 'Puedo orientarte sobre <strong>trámites, autoridades, horarios, contacto, ubicación, Aula Digital, SAGE, becas, mesas de exámenes, actividades, programas y servicios de la escuela</strong>. Escribí la consulta con tus propias palabras.'
    }
  ];

  function meetsRequired(item, text, queryTokens) {
    if (!item.required || !item.required.length) return true;
    return item.required.every((required) => text.includes(required) || queryTokens.includes(required));
  }

  function scoreItem(item, query) {
    const text = normalize(query);
    const queryTokens = tokens(text);
    if (!meetsRequired(item, text, queryTokens)) return 0;

    let score = item.priority || 0;
    (item.phrases || []).forEach((phrase) => {
      const normalizedPhrase = normalize(phrase);
      if (text === normalizedPhrase) score += 30;
      else if (text.includes(normalizedPhrase)) score += 18;
    });

    (item.keywords || []).forEach((keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (text.includes(normalizedKeyword)) score += normalizedKeyword.includes(' ') ? 10 : 6;
      else if (queryTokens.some((token) => closeToken(token, normalizedKeyword))) score += 2;
    });

    return score;
  }

  function findBestAnswer(question) {
    const text = normalize(question);
    if (!text) return null;
    const ranked = knowledge
      .map((item) => ({ item, score: scoreItem(item, text) }))
      .sort((a, b) => b.score - a.score);

    const best = ranked[0];
    const second = ranked[1];
    if (!best || best.score < 11) return null;
    if (second && best.score - second.score < 2 && best.score < 22) return null;
    return best.item;
  }

  function addMessage(html, type = 'assistant', title = '') {
    const row = document.createElement('div');
    row.className = `message ${type}`;
    if (type === 'assistant') {
      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.textContent = 'BJ';
      row.appendChild(avatar);
    }
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    if (title) {
      const heading = document.createElement('p');
      heading.innerHTML = `<strong>${escapeHtml(title)}</strong>`;
      bubble.appendChild(heading);
    }
    const content = document.createElement('div');
    content.innerHTML = html;
    bubble.appendChild(content);
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  function addActions(bubble, actions) {
    if (!actions || !actions.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'actions';
    actions.forEach(([label, href], index) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (index > 0) link.className = 'secondary';
      if (/^https?:/.test(href)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      wrap.appendChild(link);
    });
    bubble.appendChild(wrap);
  }

  function addClarificationButtons(bubble) {
    const wrap = document.createElement('div');
    wrap.className = 'clarifications';
    [
      ['Trámite o constancia','Necesito hacer un trámite o pedir una constancia'],
      ['Autoridad u horario','Quiero consultar una autoridad o un horario'],
      ['Aula Digital','Necesito acceder al Aula Digital'],
      ['SAGE o calificaciones','Necesito ayuda con SAGE o las calificaciones']
    ].forEach(([label, question]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => submit(question));
      wrap.appendChild(button);
    });
    bubble.appendChild(wrap);
  }

  function answer(question) {
    const match = findBestAnswer(question);
    if (match) {
      const bubble = addMessage(match.html, 'assistant', match.title);
      addActions(bubble, match.actions);
      return;
    }

    const fallback = addMessage(
      'No puedo identificar todavía qué información necesitás. Para evitar darte una respuesta incorrecta, elegí una opción o reformulá la consulta con un poco más de detalle.',
      'assistant',
      'Necesito precisar la consulta'
    );
    addClarificationButtons(fallback);
    addActions(fallback, [['Ver contacto','../contacto.html']]);
  }

  function submit(question) {
    const value = String(question || input.value).trim();
    if (!value) return;
    addMessage(escapeHtml(value), 'user');
    input.value = '';
    window.setTimeout(() => answer(value), 120);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submit();
  });

  document.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => submit(button.dataset.question));
  });

  addMessage(
    'Hola. Soy <strong>Benito IA</strong>, el asistente virtual de la Escuela Secundaria N.º 31 “Benito Juárez”.<br><br>Puedo orientarte con información institucional publicada sobre trámites, horarios, autoridades, Aula Digital, SAGE, becas, actividades y servicios. ¿Qué necesitás saber?',
    'assistant',
    'Bienvenido'
  );
  input.focus();
}());
