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
      id: 'certificados', priority: 16,
      phrases: ['certificado de alumno regular','constancia de alumno regular','necesito un certificado','necesito una constancia','pedir certificado','solicitar constancia','generar constancia en sage'],
      keywords: ['certificado','certificados','constancia','constancias','regular','escolaridad'],
      title: 'Constancia de alumno regular',
      html: 'La opción más rápida es ingresar a <strong>SAGE</strong>, generar la constancia de alumno regular e imprimirla. Luego, si necesitás firma, sello institucional o no podés acceder a SAGE, acercate a <strong>Secretaría o Administración</strong>, de lunes a viernes, de 7:30 a 13:00.',
      actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'pase', priority: 16,
      phrases: ['necesito un pase','solicitar pase escolar','pase a otra escuela','cambiar de escuela','pase desde otra escuela'],
      keywords: ['pase','traslado','transferencia','cambiarme'],
      title: 'Pase o traslado escolar',
      html: 'Para orientarte correctamente necesito distinguir el tipo de pase. Elegí una opción:',
      flow: 'pase'
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
      id: 'sage', priority: 17,
      phrases: ['como entrar a sage','solicitar usuario sage','no puedo entrar a sage','no puedo ingresar a sage','ver notas en sage','ver calificaciones','olvide mi contraseña de sage','error en sage'],
      keywords: ['sage','calificaciones','notas','boletin','usuario','contraseña','clave','asistencia','error'],
      title: 'Ayuda con SAGE',
      html: 'Puedo orientarte según el problema que tengas. Elegí la opción que más se aproxima a tu situación:',
      flow: 'sage'
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
      id: 'becas', priority: 15,
      phrases: ['becas progresar','como anotarse a progresar','como me inscribo a una beca progresar','estado de mi beca','instituto becario'],
      keywords: ['beca','becas','progresar','becario','inscribirme'],
      title: 'Becas y acompañamiento',
      html: '¿Sobre qué programa necesitás información?',
      flow: 'becas'
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


  const flows = {
    sage: [
      {
        label: 'Olvidé mi contraseña',
        title: 'Recuperar acceso a SAGE',
        html: 'Ingresá a SAGE y utilizá la opción de recuperación de contraseña. Si no podés completar el proceso o tus datos no coinciden, comunicate con <strong>Secretaría</strong> para verificar el registro.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      },
      {
        label: 'No tengo usuario',
        title: 'Solicitar usuario de SAGE',
        html: 'Podés iniciar la solicitud de usuario desde el sitio oficial de SAGE. Si necesitás verificar datos del estudiante o del adulto responsable, consultá con <strong>Secretaría</strong>.',
        actions: [['Solicitar usuario SAGE','https://sage.entrerios.gov.ar/solicitarUsuario/index.php'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      },
      {
        label: 'Me aparece un error',
        title: 'Error de acceso a SAGE',
        html: 'Primero verificá que el usuario y la contraseña estén escritos correctamente y probá nuevamente. Si el error continúa, anotá o capturá el mensaje que aparece y comunicate con <strong>Secretaría</strong> para recibir orientación.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver contacto','../contacto.html']]
      },
      {
        label: 'No encuentro mis calificaciones',
        title: 'Calificaciones en SAGE',
        html: 'Ingresá a SAGE con tu usuario y revisá la sección correspondiente al estudiante. Si las calificaciones todavía no aparecen o detectás un dato incorrecto, consultá con <strong>Preceptoría o Secretaría</strong>; Benito no accede ni muestra información académica personal.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver contacto','../contacto.html']]
      },
      {
        label: 'Generar constancia',
        title: 'Constancia de alumno regular en SAGE',
        html: 'Ingresá a <strong>SAGE</strong>, generá la constancia de alumno regular e imprimila. Si necesitás firma, sello institucional o no podés completar el trámite, acercate a Secretaría o Administración, de lunes a viernes, de 7:30 a 13:00.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      }
    ],
    pase: [
      {
        label: 'Pase hacia otra escuela',
        title: 'Pase hacia otra institución',
        html: 'El pase se gestiona en <strong>Secretaría</strong>. Acercate o comunicate con la escuela para iniciar el trámite y confirmar la documentación requerida según tu situación. La atención administrativa es de lunes a viernes, de 7:30 a 13:00.',
        actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
      },
      {
        label: 'Ingreso desde otra escuela',
        title: 'Ingreso con pase desde otra institución',
        html: 'Para ingresar con pase desde otra escuela, comunicate con <strong>Secretaría</strong>. Allí te indicarán la documentación vigente, la disponibilidad y los pasos para completar la incorporación.',
        actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
      },
      {
        label: 'Retiro antes del horario',
        title: 'Retiro anticipado',
        html: 'Si la consulta es por retirarte antes del horario habitual, comunicate con <strong>Preceptoría</strong>. En el caso de estudiantes menores de edad, el retiro debe ajustarse a las autorizaciones y procedimientos institucionales.',
        actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
      }
    ],
    becas: [
      {
        label: 'Becas Progresar',
        title: 'Becas Progresar',
        html: 'La inscripción y el seguimiento se realizan mediante los canales oficiales de Progresar. Para constancias o verificación de la situación académica, podés generar la constancia de alumno regular desde SAGE o consultar con Secretaría.',
        actions: [['Abrir Progresar','https://www.argentina.gob.ar/educacion/progresar'],['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      },
      {
        label: 'Instituto Becario',
        title: 'Instituto Becario de Entre Ríos',
        html: 'Consultá convocatorias, requisitos y estado de trámites en el sitio oficial del Instituto Becario. Si necesitás documentación escolar, podés solicitar orientación en Secretaría.',
        actions: [['Abrir Instituto Becario','https://www.institutobecario.gov.ar/'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      },
      {
        label: 'Otra beca',
        title: 'Consulta sobre otra beca',
        html: 'Indicá el nombre de la beca o programa para que pueda orientarte mejor. Cuando el trámite requiere documentación escolar, la gestión se realiza mediante Secretaría o Administración.',
        actions: [['Ver recursos y enlaces','../recursos.html#enlaces'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      }
    ]
  };

  function directIntent(question) {
    const text = normalize(question);
    if (/\b(sage)\b/.test(text)) return 'sage';
    if (/\b(constancia|certificado)\b/.test(text) && /\b(alumno|regular|escolar)\b/.test(text)) return 'certificados';
    if (/\b(pase|traslado|transferencia)\b/.test(text)) return 'pase';
    if (/\b(beca|becas|progresar|becario)\b/.test(text)) return 'becas';
    return null;
  }

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


  function addFlowButtons(bubble, flowName) {
    const options = flows[flowName] || [];
    if (!options.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'clarifications';
    options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = option.label;
      button.addEventListener('click', () => {
        addMessage(escapeHtml(option.label), 'user');
        const response = addMessage(option.html, 'assistant', option.title);
        addActions(response, option.actions);
      });
      wrap.appendChild(button);
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
    const routedId = directIntent(question);
    const match = routedId
      ? knowledge.find((item) => item.id === routedId)
      : findBestAnswer(question);

    if (match) {
      const bubble = addMessage(match.html, 'assistant', match.title);
      addActions(bubble, match.actions);
      if (match.flow) addFlowButtons(bubble, match.flow);
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
