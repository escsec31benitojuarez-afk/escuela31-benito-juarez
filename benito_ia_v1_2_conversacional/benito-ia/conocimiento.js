(function () {
  const P = window.BENITO_IA_CONFIG.paths;
  window.BENITO_IA_KNOWLEDGE = [
    {
      id:'saludo', category:'general', context:'general', priority:4,
      patterns:['hola','buen dia','buenas tardes','buenas noches','quien sos','que sos'],
      response:'¡Hola! Soy <strong>Benito IA</strong>, el asistente pedagógico y digital de la Escuela Secundaria N.º 31 “Benito Juárez”. Puedo orientarte dentro del sitio y acompañarte con recursos para aprender mejor.',
      followups:['Aula Digital','¿Cómo estudio mejor?','Contacto']
    },
    {
      id:'aula', category:'navegacion', context:'aula', priority:6,
      patterns:['aula digital','materiales por curso','repositorio','drive del curso','actividades por curso','material de estudio','apuntes','recursos del curso','donde estan los materiales'],
      response:'El <strong>Aula Digital</strong> reúne materiales, actividades, producciones y recursos digitales organizados por curso.',
      action:{label:'Ingresar al Aula Digital',href:P.aula},
      followups:['Quiero ver 1.º','Quiero ver 2.º','¿Qué materiales hay?']
    },
    {
      id:'aula-cursos', category:'navegacion', context:'aula', priority:7,
      patterns:['quiero ver primero','quiero ver segundo','quiero ver tercero','quiero ver cuarto','quiero ver quinto','quiero ver sexto','ver cursos','curso'],
      response:'Dentro de <strong>Aula Digital</strong> podés ingresar al espacio correspondiente a cada curso y acceder a sus materiales y producciones.',
      action:{label:'Ver cursos',href:P.aula}
    },
    {
      id:'aprender', category:'aprendizaje', context:'aprender', priority:6,
      patterns:['aprender a aprender','como estudiar mejor','tecnicas de estudio','preparar una evaluacion','preparar un examen','no se estudiar','quiero estudiar','necesito estudiar'],
      response:'Podés comenzar con una ruta simple: <strong>definí una meta concreta</strong>, elegí una técnica activa, cerrá el material para comprobar qué recordás y ajustá lo que no funcionó.',
      followups:['¿Qué es recuperación activa?','¿Cómo uso el método Cornell?','¿Cómo organizo un bloque de estudio?']
    },
    {
      id:'videos-aprender', category:'aprendizaje', context:'aprender', priority:7,
      patterns:['hay videos','donde estan los videos','videos','quiero ver el video'],
      contextualPatterns:['video','videos'],
      response:'Sí. En <strong>Aprender a Aprender</strong> se incorporan recursos multiformato, entre ellos videos, infografías y materiales prácticos para estudiar con mayor autonomía.',
      action:{label:'Abrir Aprender a Aprender',href:P.recursos + '#aprender-a-aprender'}
    },
    {
      id:'recuperacion', category:'aprendizaje', context:'aprender', priority:7,
      patterns:['recuperacion activa','recordar sin mirar','cerrar el material'],
      response:'La <strong>recuperación activa</strong> consiste en cerrar el material y escribir, explicar o responder preguntas sin mirar. Después comparás con tus apuntes para detectar qué sabés y qué necesitás revisar.'
    },
    {
      id:'cornell', category:'aprendizaje', context:'aprender', priority:7,
      patterns:['cornell','metodo cornell','apuntes cornell'],
      response:'El <strong>método Cornell</strong> divide la hoja en preguntas o palabras clave, notas principales y una síntesis final. Para repasar, tapá las notas e intentá responder usando solo las preguntas.'
    },
    {
      id:'espaciado', category:'aprendizaje', context:'aprender', priority:6,
      patterns:['estudio espaciado','repasos','repasar varios dias','memoria'],
      response:'El <strong>estudio espaciado</strong> distribuye repasos breves en varios momentos. Evita concentrar todo el estudio en una sola noche y favorece una recuperación más estable.'
    },
    {
      id:'bloque', category:'aprendizaje', context:'aprender', priority:6,
      patterns:['pomodoro','25 minutos','bloque de estudio','me distraigo','concentracion'],
      response:'Probá un bloque de <strong>25 minutos de foco y 5 minutos de pausa</strong>. Antes de empezar, definí una tarea pequeña y silenciá notificaciones.'
    },
    {
      id:'becas', category:'servicios', context:'becas', priority:6,
      patterns:['beca','becas','progresar','instituto becario','ayuda economica','apoyo economico','beneficio','inscripcion beca'],
      response:'Los accesos a <strong>becas y acompañamiento estudiantil</strong> están reunidos en la sección Recursos.',
      action:{label:'Ver becas y recursos',href:P.recursos},
      followups:['¿Dónde consulto requisitos?','Contacto']
    },
    {
      id:'contacto', category:'institucional', context:'contacto', priority:6,
      patterns:['contacto','telefono','correo','email','direccion','donde queda','comunicarme','hablar con la escuela'],
      response:'La escuela está en <strong>Estación Yuquerí, Concordia, Entre Ríos</strong>. Teléfono: <a href="tel:+543454949814">+54 345 4949814</a>. Correo: <a href="mailto:secundaria31.cd@entrerios.edu.ar">secundaria31.cd@entrerios.edu.ar</a>.',
      action:{label:'Ver contacto completo',href:P.contacto}
    },
    {
      id:'vida', category:'navegacion', context:'vida', priority:5,
      patterns:['vida escolar','novedades','reconocimientos','campanas','comunicaciones institucionales'],
      response:'En <strong>Vida Escolar</strong> se publican reconocimientos, participación estudiantil, identidad institucional y comunicaciones recientes.',
      action:{label:'Ir a Vida Escolar',href:P.vida},
      followups:['Alumno Solidario','Cuadro de Honor','Centro de Estudiantes','Promo 2026']
    },
    {
      id:'solidario', category:'reconocimientos', context:'vida', priority:7,
      patterns:['alumno solidario','axel omar castro','axel','solidario 2026'],
      response:'El reconocimiento <strong>Alumno Solidario 2026</strong> fue otorgado a <strong>Axel Omar Castro</strong>, por representar valores de solidaridad, compañerismo, respeto, compromiso y colaboración.',
      action:{label:'Ver reconocimiento',href:P.vida + '#alumno-solidario'}
    },
    {
      id:'honor', category:'reconocimientos', context:'vida', priority:6,
      patterns:['cuadro de honor','honor institucional','estudiantes destacados'],
      response:'El <strong>Cuadro de Honor Institucional</strong> reconoce a estudiantes destacados por su desempeño académico durante el Primer Trimestre 2026.',
      action:{label:'Ver Cuadro de Honor',href:P.vida}
    },
    {
      id:'centro', category:'participacion', context:'vida', priority:6,
      patterns:['centro de estudiantes','participacion estudiantil','representacion estudiantil'],
      response:'La escuela avanza hacia la conformación de su primer <strong>Centro de Estudiantes</strong>, como espacio democrático de participación, representación y construcción colectiva.',
      action:{label:'Conocer el proceso',href:P.vida}
    },
    {
      id:'promo', category:'identidad', context:'vida', priority:6,
      patterns:['promo 2026','egresados','promocion 2026','futuros egresados'],
      response:'El espacio <strong>Promo 2026</strong> reúne fotos, recuerdos, producciones, mensajes y momentos significativos de los futuros egresados.',
      action:{label:'Ir a Promo 2026',href:P.promo}
    },
    {
      id:'programas', category:'docentes', context:'programas', priority:6,
      patterns:['programas de estudio','programa','proyectos institucionales','proyecto institucional'],
      response:'Los programas y proyectos institucionales se consultan en su sección específica. El repositorio de programas de estudio se encuentra en preparación junto con la Asesoría Pedagógica.',
      action:{label:'Ver programas y proyectos',href:P.programas}
    },
    {
      id:'sage', category:'familias', context:'recursos', priority:6,
      patterns:['sage','calificaciones','boletin','notas','inasistencias'],
      response:'El acceso a <strong>SAGE</strong> y otros servicios para familias se encuentra en Recursos. Para una situación particular, conviene comunicarse con la escuela.',
      action:{label:'Ir a Recursos',href:P.recursos}
    },
    {
      id:'cicloagua', category:'producciones', context:'actividades', priority:6,
      patterns:['ciclo del agua','producciones estudiantiles','actividades y producciones'],
      response:'En <strong>Actividades y Producciones</strong> podés conocer experiencias de aprendizaje, como el proyecto “El ciclo del agua” de 2.º Año B, en Ciencias Naturales.',
      action:{label:'Ver actividades y producciones',href:P.actividades}
    },
    {
      id:'autoridades', category:'institucional', context:'institucion', priority:5,
      patterns:['autoridades','rector','secretaria','asesora pedagogica','equipo institucional','institucion'],
      response:'La información sobre autoridades, modalidad y organización escolar está disponible en la sección Institución.',
      action:{label:'Ver Institución',href:P.institucion}
    },
    {
      id:'historia', category:'institucional', context:'historia', priority:5,
      patterns:['historia de la escuela','benito juarez','identidad institucional','historia'],
      response:'La historia de la escuela y la identidad vinculada a Benito Juárez están desarrolladas en la sección Historia e identidad.',
      action:{label:'Ver historia',href:P.historia}
    }
  ];
})();