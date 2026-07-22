(function () {
  const P = window.BENITO_IA_CONFIG.paths;

  window.BENITO_IA_KNOWLEDGE = [
    {
      id:'saludo', type:'message', category:'general', context:'general', priority:4,
      patterns:['hola','buen dia','buenas tardes','buenas noches','quien sos','que sos','para que servis'],
      title:'Benito IA',
      icon:'🤖',
      response:'Soy el <strong>asistente pedagógico y digital</strong> de la Escuela Secundaria N.º 31 “Benito Juárez”. Puedo orientarte dentro del sitio, ayudarte a encontrar materiales y acompañarte con estrategias de estudio.',
      followups:['Aula Digital','Necesito estudiar','Contacto']
    },
    {
      id:'aula', type:'card', category:'navegacion', context:'aula', priority:8,
      patterns:['aula digital','materiales por curso','repositorio','drive del curso','actividades por curso','material de estudio','apuntes','recursos del curso','donde estan los materiales','auladijital','aula dijital'],
      title:'Aula Digital',
      icon:'📚',
      badge:'Repositorio institucional',
      response:'Reúne materiales, actividades, producciones y recursos digitales organizados por curso.',
      bullets:['Acceso por curso','Materiales de estudio','Producciones estudiantiles','Recursos multiformato'],
      action:{label:'Ingresar al Aula Digital',href:P.aula},
      followups:['Quiero ver 1.º','Quiero ver 2.º','¿Qué materiales hay?']
    },
    {
      id:'aula-cursos', type:'steps', category:'navegacion', context:'aula', priority:7,
      patterns:['quiero ver primero','quiero ver segundo','quiero ver tercero','quiero ver cuarto','quiero ver quinto','quiero ver sexto','ver cursos','curso','como entro al curso'],
      title:'Cómo ingresar a un curso',
      icon:'🧭',
      response:'Te acompaño paso a paso:',
      steps:['Abrí Aula Digital.','Elegí el curso correspondiente.','Ingresá al repositorio de materiales y producciones.'],
      action:{label:'Ver cursos',href:P.aula}
    },
    {
      id:'aprender', type:'card', category:'aprendizaje', context:'aprender', priority:9,
      patterns:['aprender a aprender','como estudiar mejor','tecnicas de estudio','preparar una evaluacion','preparar un examen','no se estudiar','quiero estudiar','necesito estudiar','tengo prueba','tengo examen'],
      title:'Aprender a Aprender',
      icon:'🧠',
      badge:'Acompañamiento al estudiante',
      response:'Podés comenzar con una ruta simple y activa para estudiar con mayor autonomía.',
      bullets:['Definí una meta concreta','Elegí una técnica activa','Comprobá qué recordás sin mirar','Ajustá lo que no funcionó'],
      followups:['Armar un plan de 30 minutos','¿Qué es recuperación activa?','¿Cómo uso Cornell?']
    },
    {
      id:'plan30', type:'steps', category:'aprendizaje', context:'aprender', priority:10,
      patterns:['plan de 30 minutos','estudiar 30 minutos','media hora de estudio','armar un plan corto'],
      title:'Plan de estudio de 30 minutos',
      icon:'⏱️',
      response:'Usá este recorrido breve:',
      steps:[
        '5 minutos: definí qué tema vas a estudiar y qué deberías poder explicar al final.',
        '15 minutos: estudiá activamente, tomando notas o resolviendo ejemplos.',
        '7 minutos: cerrá el material y recuperá la información sin mirar.',
        '3 minutos: corregí errores y anotá qué necesitás revisar después.'
      ],
      followups:['¿Qué es recuperación activa?','¿Cómo evito distraerme?']
    },
    {
      id:'videos-aprender', type:'card', category:'aprendizaje', context:'aprender', priority:8,
      patterns:['hay videos','donde estan los videos','videos','quiero ver el video'],
      contextualPatterns:['video','videos'],
      title:'Recursos multiformato',
      icon:'🎬',
      badge:'Aprender a Aprender',
      response:'La sección incorpora recursos en distintos formatos para facilitar la comprensión y el repaso.',
      bullets:['Videos educativos','Infografías','Materiales prácticos','Futuros podcasts y actividades'],
      action:{label:'Abrir Aprender a Aprender',href:P.recursos + '#aprender-a-aprender'}
    },
    {
      id:'recuperacion', type:'message', category:'aprendizaje', context:'aprender', priority:8,
      patterns:['recuperacion activa','recordar sin mirar','cerrar el material','como comprobar si aprendi'],
      title:'Recuperación activa',
      icon:'🔁',
      response:'Consiste en <strong>cerrar el material</strong> e intentar escribir, explicar o responder preguntas sin mirar. Después comparás con tus apuntes para detectar qué sabés y qué necesitás revisar.',
      followups:['Armar un plan de 30 minutos','¿Cómo uso Cornell?']
    },
    {
      id:'cornell', type:'message', category:'aprendizaje', context:'aprender', priority:8,
      patterns:['cornell','metodo cornell','apuntes cornell'],
      title:'Método Cornell',
      icon:'📝',
      response:'Divide la hoja en tres zonas: preguntas o palabras clave, notas principales y síntesis final. Para repasar, tapá las notas e intentá responder usando solamente las preguntas.'
    },
    {
      id:'concentracion', type:'steps', category:'aprendizaje', context:'aprender', priority:8,
      patterns:['pomodoro','25 minutos','bloque de estudio','me distraigo','concentracion','como evito distraerme'],
      title:'Bloque de concentración',
      icon:'🎯',
      response:'Probá esta secuencia:',
      steps:['Elegí una tarea pequeña y concreta.','Silenciá notificaciones.','Trabajá 25 minutos sin cambiar de tarea.','Descansá 5 minutos antes del siguiente bloque.']
    },
    {
      id:'becas', type:'card', category:'servicios', context:'becas', priority:8,
      patterns:['beca','becas','progresar','instituto becario','ayuda economica','apoyo economico','beneficio','inscripcion beca'],
      title:'Becas y acompañamiento',
      icon:'🎒',
      badge:'Recursos para estudiantes',
      response:'Los accesos a becas y servicios de acompañamiento estudiantil están reunidos en la sección Recursos.',
      bullets:['Información de programas','Accesos de consulta','Orientación institucional'],
      action:{label:'Ver becas y recursos',href:P.recursos},
      followups:['¿Dónde consulto requisitos?','Contacto']
    },
    {
      id:'contacto', type:'card', category:'institucional', context:'contacto', priority:8,
      patterns:['contacto','telefono','correo','email','direccion','donde queda','comunicarme','hablar con la escuela','preseptor','preceptor'],
      title:'Contacto institucional',
      icon:'📍',
      badge:'Escuela Secundaria N.º 31',
      response:'La escuela está ubicada en <strong>Estación Yuquerí, Concordia, Entre Ríos</strong>.',
      bullets:['Teléfono: +54 345 4949814','Correo: secundaria31.cd@entrerios.edu.ar'],
      actions:[
        {label:'Llamar',href:'tel:+543454949814'},
        {label:'Enviar correo',href:'mailto:secundaria31.cd@entrerios.edu.ar'},
        {label:'Ver contacto',href:P.contacto}
      ]
    },
    {
      id:'vida', type:'card', category:'navegacion', context:'vida', priority:7,
      patterns:['vida escolar','novedades','reconocimientos','campanas','comunicaciones institucionales'],
      title:'Vida Escolar',
      icon:'🏫',
      badge:'Comunidad educativa',
      response:'Reúne reconocimientos, participación estudiantil, identidad institucional y comunicaciones recientes.',
      bullets:['Alumno Solidario','Cuadro de Honor','Centro de Estudiantes','Promo 2026'],
      action:{label:'Ir a Vida Escolar',href:P.vida},
      followups:['Alumno Solidario','Cuadro de Honor','Centro de Estudiantes','Promo 2026']
    },
    {
      id:'solidario', type:'card', category:'reconocimientos', context:'vida', priority:8,
      patterns:['alumno solidario','axel omar castro','axel','solidario 2026'],
      title:'Alumno Solidario 2026',
      icon:'🤝',
      badge:'Reconocimiento institucional',
      response:'El reconocimiento fue otorgado a <strong>Axel Omar Castro</strong> por representar valores de solidaridad, compañerismo, respeto, compromiso y colaboración.',
      action:{label:'Ver reconocimiento',href:P.vida + '#alumno-solidario'}
    },
    {
      id:'honor', type:'card', category:'reconocimientos', context:'vida', priority:7,
      patterns:['cuadro de honor','honor institucional','estudiantes destacados'],
      title:'Cuadro de Honor',
      icon:'🏅',
      badge:'Primer Trimestre 2026',
      response:'Reconoce a estudiantes destacados por su desempeño académico.',
      action:{label:'Ver Cuadro de Honor',href:P.vida}
    },
    {
      id:'centro', type:'card', category:'participacion', context:'vida', priority:7,
      patterns:['centro de estudiantes','participacion estudiantil','representacion estudiantil'],
      title:'Centro de Estudiantes',
      icon:'🗳️',
      badge:'Participación estudiantil',
      response:'La escuela avanza hacia la conformación de su primer Centro de Estudiantes como espacio democrático de participación y representación.',
      action:{label:'Conocer el proceso',href:P.vida}
    },
    {
      id:'promo', type:'card', category:'identidad', context:'vida', priority:7,
      patterns:['promo 2026','egresados','promocion 2026','futuros egresados'],
      title:'Promo 2026',
      icon:'🎓',
      badge:'Identidad institucional',
      response:'Reúne fotos, recuerdos, producciones, mensajes y momentos significativos de los futuros egresados.',
      action:{label:'Ir a Promo 2026',href:P.promo}
    },
    {
      id:'programas', type:'card', category:'docentes', context:'programas', priority:7,
      patterns:['programas de estudio','programa','proyectos institucionales','proyecto institucional'],
      title:'Programas y proyectos',
      icon:'📘',
      badge:'Recursos docentes',
      response:'Los programas y proyectos institucionales se consultan en su sección específica. El repositorio de programas de estudio se encuentra en preparación junto con la Asesoría Pedagógica.',
      action:{label:'Ver programas y proyectos',href:P.programas}
    },
    {
      id:'sage', type:'card', category:'familias', context:'recursos', priority:7,
      patterns:['sage','calificaciones','boletin','notas','inasistencias'],
      title:'SAGE y seguimiento escolar',
      icon:'📊',
      badge:'Información para familias',
      response:'El acceso a SAGE y otros servicios para familias se encuentra en Recursos. Para situaciones particulares, conviene comunicarse con la escuela.',
      actions:[
        {label:'Ir a Recursos',href:P.recursos},
        {label:'Contactar a la escuela',href:P.contacto}
      ]
    },
    {
      id:'cicloagua', type:'card', category:'producciones', context:'actividades', priority:7,
      patterns:['ciclo del agua','producciones estudiantiles','actividades y producciones'],
      title:'El ciclo del agua',
      icon:'💧',
      badge:'2.º Año B · Ciencias Naturales',
      response:'Es una experiencia de aprendizaje que integra explicación, producción estudiantil, imágenes y video.',
      action:{label:'Ver actividades y producciones',href:P.actividades}
    },
    {
      id:'autoridades', type:'card', category:'institucional', context:'institucion', priority:6,
      patterns:['autoridades','rector','secretaria','asesora pedagogica','equipo institucional','institucion'],
      title:'Institución',
      icon:'🏛️',
      badge:'Organización escolar',
      response:'La información sobre autoridades, modalidad y organización escolar está disponible en la sección Institución.',
      action:{label:'Ver Institución',href:P.institucion}
    },
    {
      id:'historia', type:'card', category:'institucional', context:'historia', priority:6,
      patterns:['historia de la escuela','benito juarez','identidad institucional','historia'],
      title:'Historia e identidad',
      icon:'📜',
      badge:'Memoria institucional',
      response:'La historia de la escuela y la identidad vinculada a Benito Juárez están desarrolladas en su sección específica.',
      action:{label:'Ver historia',href:P.historia}
    }
  ];
})();