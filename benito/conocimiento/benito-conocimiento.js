window.BENITO_CONOCIMIENTO = [
    {
      id: 'identidad', priority: 30,
      phrases: ['como te llamas','como te llamás','cual es tu nombre','cuál es tu nombre','quien sos','quién sos','quien eres','quién eres','decime tu nombre'],
      keywords: ['nombre','llamas','identidad'],
      synonyms: ['tu nombre','como se llama el asistente','nombre del asistente','presentate'],
      title: 'Soy Benito IA',
      html: 'Soy <strong>Benito IA</strong>, el asistente virtual oficial de la Escuela Secundaria Nº 31 “Benito Juárez”. Puedo orientarte con información institucional publicada.'
    },
    {
      id: 'contacto', priority: 18,
      phrases: ['como me comunico', 'quiero comunicarme con la escuela', 'necesito comunicarme con la escuela', 'quiero hablar con la escuela', 'datos de contacto', 'contactar la escuela', 'contactar a la escuela', 'contactar a la secundaria', 'quiero llamar a la escuela', 'telefono de la escuela', 'correo institucional'],
      keywords: ['telefono','celular','correo','mail','email','contacto','comunicar','whatsapp','llamar'],
      synonyms: ['comunicarme con la escuela','hablar con la escuela','llamar a la escuela','telefonicamente','por telefono','numero de la escuela','numero del colegio','mandar un mensaje','pasas el numero','escribir a la escuela'],
      title: 'Contacto institucional',
      html: 'Estos son los canales oficiales de la escuela:<ul><li><strong>Celular:</strong> +54 345 4949814</li><li><strong>Correo institucional:</strong> secundaria31.cd@entrerios.edu.ar</li><li><strong>Secretaría:</strong> secretaria31benitojuarez@gmail.com</li><li><strong>Asesoría Pedagógica:</strong> asesoriabenitojuarez@gmail.com</li></ul>',
      actions: [['Ver contacto','../contacto.html'],['Llamar','tel:+543454949814'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Escribir a Asesoría Pedagógica','mailto:asesoriabenitojuarez@gmail.com']],
      followUps: [
        {
          id: 'contacto-telefono',
          priority: 24,
          phrases: ['telefonicamente','por telefono','quiero llamar','necesito llamar','pasame el numero','cual es el telefono','al celular'],
          keywords: ['telefonicamente','telefono','celular','numero','llamar'],
          title: 'Contacto telefónico',
          html: 'Podés comunicarte telefónicamente con la escuela al <strong>+54 345 4949814</strong>.',
          actions: [['Llamar a la escuela','tel:+543454949814'],['Ver contacto','../contacto.html']]
        },
        {
          id: 'contacto-correo',
          priority: 23,
          phrases: ['por correo','por mail','quiero escribir','necesito escribir','cual es el correo','cual es el mail'],
          keywords: ['correo','mail','email','escribir'],
          title: 'Contacto por correo',
          html: 'Podés escribir al correo institucional <strong>secundaria31.cd@entrerios.edu.ar</strong>. Para trámites de Secretaría también está disponible <strong>secretaria31benitojuarez@gmail.com</strong>.',
          actions: [['Escribir a la escuela','mailto:secundaria31.cd@entrerios.edu.ar'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
        }
      ]
    },
    {
      id: 'ubicacion', priority: 8,
      phrases: ['donde queda la escuela','donde esta la escuela','como llegar a la escuela','direccion de la escuela','dnde qeda la escuiela'],
      keywords: ['ubicacion','direccion','queda','llegar','mapa','ruta','yuqueri'],
      synonyms: ['donde queda el colegio','como llego a la escuela','como llego a la secundaria 31','como llego hasta la secundaria 31','la dire del colegio','ir a la escuela'],
      title: 'Ubicación de la escuela',
      html: 'La Escuela Secundaria Nº 31 “Benito Juárez” está ubicada en <strong>Ruta Provincial 22 y vías del ferrocarril, Estación Yuquerí, Concordia, Entre Ríos</strong>.',
      actions: [['Ver datos institucionales','../institucion.html#datos']]
    },
    {
      id: 'horario-atencion', priority: 22,
      phrases: ['horario de atencion','horario de atencion de la escuela','a que hora atienden','cuando atienden','cuando esta abierta la escuela','a que hora abre la escuela','a que hora cierra la escuela','cuando puedo ir a la escuela','en que horario puedo acercarme'],
      keywords: ['atencion','atienden','abren','abre','cierra','acercarme'],
      synonyms: ['horario para hacer un tramite','horario para ir a la escuela','hasta que hora atienden','cuando puedo acercarme','a que hora puedo ir'],
      title: 'Horario de atención institucional',
      html: 'El horario de <strong>atención administrativa publicado</strong> es de <strong>lunes a viernes, de 7:30 a 13:00</strong>. Preceptoría atiende de lunes a viernes, de <strong>7:20 a 13:00</strong>.<br><br>Estos horarios corresponden a atención y acompañamiento institucional; no necesariamente coinciden con la entrada y salida de cada curso.',
      actions: [['Ver equipo y horarios','../institucion.html#equipo'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'datos-institucionales', priority: 7,
      phrases: ['cual es el cue','datos institucionales','modalidad de la escuela','orientacion de la escuela','que orientacion ofrece la escuela'],
      keywords: ['cue','modalidad','orientacion','gestion','estatal','naturales'],
      synonyms: ['que bachiller tiene','es publica la escuela','es publica la secundaria','oferta educativa','ciencias naturales'],
      title: 'Datos institucionales',
      html: '<ul><li><strong>Nombre:</strong> Escuela Secundaria Nº 31 “Benito Juárez”.</li><li><strong>CUE:</strong> 3002566.</li><li><strong>Gestión:</strong> estatal.</li><li><strong>Nivel:</strong> Secundario.</li><li><strong>Modalidad:</strong> común orientada en Ciencias Naturales.</li></ul>',
      actions: [['Ver Institución','../institucion.html']]
    },
    {
      id: 'rector', priority: 10,
      phrases: ['quien es el rector','nombre del rector'], keywords: ['rector','rectoria','director','gallardo'],
      synonyms: ['quien esta a cargo','quien dirige la escuela','autoridad principal'],
      title: 'Rectoría',
      html: 'El rector es el <strong>Mg. Julio Gallardo</strong>. Tiene a su cargo la conducción general, la organización escolar, la articulación pedagógica y la representación institucional.',
      actions: [['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'rectoria-horario', priority: 21,
      phrases: ['horario de rectoria','horario del rector','cuando atiende el rector','cuando puedo hablar con el rector'],
      keywords: ['rectoria','rector'],
      required: ['horario'],
      title: 'Horario de Rectoría',
      html: 'El Portal identifica al rector, <strong>Mg. Julio Gallardo</strong>, pero <strong>no publica un horario específico de atención de Rectoría</strong>. Para solicitar una entrevista o confirmar disponibilidad, utilizá los canales oficiales de la escuela.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'secretaria-persona', priority: 10,
      phrases: ['quien es la secretaria','nombre de la secretaria','necesito hablar con secretaria'], keywords: ['secretaria','romina','benitti','certificaciones'],
      synonyms: ['hablar con secretaria','hablar con la secretaria','buscar a la secretaria','encontrar a la secretaria','donde esta secretaria'],
      title: 'Secretaría',
      html: 'La secretaria es la <strong>Prof. Romina Benitti</strong>. Su función comprende la organización administrativa, la documentación institucional, las certificaciones, las comunicaciones y el seguimiento de registros escolares.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
    },
    {
      id: 'secretaria-horario', priority: 21,
      phrases: ['horario de secretaria','cuando atiende secretaria','a que hora esta secretaria','horario para hablar con secretaria'],
      keywords: ['secretaria'],
      required: ['horario'],
      title: 'Atención de Secretaría',
      html: 'El Portal <strong>no publica un horario exclusivo de Secretaría</strong>. Para trámites, constancias y documentación, la atención administrativa publicada es de <strong>lunes a viernes, de 7:30 a 13:00</strong>. También podés escribir a <strong>secretaria31benitojuarez@gmail.com</strong>.',
      actions: [['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver equipo y horarios','../institucion.html#equipo']]
    },
    {
      id: 'asesoria', priority: 10,
      phrases: ['quien es la asesora','horario de la asesora','asesoria pedagogica'], keywords: ['asesora','asesoria','daiana','mohr','pedagogica'],
      title: 'Asesoría Pedagógica',
      html: 'La asesora pedagógica es la <strong>Prof. Daiana Mohr</strong>. Acompaña pedagógicamente a la institución y realiza el seguimiento de trayectorias educativas.<ul><li><strong>Lunes:</strong> 8:00 a 11:00.</li><li><strong>Miércoles:</strong> 8:00 a 11:00.</li><li><strong>Viernes:</strong> 8:00 a 10:00.</li></ul><strong>Correo:</strong> asesoriabenitojuarez@gmail.com',
      actions: [['Ver equipo y horarios','../institucion.html#equipo'],['Escribir a Asesoría Pedagógica','mailto:asesoriabenitojuarez@gmail.com']]
    },
    {
      id: 'preceptoria', priority: 10,
      phrases: ['quienes son los preceptores','horario de preceptoria','hablar con preceptoria'], keywords: ['preceptor','preceptores','preceptoria','lucas','acosta','flavia','romani','asistencia','inasistencia'],
      synonyms: ['necesito un preceptor','hablar con un preceptor'],
      title: 'Preceptoría',
      html: 'Los preceptores son <strong>Lucas Gastón Acosta</strong> y <strong>Flavia Romani</strong>. Realizan el seguimiento de asistencia, convivencia escolar, comunicación con las familias y organización cotidiana.<br><strong>Horario:</strong> lunes a viernes, de 7:20 a 13:00.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'administracion', priority: 10,
      phrases: ['quien atiende administracion','horario administrativo','horario de administracion','necesito hablar con administracion'], keywords: ['administracion','administrativa','carina','galarza','legajo','certificacion'],
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
      id: 'rti', priority: 10,
      phrases: ['quien es el rti','horario del rti','ayuda con tecnologia','que hace el rti'], keywords: ['rti','alfredo','esquivel','tecnologia','digital','computadora','netbook'],
      synonyms: ['ayuda con la computadora','ayuda con las computadoras','problema con la netbook','se trabo la netbook'],
      title: 'RTI y Tecnología Educativa',
      html: 'El RTI es <strong>Alfredo Esquivel</strong>. Brinda acompañamiento pedagógico y digital, alfabetización digital situada, integración tecnológica, producción de recursos, desarrollo de proyectos y asesoramiento para el acceso y uso de <strong>SAGE</strong>.<ul><li><strong>Martes:</strong> 7:30 a 11:40.</li><li><strong>Jueves:</strong> 7:30 a 10:00.</li></ul>',
      actions: [['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'equipo-institucional', priority: 10,
      phrases: ['quienes integran el equipo institucional','equipo institucional','quienes trabajan en la escuela'],
      keywords: ['equipo','autoridades','responsables'],
      synonyms: ['equipo de la escuela','personal de la escuela'],
      title: 'Equipo institucional',
      html: 'El equipo institucional reúne a Rectoría, Secretaría, Asesoría Pedagógica, Preceptoría, Administración, Orientación Educacional, Tutorías y RTI. En la sección Institución podés consultar responsables, funciones y horarios publicados.',
      actions: [['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'certificados', priority: 16,
      phrases: ['certificado de alumno regular','constancia de alumno regular','necesito un certificado','necesito una constancia','pedir certificado','solicitar constancia','generar constancia en sage','certificados y constancias'],
      keywords: ['certificado','certificados','constancia','constancias','regular','escolaridad'],
      synonyms: ['papel de alumno regular','papel que dice alumno regular','certificado escolar','constancia regular'],
      title: 'Constancia de alumno regular',
      html: 'Sí. El estudiante o un familiar puede generar la constancia de alumno regular desde <strong>SAGE</strong>.<ol><li>Ingresá a SAGE.</li><li>Buscá la opción <strong>“Constancia de alumno regular”</strong>.</li><li>Generá el documento, descargalo e imprimilo.</li></ol>Si necesitás ayuda para ingresar o realizar estos pasos en SAGE, comunicate con el <strong>RTI</strong>. Si no lográs obtener la constancia, podés acercarte a <strong>Secretaría o Administración</strong>, de lunes a viernes, de 7:30 a 13:00.',
      actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo'],['Ver contacto','../contacto.html']],
      followUps: [
        {
          id: 'certificados-sage',
          priority: 21,
          phrases: ['se puede generar desde sage','la constancia se genera desde sage','y desde sage','desde sage','se descarga desde sage','se imprime desde sage'],
          keywords: ['sage','generar','descargar','imprimir'],
          title: 'Sí, se genera desde SAGE',
          html: 'Sí. El estudiante o un familiar puede ingresar a <strong>SAGE</strong>, buscar <strong>“Constancia de alumno regular”</strong>, generar el documento, descargarlo e imprimirlo. Si necesitás ayuda para ingresar o usar SAGE, comunicate con el <strong>RTI</strong>. Si no lográs obtener la constancia, acercate a Secretaría o Administración.',
          actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo']]
        },
        {
          id: 'certificados-acceso',
          priority: 21,
          phrases: ['no puedo entrar','no puedo ingresar','no logro acceder','no me deja entrar','no me deja ingresar'],
          synonyms: ['tengo problemas para entrar','no abre'],
          target: 'sage'
        },
        {
          id: 'certificados-firma',
          priority: 20,
          phrases: ['necesito firma y sello','necesito firma','necesito sello','tiene que estar firmada','debe llevar sello'],
          keywords: ['firma','sello','firmada','sellada'],
          title: 'Firma o sello de la constancia',
          html: 'Si la institución donde vas a presentarla exige firma o sello, comunicate con <strong>Secretaría o Administración</strong> para confirmar el procedimiento antes de acercarte. La atención es de lunes a viernes, de 7:30 a 13:00.',
          actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
        }
      ]
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
      phrases: ['como inscribirse','inscribir a mi hijo','inscripcion a la escuela','quiero anotarme','que papeles llevo para inscribirme'],
      keywords: ['inscripcion','inscribir','anotar','matricula','ingreso'],
      synonyms: ['anotar a mi hijo','anotar a mi hija','quiero inscribirme','matricular a mi hijo','matricular a mi hija','ingresar a primer año'],
      title: 'Inscripción escolar',
      html: 'La inscripción se gestiona mediante <strong>Secretaría o Administración</strong>. Benito no publica una lista cerrada de requisitos porque puede variar según el año y la situación del estudiante. Consultá directamente para recibir la información vigente.',
      actions: [['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'equivalencias', priority: 14,
      phrases: ['necesito saber por equivalencias','consulta por equivalencias','tramitar equivalencias'],
      keywords: ['equivalencia','equivalencias'],
      synonyms: ['reconocer materias','me reconocen materias','materias de otra escuela'],
      title: 'Equivalencias',
      html: 'Las equivalencias requieren la revisión de <strong>Secretaría</strong> según la trayectoria y la documentación académica de cada estudiante. Comunicate con el área para confirmar los pasos y requisitos vigentes sin presentar información innecesaria.',
      actions: [['Escribir a Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'sage', priority: 17,
      phrases: ['como entrar a sage','solicitar usuario sage','no puedo entrar a sage','no puedo ingresar a sage','ver notas en sage','ver calificaciones','olvide mi contraseña de sage','error en sage'],
      keywords: ['sage','calificaciones','notas','boletin','usuario','contraseña','clave','asistencia','error'],
      title: 'Ayuda con SAGE',
      html: '<strong>SAGE</strong> permite consultar información escolar y generar constancias. Podés abrir el sitio oficial ahora. Si tenés una dificultad específica, elegí la opción correspondiente para recibir pasos concretos:',
      actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Solicitar usuario SAGE','https://sage.entrerios.gov.ar/solicitarUsuario/index.php']],
      flow: 'sage'
    },
    {
      id: 'aula-digital', priority: 11,
      phrases: ['como accedo al aula digital','donde entro al aula digital','quiero entrar al aula digital','donde estan los materiales','donde estan los materiales de matematica','materiales de mi curso','repositorio de mi curso','donde estan las tareas','material de 2 b','apuntes de mi curso','quiero entrar a 1 a','quiero entrar a 1 b','quiero entrar a 2 a','quiero entrar a 2 b','quiero entrar a 3 año','quiero entrar a 4 año','quiero entrar a 5 año','quiero entrar a 6 año'],
      keywords: ['aula','digital','repositorio','materiales','curso','apuntes','tareas','actividades'],
      synonyms: ['trabajo practico','trabajos practicos','material de clase','consigna de la profe','consigna que dejo la profe','actividades que dejo la profe','subieron el trabajo','archivo de clase'],
      title: 'Aula Digital',
      html: 'El Aula Digital reúne materiales, actividades y recursos organizados por curso y materia. Por seguridad, el ingreso siempre se realiza desde el acceso general y requiere el usuario y la contraseña proporcionados por la escuela.',
      actions: [['Abrir Aula Digital','../aula-digital.html']],
      flow: 'aula',
      followUps: [
        {
          id: 'aula-acceso-seguimiento',
          priority: 23,
          phrases: ['no puedo entrar','no puedo ingresar','no puedo acceder','no abre','no me deja entrar','no me funciona'],
          synonyms: ['tengo problemas para entrar','no carga el aula','no abre el repositorio'],
          target: 'aula-acceso'
        }
      ]
    },
    {
      id: 'aula-acceso', priority: 19,
      phrases: ['no puedo entrar al aula','no puedo ingresar al aula digital','no puedo acceder al aula digital','no abre el aula digital','no me deja entrar al aula'],
      keywords: ['aula','acceso'],
      required: ['aula'],
      title: 'Problema para acceder al Aula Digital',
      html: 'El Aula Digital se abre desde el Portal y requiere iniciar sesión. Abrí el acceso general, ingresá tu usuario y contraseña, y el sistema mostrará únicamente el curso o los espacios que tenés asignados. Si el problema continúa, comunicate con el <strong>RTI</strong> para recibir acompañamiento.',
      actions: [['Abrir Aula Digital','../aula-digital.html'],['Ver horario del RTI','../institucion.html#equipo']]
    },
    {
      id: 'cursos', priority: 14,
      phrases: ['que cursos hay','cuales son los cursos','años de la escuela','cursos del aula digital'],
      keywords: ['cursos','años','secciones'],
      synonyms: ['que años tiene la escuela','repositorios por curso'],
      title: 'Cursos del Aula Digital',
      html: 'El Aula Digital incluye <strong>1.º A, 1.º B, 2.º A, 2.º B, 3.º Año, 4.º Año, 5.º Año y 6.º Año</strong>. Para proteger los materiales, el acceso a cualquier curso se realiza siempre desde el ingreso general con la cuenta institucional.',
      actions: [['Ingresar al Aula Digital','../aula-digital.html']]
    },
    {
      id: 'recursos-estudio', priority: 8,
      phrases: ['como puedo estudiar','necesito ayuda para estudiar','tecnicas de estudio','recursos para aprender'],
      keywords: ['estudiar','estudio','aprender','repasar','tecnica','organizarme','examen'],
      synonyms: ['no se como estudiar','como me organizo para rendir','ayuda para estudiar','preparar una prueba'],
      title: 'Recursos para estudiar y aprender',
      html: 'Podés comenzar por el Aula Digital, donde los materiales están organizados por curso. También está disponible la sección Recursos, con accesos educativos y herramientas de acompañamiento. Para una dificultad específica con una materia, conviene hablar con el docente, Preceptoría, Tutoría u Orientación.',
      actions: [['Abrir Aula Digital','../aula-digital.html'],['Ver Recursos','../recursos.html']]
    },
    {
      id: 'becas', priority: 15,
      phrases: ['becas progresar','como anotarse a progresar','como me inscribo a una beca progresar','estado de mi beca','instituto becario'],
      keywords: ['beca','becas','progresar','becario'],
      synonyms: ['ayuda economica','beca estudiantil','apoyo economico'],
      title: 'Becas y acompañamiento',
      html: '¿Sobre qué programa necesitás información?',
      flow: 'becas'
    },
    {
      id: 'mesas-examen', priority: 11,
      phrases: ['mesas de examen','inscripcion a mesas','inscripcion a mesas de agosto','materias previas','rendir una previa','turno de examen','movilidad estudiantil'],
      keywords: ['mesa','mesas','previa','previas','rendir','examenes','libre'],
      title: 'Mesas de exámenes',
      html: 'La inscripción publicada para las <strong>mesas de exámenes de agosto de 2026</strong> está destinada a estudiantes con espacios curriculares previos, libres o por movilidad estudiantil. Podés completar el formulario en línea o consultar la comunicación institucional correspondiente.',
      actions: [['Abrir formulario de inscripción','https://docs.google.com/forms/d/e/1FAIpQLSc6QZ1PYL78aqBqMsUtyCbVuFFq7p56jPuzPXerWEXgydsEWQ/viewform?usp=dialog'],['Ver comunicaciones institucionales','../vida-escolar.html#comunicaciones-institucionales'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'huerta-6to-alejandra', priority: 18,
      phrases: ['proyecto de la huerta','huerta escolar','huerta de sexto año','huerta de 6 año','actividad de la profesora alejandra','siembra en almacigos','preparacion de la tierra'],
      keywords: ['huerta','almacigo','almacigos','siembra','tierra','plantines','alejandra'],
      synonyms: ['trabajo de sexto con alejandra','proyecto de alejandra','cultivo escolar','actividad de la huerta'],
      title: 'Proyecto de la huerta · 6.º Año',
      html: 'En el marco de <strong>“Nos cuidamos en comunidad”</strong>, estudiantes de <strong>6.º Año</strong> trabajaron junto a la <strong>profesora Alejandra Martínez</strong> en la preparación y el acondicionamiento de la tierra, el llenado de bandejas y la siembra en almácigos. El Portal reúne fotografías y un video de la experiencia, y también permite consultar el registro completo de la huerta.',
      actions: [['Ver el proyecto en el Portal','../proyecto-nos-cuidamos.html#continuidad-6to-alejandra'],['Abrir el registro completo de la huerta','https://drive.google.com/drive/folders/1637XJyLLSVLFbAgKwCHtRB29otia5VWt?usp=sharing']]
    },
    {
      id: 'nos-cuidamos', priority: 19,
      phrases: ['nos cuidamos en comunidad','proyecto nos cuidamos','me activo me cuido nos cuidamos'],
      keywords: ['cuidamos','saludables','cuidado'],
      synonyms: ['proyecto de hábitos saludables','proyecto de cuidado comunitario'],
      title: 'Nos cuidamos en comunidad',
      html: 'Es un <strong>proyecto institucional interdisciplinario de 2026</strong> que promueve hábitos saludables, movimiento, participación estudiantil y cuidado colectivo en Estación Yuquerí. Integra actividades de Educación Física con 5.º Año, la huerta con 6.º Año y acciones vinculadas con alimentación, hidratación, higiene bucal y trabajo comunitario.',
      actions: [['Conocer el proyecto','../proyecto-nos-cuidamos.html'],['Ver documento completo','../assets/documentos/proyecto-nos-cuidamos-en-comunidad-2026.pdf']]
    },
    {
      id: 'movilidad-5to-javier', priority: 19,
      phrases: ['movilidad articular de quinto año','movilidad articular de 5 año','educacion fisica con javier','actividad del profesor javier','trabajo corporal en quinto'],
      keywords: ['movilidad','articular','javier','brazos','piernas'],
      synonyms: ['ejercicios de quinto año','tren superior e inferior','actividad física de quinto'],
      title: 'Movilidad articular · Educación Física · 5.º Año',
      html: 'En el marco de <strong>“Nos cuidamos en comunidad”</strong>, el profesor Javier trabajó con estudiantes de <strong>5.º Año</strong> ejercicios de movilidad y articulación del tren superior e inferior, con movimientos de brazos y piernas para favorecer la preparación corporal y el cuidado durante la actividad física. El Portal incluye una fotografía y dos videos.',
      actions: [['Ver actividad, foto y videos','../proyecto-nos-cuidamos.html#educacion-fisica-5to']]
    },
    {
      id: 'escuela-barrio', priority: 17,
      phrases: ['la escuela va al barrio','escuela va al barrio','escuela se acerca a los barrios'],
      keywords: ['barrio','barrios','mendieta','cohelo','blanqueado'],
      title: 'La Escuela va al Barrio',
      html: 'Es un proyecto territorial de 2026, denominado <strong>“Cuidar el cuerpo, cuidar la vida”</strong>, que acerca la escuela a los barrios de Estación Yuquerí y articula con el Centro de Salud y referentes barriales. Trabaja prevención, salud integral, alimentación, hidratación e higiene bucal.',
      actions: [['Ver proyecto y registros','../programas.html#barrio']]
    },
    {
      id: 'alfabetizacion-digital', priority: 17,
      phrases: ['alfabetizacion digital situada','programa de alfabetizacion digital','alfabetizacion digital 2026'],
      keywords: ['alfabetizacion','ciudadania','inclusion'],
      required: ['digital'],
      title: 'Alfabetización Digital Situada 2026',
      html: 'Es un programa institucional transversal y permanente que fortalece capacidades digitales para estudiar, producir, comunicar y participar con tecnologías. Se desarrolla de manera progresiva y situada durante el ciclo lectivo 2026.',
      actions: [['Ver programa en Proyectos','../programas.html#alfabetizacion-digital'],['Abrir documento institucional','../assets/documentos/programa-alfabetizacion-digital-2026.pdf']]
    },
    {
      id: 'tesoros-ocultos', priority: 17,
      phrases: ['tesoros ocultos de la escuela','proyecto tesoros ocultos','museo vivo'],
      keywords: ['tesoros','ocultos','memorias','testimonios'],
      title: 'Tesoros ocultos de la escuela',
      html: 'Fue la primera experiencia institucional de <strong>Aprendizaje Basado en Proyectos</strong>, desarrollada en 2025 para recuperar memorias, testimonios, fotografías y huellas de la Escuela Secundaria Nº 31. Sus producciones incluyen entrevistas, relatos, registros y un Museo Vivo.',
      actions: [['Ver proyecto','../programas.html#tesoros'],['Explorar presentación','../assets/documentos/tesoros-ocultos-benito-juarez.pdf']]
    },
    {
      id: 'ciclo-agua', priority: 16,
      phrases: ['ciclo del agua','proyecto del ciclo del agua','maqueta del ciclo del agua'],
      keywords: ['ciclo','agua','maqueta'],
      title: 'El ciclo del agua · 2.º Año B',
      html: 'Es una producción de <strong>Ciencias Naturales de 2.º Año B</strong> que integró investigación con netbooks, construcción de una maqueta, trabajo colaborativo y un video explicativo sobre el ciclo del agua.',
      actions: [['Ver producción completa','../actividades.html#ciclo-del-agua-2b']]
    },
    {
      id: 'actividades', priority: 8,
      phrases: ['actividades de la escuela','que actividades hace la escuela','producciones de estudiantes','proyectos realizados','que hacen los estudiantes'],
      keywords: ['actividad','actividades','produccion','producciones','proyecto','proyectos','galeria','ciclo','agua'],
      synonyms: ['que hicieron los alumnos','trabajos de estudiantes','trabajos de alumnos'],
      title: 'Actividades y producciones',
      html: 'La sección Actividades reúne experiencias y producciones estudiantiles. Actualmente incluye, entre otras, una propuesta de <strong>Ciencias Naturales de 2.º Año B sobre el ciclo del agua</strong>, con investigación, maqueta, trabajo colaborativo y video explicativo.',
      actions: [['Ver Actividades','../actividades.html'],['Ver Multimedia','../multimedia.html']]
    },
    {
      id: 'programas', priority: 9,
      phrases: ['programas de la escuela','proyectos institucionales','la escuela va al barrio','tesoros ocultos'],
      keywords: ['programas','tesoros','ocultos','barrio','alfabetizacion','abp'],
      synonyms: ['planes institucionales','proyectos de la escuela','que proyectos tiene la escuela'],
      title: 'Proyectos institucionales',
      html: 'El Portal presenta cuatro proyectos institucionales: <strong>Nos cuidamos en comunidad</strong>, <strong>La Escuela va al Barrio</strong>, <strong>Alfabetización Digital Situada 2026</strong> y <strong>Tesoros ocultos de la escuela</strong>. Cada uno cuenta con su descripción, estado y materiales o registros disponibles.',
      actions: [['Ver Proyectos','../programas.html']]
    },
    {
      id: 'historia', priority: 9,
      phrases: ['historia de la escuela','cuando se creo la escuela','origen de la escuela','por que se llama benito juarez'],
      keywords: ['historia','origen','memoria','nombre','benito','juarez','25 años'],
      synonyms: ['cuando empezo la escuela','aniversario de la escuela','fundacion de la escuela','aniversario'],
      title: 'Historia e identidad institucional',
      html: 'La institución surgió entre fines de la década de 1990 y comienzos de los años 2000 para ampliar las oportunidades educativas de jóvenes de Estación Yuquerí y zonas cercanas. Su identidad se construyó junto a las familias, desde la pertenencia, la participación y el acompañamiento de las trayectorias.',
      actions: [['Conocer la historia','../historia.html']]
    },
    {
      id: 'biblioteca', priority: 10,
      phrases: ['horario de biblioteca','prestamo de libros','hay biblioteca'], keywords: ['biblioteca','libro','libros','lectura','prestamo'],
      synonyms: ['sacar un libro','pedir un libro','bibliotecaria'],
      title: 'Biblioteca escolar',
      html: 'La biblioteca ofrece lectura, consulta, préstamo de materiales, acompañamiento al estudio y apoyo a proyectos. <strong>El horario todavía figura como pendiente de confirmación</strong> en el sitio institucional.',
      actions: [['Ver Comunidad','../comunidad.html'],['Consultar a la escuela','../contacto.html']]
    },
    {
      id: 'comedor', priority: 10,
      phrases: ['horario del comedor','hay comedor','informacion del comedor'], keywords: ['comedor','comida','almuerzo','alimentario'],
      synonyms: ['dan de comer','comer en la escuela','servicio de comedor'],
      title: 'Comedor escolar',
      html: 'La escuela cuenta con comedor como espacio de cuidado y acompañamiento a la permanencia educativa. <strong>La información específica sobre horarios y organización todavía está pendiente de publicación</strong>.',
      actions: [['Ver Comunidad','../comunidad.html'],['Consultar a la escuela','../contacto.html']]
    },
    {
      id: 'facebook', priority: 8,
      phrases: ['facebook de la escuela','redes sociales','novedades en facebook','cual es el facebook institucional'], keywords: ['facebook','redes','sociales'],
      synonyms: ['red social de la escuela','pagina de facebook'],
      title: 'Facebook institucional',
      html: 'En el Facebook institucional se comparten actividades, proyectos, comunicados, imágenes y novedades de la comunidad educativa.',
      actions: [['Abrir Facebook','https://www.facebook.com/profile.php?id=100057420641002&mibextid=ZbWKwL']]
    },
    {
      id: 'saludo', priority: 1,
      phrases: ['hola benito','buen dia','buenas','buenas tardes','buenas noches','que podes hacer','que hace benito','en que ayudas','necesito ayuda'],
      keywords: ['hola','buenas','ayuda'],
      synonyms: ['que sabes hacer','para que servis','en que me podes ayudar'],
      title: '¿En qué puedo ayudarte?',
      html: 'Puedo orientarte sobre <strong>trámites, autoridades, horarios, contacto, ubicación, Aula Digital, SAGE, becas, mesas de exámenes, actividades, programas y servicios de la escuela</strong>. Escribí la consulta con tus propias palabras.'
    },
    {
      id: 'analitico-titulo', priority: 16,
      phrases: ['necesito mi analitico','solicitar analitico','retirar titulo','titulo secundario','certificado analitico','diploma'],
      keywords: ['analitico','titulo','diploma','egresado','egresada'],
      title: 'Analítico y título secundario',
      html: 'Las consultas sobre <strong>analítico, título, diploma o documentación de egreso</strong> se gestionan en Secretaría. Comunicate antes de acercarte para confirmar el estado del trámite y la documentación necesaria.',
      actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'asistencia', priority: 15,
      phrases: ['cuantas faltas tengo','consultar inasistencias','justificar una falta','certificado medico','falta justificada','inasistencias','estoy faltando mucho'],
      keywords: ['falta','faltas','inasistencia','inasistencias','justificar','justificacion','medico'],
      synonyms: ['justifico que no fui','falte a clase','no fui a la escuela','ausente'],
      title: 'Asistencia e inasistencias',
      html: 'Las consultas sobre asistencia, inasistencias y justificaciones se realizan con <strong>Preceptoría</strong>. Presentá la documentación correspondiente según el procedimiento institucional. Benito no accede a datos personales ni al registro individual de asistencia.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'retiro-estudiante', priority: 20,
      phrases: ['quiero retirar a mi hijo de la escuela','quiero retirar a mi hija de la escuela','necesito retirar a mi hijo','necesito retirar a mi hija','como retiro a mi hijo','como retiro a mi hija','voy a buscar a mi hijo','voy a buscar a mi hija'],
      keywords: ['retirar','retiro','buscarlo','buscarla'],
      synonyms: ['retirar a mi hijo','retirar a mi hija','buscar a mi hijo','buscar a mi hija','sacar a mi hijo antes','sacar a mi hija antes','mi hijo sale antes','mi hija sale antes'],
      title: 'Retiro de un estudiante',
      html: 'Si necesitás retirar a tu hijo o hija <strong>durante la jornada escolar</strong>, comunicate con <strong>Preceptoría</strong> para avisar y confirmar el procedimiento y las autorizaciones vigentes. Podés llamar a la escuela al <strong>+54 345 4949814</strong>.<br><br>Si en cambio querés cambiarlo definitivamente de institución, el trámite correspondiente es un <strong>pase escolar</strong>.',
      actions: [['Llamar a la escuela','tel:+543454949814'],['Ver Preceptoría','../institucion.html#equipo']],
      followUps: [
        {
          id: 'retiro-autorizacion',
          priority: 23,
          phrases: ['quien puede retirarlo','quien puede retirarla','puede ir otra persona','que autorizacion necesito','tengo que avisar','debo avisar'],
          keywords: ['autorizacion','autorizado','persona','avisar'],
          title: 'Autorización para el retiro',
          html: 'Consultá previamente con <strong>Preceptoría</strong> quién puede realizar el retiro y qué autorización o identificación corresponde presentar en tu caso. Podés llamar al <strong>+54 345 4949814</strong>.',
          actions: [['Llamar a la escuela','tel:+543454949814'],['Ver Preceptoría','../institucion.html#equipo']]
        },
        {
          id: 'retiro-pase',
          priority: 23,
          phrases: ['quiero cambiarlo de escuela','quiero cambiarla de escuela','definitivamente','es para otra escuela','quiero pedir el pase'],
          keywords: ['cambiarlo','cambiarla','definitivamente','pase'],
          target: 'pase'
        }
      ]
    },
    {
      id: 'horario-clases', priority: 14,
      phrases: ['a que hora entran','a que hora entran los estudiantes','a que hora entran los chicos','horario de entrada','horario de salida','horario escolar','horario de clases','hora de clases'],
      keywords: ['entrada','salida','clases','turno'],
      synonyms: ['a que hora salen','cuando entran','cuando salen','entrada de estudiantes','salida de estudiantes'],
      title: 'Horario de clases, entrada y salida',
      html: 'Los horarios de entrada y salida pueden variar según el curso y la organización del ciclo lectivo. El Portal publica los <strong>horarios del ciclo lectivo 2026</strong> en Recursos. Para una modificación excepcional del día, consultá con <strong>Preceptoría</strong>.',
      actions: [['Ver horarios del ciclo lectivo','../recursos.html#docentes'],['Ver Preceptoría','../institucion.html#equipo']]
    },
    {
      id: 'materias-previas', priority: 16,
      phrases: ['tengo materias previas','debo materias','quiero rendir previas','cuando rindo materias previas','materias pendientes','me quedo una materia'],
      keywords: ['previas','previa','pendientes','debo','adeudo','rendir'],
      synonyms: ['me lleve una materia','me lleve matematica','rendir lo que debo','materia que me quedo'],
      title: 'Materias previas o pendientes',
      html: 'Para organizar la preparación de materias previas o pendientes, revisá las convocatorias de mesas de examen y consultá con <strong>Preceptoría, Tutoría o Asesoría Pedagógica</strong>. Allí podrán orientarte sobre fechas, inscripción y acompañamiento.',
      actions: [['Ver Vida Escolar','../vida-escolar.html'],['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'tutorias', priority: 14,
      phrases: ['quienes son los tutores','necesito una tutoria','hablar con un tutor','quiero hablar con un tutor','apoyo escolar','acompañamiento pedagogico','me cuesta una materia','me cuesta matematica','materias desaprobadas'],
      keywords: ['tutoria','tutor','tutores','apoyo','acompañamiento','dificultad','materia','matematica','desaprobadas'],
      synonyms: ['me va mal en varias materias','dar una mano con matematica','no entiendo una materia','ayuda escolar'],
      title: 'Tutorías y acompañamiento',
      html: 'La escuela dispone de espacios de tutoría y acompañamiento para fortalecer las trayectorias escolares. Podés consultar con <strong>Preceptoría, Tutoría o Asesoría Pedagógica</strong> para identificar el apoyo más adecuado.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'convivencia', priority: 14,
      phrases: ['problema de convivencia','tengo un conflicto','acoso escolar','bullying','me molestan en la escuela'],
      keywords: ['convivencia','conflicto','acoso','bullying','molestan','violencia'],
      synonyms: ['me cargan en la escuela','un compañero me carga','me pegan en la escuela','problema con compañeros'],
      title: 'Convivencia y cuidado',
      html: 'Si estás atravesando un conflicto o una situación que afecta tu bienestar, buscá acompañamiento de un adulto de confianza de la escuela: <strong>Preceptoría, Tutoría, Asesoría Pedagógica o Rectoría</strong>. Ante una situación urgente, no la enfrentes en soledad.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'aec-2026', priority: 18,
      phrases: ['acuerdo escolar de convivencia','aec 2026','acuerdo de convivencia'],
      keywords: ['aec','normas','responsabilidades','derechos'],
      title: 'Acuerdo Escolar de Convivencia 2026',
      html: 'El <strong>AEC 2026</strong> es el documento institucional aprobado que orienta la convivencia democrática, los derechos, las responsabilidades, el diálogo, la resolución pacífica de conflictos, el uso responsable de dispositivos y el cuidado del patrimonio escolar.',
      actions: [['Leer AEC 2026','../assets/documentos/acuerdo-escolar-convivencia-2026.pdf'],['Ver Convivencia Escolar','../vida-escolar.html#convivencia']]
    },
    {
      id: 'protocolo-conflictos', priority: 18,
      phrases: ['protocolo de conflictos en el aula','protocolo de actuacion ante conflictos','situaciones de conflicto en el aula'],
      keywords: ['protocolo','actuacion','intervencion'],
      required: ['conflicto'],
      title: 'Protocolo ante conflictos en el aula',
      html: 'El protocolo publicado propone una intervención gradual ante situaciones de conflicto en el aula, basada en el <strong>diálogo, el registro, el acompañamiento y las acciones pedagógicas y reparatorias</strong>. No reemplaza la intervención de las autoridades ni la atención de situaciones urgentes.',
      actions: [['Ver protocolo completo','../assets/imagenes/novedades/protocolo-conflictos-aula-2026.jpeg'],['Ver comunicaciones institucionales','../vida-escolar.html#comunicaciones-institucionales']]
    },
    {
      id: 'docente-aula', priority: 15,
      phrases: ['soy docente y quiero subir materiales','cargar recursos al aula digital','publicar actividad','agregar materiales'],
      keywords: ['docente','subir','cargar','publicar','materiales','recursos'],
      synonyms: ['soy profe y quiero subir','cargar material docente','subir un archivo al aula'],
      title: 'Publicación de materiales docentes',
      html: 'Para incorporar materiales, actividades o producciones al Aula Digital, comunicate con el <strong>RTI</strong>. El acompañamiento se realiza de manera pedagógica y digital, respetando la organización por curso y área.',
      actions: [['Ver equipo institucional','../institucion.html#equipo']]
    },
    {
      id: 'familias-seguimiento', priority: 14,
      phrases: ['quiero saber como va mi hijo','hablar por la trayectoria de mi hijo','mi hijo tiene dificultades','seguimiento escolar'],
      keywords: ['hijo','hija','familia','trayectoria','seguimiento','dificultades'],
      synonyms: ['como va mi hijo','como le esta yendo a mi hijo','seguimiento de mi hija'],
      title: 'Acompañamiento a familias',
      html: 'Para conversar sobre la trayectoria escolar de un estudiante, comunicate con <strong>Preceptoría, Tutoría o Asesoría Pedagógica</strong>. Por resguardo de la privacidad, Benito no brinda calificaciones, asistencia ni datos personales.',
      actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    },
    {
      id: 'calendario', priority: 13,
      phrases: ['calendario escolar','proximas fechas','cuando no hay clases','feriado escolar','jornada institucional','cual es el proximo evento'],
      keywords: ['calendario','fecha','fechas','feriado','jornada','evento','receso','vacaciones'],
      synonyms: ['que hay esta semana','proxima fecha','que actividad hay esta semana'],
      title: 'Calendario y fechas institucionales',
      html: 'El calendario publicado destaca el período del <strong>24 de agosto al 4 de septiembre de 2026</strong>, con integración de saberes, finalización e inicio de trimestres, comisión evaluadora y articulación con escuelas primarias de la zona. Para consultar el detalle, abrí la comunicación institucional.',
      actions: [['Ver fechas completas','../vida-escolar.html#comunicaciones-institucionales']]
    },
    {
      id: 'alumno-solidario', priority: 17,
      phrases: ['alumno solidario 2026','quien es el alumno solidario','quien salio alumno solidario'],
      keywords: ['axel','castro','solidario'],
      title: 'Alumno Solidario 2026',
      html: 'El reconocimiento de <strong>Alumno Solidario 2026</strong> fue otorgado a <strong>Axel Omar Castro</strong> por representar valores de solidaridad, compañerismo, respeto, compromiso y colaboración con la comunidad educativa.',
      actions: [['Ver reconocimiento','../vida-escolar.html#alumno-solidario']]
    },
    {
      id: 'cuadro-honor', priority: 17,
      phrases: ['cuadro de honor','cuadro de honor institucional','estudiantes destacados'],
      keywords: ['honor','academico','destacados'],
      title: 'Cuadro de Honor Institucional',
      html: 'El Cuadro de Honor reconoce a estudiantes destacados por su desempeño académico durante el <strong>Primer Trimestre de 2026</strong>. El Portal publica los cuadros del Ciclo Básico Común y del Ciclo Orientado en Ciencias Naturales.',
      actions: [['Ver cuadros de honor','../vida-escolar.html#cuadro-honor']]
    },
    {
      id: 'centro-estudiantes', priority: 17,
      phrases: ['centro de estudiantes','primer centro de estudiantes','participacion estudiantil'],
      keywords: ['centro','representacion','democratica'],
      required: ['estudiante'],
      title: 'Primer Centro de Estudiantes',
      html: 'La escuela avanza en la conformación de su <strong>primer Centro de Estudiantes</strong>, con participación de representantes de 1.º a 6.º Año. El espacio busca fortalecer la representación, la participación democrática y la construcción colectiva de la vida institucional.',
      actions: [['Ver estudiantes participantes','../vida-escolar.html#participacion']]
    },
    {
      id: 'promo-2026', priority: 16,
      phrases: ['promo 2026','promocion 2026','egresados 2026','futuros egresados'],
      keywords: ['promo','egreso','egresados'],
      title: 'Promo 2026',
      html: 'La sección <strong>Promo 2026</strong> reúne fotos, recuerdos, producciones, mensajes y momentos significativos de los futuros egresados bajo la identidad <strong>“La huella que dejamos”</strong>.',
      actions: [['Ir a Promo 2026','../promo-2026.html']]
    },
    {
      id: 'multimedia', priority: 15,
      phrases: ['galeria multimedia','seccion multimedia','fotos y videos de la escuela','identidad sonora'],
      keywords: ['multimedia','galeria','audios','videos','canciones'],
      title: 'Multimedia e identidad sonora',
      html: 'La sección Multimedia reúne la galería fotográfica institucional, videos y producciones de identidad sonora vinculadas con la historia, la escuela y su comunidad.',
      actions: [['Abrir Multimedia','../multimedia.html']]
    },
    {
      id: 'vida-escolar', priority: 12,
      phrases: ['cuadro de honor','quiero ver el cuadro de honor','alumno solidario','vida escolar'],
      keywords: ['honor','solidario','reconocimiento'],
      synonyms: ['quien salio alumno solidario','reconocimientos de estudiantes'],
      title: 'Vida Escolar y reconocimientos',
      html: 'En <strong>Vida Escolar</strong> podés consultar el Alumno Solidario 2026, el Cuadro de Honor del Ciclo Básico Común y el Cuadro de Honor del Ciclo Orientado en Ciencias Naturales.',
      actions: [['Abrir Vida Escolar','../vida-escolar.html']]
    },
    {
      id: 'comunicaciones', priority: 14,
      phrases: ['comunicaciones institucionales','hay comunicaciones institucionales nuevas','comunicacion vigente'],
      keywords: ['comunicaciones','comunicacion','comunicado','novedad'],
      synonyms: ['avisos nuevos','novedades de la escuela','ultimo aviso','ultimo comunicado'],
      title: 'Comunicaciones institucionales',
      html: 'Las comunicaciones publicadas incluyen la inscripción a las <strong>mesas de agosto</strong>, el protocolo de actuación ante conflictos en el aula, las fechas importantes del <strong>24 de agosto al 4 de septiembre</strong> y los avisos de Secretaría para el personal docente.',
      actions: [['Ver comunicaciones institucionales','../vida-escolar.html#comunicaciones-institucionales']]
    },
    {
      id: 'antecedentes-docentes', priority: 17,
      phrases: ['antecedentes de formacion docente','formacion docente continua','antecedentes cargados en sage'],
      keywords: ['antecedentes','folios','foliados','autenticadas'],
      title: 'Antecedentes de Formación Docente Continua',
      html: 'La recepción publicada de copias autenticadas de antecedentes de <strong>Formación Docente Continua</strong> finalizó el <strong>14 de agosto de 2026</strong>. El aviso ya no está vigente. Para conocer si existe una nueva instancia, consultá con Secretaría.',
      actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
    },
    {
      id: 'avisos-secretaria', priority: 17,
      phrases: ['avisos de secretaria','consideraciones de secretaria','comunicacion y organizacion institucional'],
      keywords: ['ausencias','licencias','documentacion','retiros'],
      required: ['secretaria'],
      title: 'Avisos de Secretaría para el personal docente',
      html: 'La comunicación publicada reúne consideraciones para el personal docente sobre <strong>ausencias, documentación, licencias, retiros anticipados, prioridades institucionales y asistencia diaria</strong>. Para situaciones particulares, corresponde consultar directamente con Secretaría.',
      actions: [['Ver aviso completo','../assets/imagenes/novedades/avisos-secretaria-personal-docente-2026.jpeg'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
    },
    {
      id: 'seguridad-accesos', priority: 19,
      phrases: ['cual es la contraseña de la plataforma privada','dame la clave de la plataforma','podes entrar a sage por mi','ingresa a mi cuenta'],
      keywords: ['contraseña','clave','credenciales','privada'],
      synonyms: ['decime la contraseña','pasame la clave','entra por mi','accede a mi cuenta'],
      title: 'Seguridad de accesos',
      html: 'Benito no brinda contraseñas ni credenciales, y tampoco puede ingresar a <strong>SAGE</strong> o a una cuenta en nombre de otra persona. Para recuperar el acceso, utilizá las opciones oficiales de la plataforma. Si necesitás asesoramiento para hacerlo, comunicate con el <strong>RTI</strong>.',
      actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo']]
    },
    {
      id: 'privacidad-chat', priority: 19,
      phrases: ['guardas las preguntas','guardas mis preguntas','recordas lo que pregunte ayer','tenes memoria','almacenas conversaciones'],
      keywords: ['guardas','almacenas','recordas','memoria','conversaciones'],
      synonyms: ['te acordas de ayer','guardas el chat','recordas otras conversaciones'],
      title: 'Privacidad de la conversación',
      html: 'No. Benito no almacena la conversación ni recuerda consultas de otros días. Solo mantiene un <strong>contexto temporal dentro de esta conversación abierta</strong> para entender preguntas de seguimiento. Al recargar o cerrar la página, ese hilo se pierde.',
      actions: [['Ver contacto institucional','../contacto.html']]
    },
    {
      id: 'privacidad', priority: 18,
      phrases: ['decime mis notas','mostrame mis calificaciones','cuantas faltas tiene mi hijo','datos de un alumno'],
      keywords: ['mis notas','calificaciones personales','datos personales','faltas de mi hijo'],
      title: 'Protección de datos personales',
      html: 'Benito no accede ni muestra calificaciones, asistencia, legajos u otros datos personales. Esa información debe consultarse mediante <strong>SAGE</strong> o con el área institucional correspondiente, respetando la identidad y autorización de la persona interesada. Si necesitás ayuda para ingresar o utilizar SAGE, comunicate con el <strong>RTI</strong>.',
      actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
    }
  ];
window.BENITO_FLUJOS = {
    sage: [
      {
        id: 'sage-access',
        priority: 24,
        phrases: ['como entrar a sage','como entro a sage','como ingreso a sage','no puedo entrar a sage','no puedo ingresar a sage','no me deja entrar a sage'],
        keywords: ['entrar','ingresar','acceder','acceso'],
        synonyms: ['tengo problemas para entrar a sage','no logro acceder a sage'],
        required: ['sage'],
        label: 'No puedo ingresar',
        title: 'Acceso a SAGE',
        html: 'Abrí <strong>SAGE</strong> e ingresá con tu usuario. Si no recordás la contraseña, utilizá la recuperación oficial; si todavía no tenés usuario, iniciá la solicitud de alta. Si después de esos pasos seguís sin poder acceder, comunicate con el <strong>RTI</strong> y describí el mensaje de error sin compartir tu contraseña.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Solicitar usuario SAGE','https://sage.entrerios.gov.ar/solicitarUsuario/index.php'],['Ver horario del RTI','../institucion.html#equipo']]
      },
      {
        id: 'sage-password',
        priority: 20,
        phrases: ['olvide mi contraseña de sage','recuperar contraseña de sage','olvide mi clave de sage'],
        keywords: ['contraseña','clave'],
        synonyms: ['no recuerdo la clave de sage','perdi la contraseña de sage','sage contraseña olvidada'],
        required: ['sage'],
        label: 'Olvidé mi contraseña',
        title: 'Recuperar acceso a SAGE',
        html: 'Ingresá a SAGE y utilizá la opción de recuperación de contraseña. Si no podés completar el proceso o necesitás asesoramiento, comunicate con el <strong>RTI</strong>. No compartas tu contraseña ni códigos de recuperación.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo']]
      },
      {
        id: 'sage-user',
        priority: 20,
        phrases: ['no tengo usuario de sage','solicitar usuario de sage','crear usuario de sage'],
        keywords: ['usuario','registrarme'],
        synonyms: ['no tengo cuenta para entrar a sage','no tengo cuenta para entrar al sage','crear cuenta en sage','dar de alta usuario sage'],
        required: ['sage'],
        label: 'No tengo usuario',
        title: 'Solicitar usuario de SAGE',
        html: 'Podés iniciar la solicitud de usuario desde el sitio oficial de SAGE. Si necesitás asesoramiento para completar el registro, comunicate con el <strong>RTI</strong>. No compartas contraseñas ni códigos de verificación.',
        actions: [['Solicitar usuario SAGE','https://sage.entrerios.gov.ar/solicitarUsuario/index.php'],['Ver horario del RTI','../institucion.html#equipo']]
      },
      {
        id: 'sage-error',
        priority: 20,
        phrases: ['sage esta caido','sage no carga','sage no funciona','me aparece un error en sage'],
        keywords: ['caido','error','carga'],
        synonyms: ['sage no abre','sage tira error','problema para abrir sage','el sitio no carga','la pagina no carga','el sitio no abre'],
        required: ['sage'],
        label: 'Me aparece un error',
        title: 'Error de acceso a SAGE',
        html: 'Primero verificá que el usuario esté escrito correctamente y probá nuevamente. Si el error continúa, anotá o capturá el mensaje que aparece —sin mostrar tu contraseña— y comunicate con el <strong>RTI</strong> para recibir asesoramiento.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo']]
      },
      {
        id: 'sage-grades',
        priority: 20,
        phrases: ['donde veo mis calificaciones en sage','ver calificaciones en sage','ver notas en sage','no encuentro mis calificaciones en sage'],
        keywords: ['calificaciones','notas','boletin'],
        synonyms: ['donde esta el boletin en sage','buscar el boletin en sage'],
        required: ['sage'],
        label: 'No encuentro mis calificaciones',
        title: 'Calificaciones en SAGE',
        html: 'Ingresá a SAGE con tu usuario y revisá la sección correspondiente al estudiante. Si necesitás ayuda para encontrarla o usar la plataforma, comunicate con el <strong>RTI</strong>. Si una calificación no aparece o es incorrecta, consultá con <strong>Preceptoría o Secretaría</strong>. Benito no accede ni muestra información académica personal.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo'],['Ver contacto','../contacto.html']]
      },
      {
        id: 'sage-constancia',
        priority: 21,
        phrases: ['generar una constancia en sage','generar constancia en sage','constancia de alumno regular en sage'],
        keywords: ['constancia','certificado'],
        synonyms: ['sacar constancia por sage','descargar constancia de sage'],
        required: ['sage'],
        label: 'Generar constancia',
        title: 'Constancia de alumno regular en SAGE',
        html: 'Sí. El estudiante o un familiar puede ingresar a <strong>SAGE</strong>, buscar <strong>“Constancia de alumno regular”</strong>, generar el documento, descargarlo e imprimirlo. Si necesitás ayuda para ingresar o realizar estos pasos en SAGE, comunicate con el <strong>RTI</strong>. Si no lográs obtener la constancia, acercate a Secretaría o Administración, de lunes a viernes, de 7:30 a 13:00.',
        actions: [['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo'],['Ver contacto','../contacto.html']],
        followUps: [
          {
            id: 'sage-constancia-acceso',
            priority: 21,
            phrases: ['no puedo entrar','no puedo ingresar','no logro acceder','no me deja entrar','no me deja ingresar'],
            synonyms: ['tengo problemas para entrar','no abre'],
            target: 'sage'
          },
          {
            id: 'sage-constancia-firma',
            priority: 20,
            phrases: ['necesito firma y sello','necesito firma','necesito sello','tiene que estar firmada'],
            keywords: ['firma','sello','firmada','sellada'],
            title: 'Firma o sello de la constancia',
            html: 'Si necesitás firma o sello institucional, comunicate con <strong>Secretaría o Administración</strong> para confirmar el procedimiento. La atención es de lunes a viernes, de 7:30 a 13:00.',
            actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
          }
        ]
      },
      {
        id: 'sage-rti',
        priority: 22,
        phrases: ['necesito asesoramiento sobre sage','necesito ayuda para usar sage','quien me ayuda con sage','con quien hablo por sage','no se usar sage'],
        keywords: ['asesoramiento','ayuda','usar','orientacion'],
        synonyms: ['necesito que me expliquen sage','no entiendo sage','ayuda para entrar a sage','ayuda con el sage'],
        required: ['sage'],
        label: 'Necesito asesoramiento',
        title: 'Asesoramiento sobre SAGE',
        html: 'Para recibir asesoramiento sobre el ingreso, la recuperación de acceso o el uso de <strong>SAGE</strong>, comunicate con el <strong>RTI, Alfredo Esquivel</strong>.<ul><li><strong>Martes:</strong> 7:30 a 11:40.</li><li><strong>Jueves:</strong> 7:30 a 10:00.</li></ul>No compartas tu contraseña ni códigos de recuperación.',
        actions: [['Ver horario del RTI','../institucion.html#equipo'],['Ingresar a SAGE','https://sage.entrerios.gov.ar/']]
      }
    ],
    pase: [
      {
        id: 'pase-out',
        priority: 20,
        phrases: ['quiero pedir un pase a otra escuela','pase a otra escuela','cambiarme a otra escuela','traslado a otra escuela'],
        keywords: ['pase','traslado'],
        synonyms: ['pase otra escuela','me cambio de escuela','hacer el traslado','hacia otra escuela','a otra escuela','salir hacia otra escuela'],
        required: ['pase'],
        label: 'Pase hacia otra escuela',
        title: 'Pase hacia otra institución',
        html: 'El pase se gestiona en <strong>Secretaría</strong>. Acercate o comunicate con la escuela para iniciar el trámite y confirmar la documentación requerida según tu situación. La atención administrativa es de lunes a viernes, de 7:30 a 13:00.',
        actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']],
        followUps: [
          {
            id: 'pase-out-documentacion',
            priority: 21,
            phrases: ['que documentacion necesito','que papeles necesito','que requisitos necesito','que tengo que llevar','documentacion para el pase'],
            keywords: ['documentacion','papeles','requisitos','llevar'],
            title: 'Documentación para el pase hacia otra institución',
            html: 'Para este <strong>pase hacia otra escuela</strong>, Secretaría debe confirmar la documentación según la situación del estudiante y la institución de destino. Comunicate con la escuela antes de acercarte para recibir la lista vigente y evitar presentar documentación innecesaria.',
            actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
          },
          {
            id: 'pase-out-pasos',
            priority: 20,
            phrases: ['como sigo','cual es el siguiente paso','que hago ahora','donde lo inicio'],
            keywords: ['pasos','seguir','inicio','iniciar'],
            title: 'Cómo iniciar el pase',
            html: 'El siguiente paso es comunicarte con <strong>Secretaría</strong> para iniciar el pase hacia la otra institución. Allí confirmarán la documentación y el procedimiento correspondiente a tu situación.',
            actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
          }
        ]
      },
      {
        id: 'pase-in',
        priority: 20,
        phrases: ['ingreso desde otra escuela','pase desde otra escuela','vengo de otra escuela'],
        keywords: ['ingreso','pase'],
        synonyms: ['vengo de otro colegio','entrar desde otra escuela','llego con pase'],
        required: ['pase'],
        label: 'Ingreso desde otra escuela',
        title: 'Ingreso con pase desde otra institución',
        html: 'Para ingresar con pase desde otra escuela, comunicate con <strong>Secretaría</strong>. Allí te indicarán la documentación vigente, la disponibilidad y los pasos para completar la incorporación.',
        actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']],
        followUps: [
          {
            id: 'pase-in-documentacion',
            priority: 21,
            phrases: ['que documentacion necesito','que papeles necesito','que requisitos necesito','que tengo que llevar','documentacion para ingresar'],
            keywords: ['documentacion','papeles','requisitos','llevar'],
            title: 'Documentación para ingresar con pase',
            html: 'Para el <strong>ingreso desde otra escuela</strong>, Secretaría debe confirmar la documentación vigente, la disponibilidad y los pasos según la trayectoria del estudiante. Comunicate antes de acercarte para recibir la indicación correcta.',
            actions: [['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com'],['Ver contacto','../contacto.html']]
          }
        ]
      },
      {
        id: 'pase-early-exit',
        priority: 20,
        phrases: ['retiro antes del horario','retiro anticipado','retirarme antes del horario'],
        keywords: ['retiro anticipado','antes del horario'],
        synonyms: ['irme antes de hora','me tengo que ir antes de hora','salir antes del horario'],
        label: 'Retiro antes del horario',
        title: 'Retiro anticipado',
        html: 'Si la consulta es por retirarte antes del horario habitual, comunicate con <strong>Preceptoría</strong>. En el caso de estudiantes menores de edad, el retiro debe ajustarse a las autorizaciones y procedimientos institucionales.',
        actions: [['Ver equipo institucional','../institucion.html#equipo'],['Contactar a la escuela','../contacto.html']]
      }
    ],
    aula: [
      {
        id: 'aula-1a',
        priority: 20,
        phrases: ['aula de 1 a','aula de primero a','materiales de 1 a','la de 1 a'],
        keywords: ['1 a','primero a'],
        synonyms: ['primer año a','1 año a'],
        required: ['aula'],
        label: '1.º A',
        title: 'Aula Digital de 1.º A',
        html: 'Los materiales de <strong>1.º Año A</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-1b',
        priority: 20,
        phrases: ['aula de 1 b','aula de primero b','materiales de 1 b','la de 1 b'],
        keywords: ['1 b','primero b'],
        synonyms: ['primer año b','1 año b'],
        required: ['aula'],
        label: '1.º B',
        title: 'Aula Digital de 1.º B',
        html: 'Los materiales de <strong>1.º Año B</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-2a',
        priority: 20,
        phrases: ['aula de 2 a','aula de segundo a','materiales de 2 a','la de 2 a'],
        keywords: ['2 a','segundo a'],
        synonyms: ['segundo año a','2 año a'],
        required: ['aula'],
        label: '2.º A',
        title: 'Aula Digital de 2.º A',
        html: 'Los materiales de <strong>2.º Año A</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-2b',
        priority: 20,
        phrases: ['aula de 2 b','aula de segundo b','materiales de 2 b','la de 2 b'],
        keywords: ['2 b','segundo b'],
        synonyms: ['segundo año b','2 año b'],
        required: ['aula'],
        label: '2.º B',
        title: 'Aula Digital de 2.º B',
        html: 'Los materiales de <strong>2.º Año B</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-3',
        priority: 20,
        phrases: ['aula de 3','aula de tercero','materiales de 3','la de 3'],
        keywords: ['3','tercero'],
        synonyms: ['tercer año','3 año'],
        required: ['aula'],
        label: '3.º Año',
        title: 'Aula Digital de 3.º Año',
        html: 'Los materiales de <strong>3.º Año</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-4',
        priority: 20,
        phrases: ['aula de 4','aula de cuarto','materiales de 4','la de 4'],
        keywords: ['4','cuarto'],
        synonyms: ['cuarto año','4 año'],
        required: ['aula'],
        label: '4.º Año',
        title: 'Aula Digital de 4.º Año',
        html: 'Los materiales de <strong>4.º Año</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-5',
        priority: 20,
        phrases: ['aula de 5','aula de quinto','materiales de 5','la de 5'],
        keywords: ['5','quinto'],
        synonyms: ['quinto año','5 año'],
        required: ['aula'],
        label: '5.º Año',
        title: 'Aula Digital de 5.º Año',
        html: 'Los materiales de <strong>5.º Año</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      },
      {
        id: 'aula-6',
        priority: 20,
        phrases: ['aula de 6','aula de sexto','materiales de 6','la de 6'],
        keywords: ['6','sexto'],
        synonyms: ['sexto año','6 año'],
        required: ['aula'],
        label: '6.º Año',
        title: 'Aula Digital de 6.º Año',
        html: 'Los materiales de <strong>6.º Año</strong> están protegidos dentro del Aula Digital. Ingresá desde el acceso general con el usuario y la contraseña proporcionados por la escuela.',
        actions: [['Ingresar al Aula Digital','../aula-digital.html']]
      }
    ],
    becas: [
      {
        id: 'becas-progresar',
        priority: 20,
        phrases: ['progresar','becas progresar','beca progresar','beca progresa'],
        keywords: ['progresar','progresa'],
        synonyms: ['progre','progresal'],
        label: 'Becas Progresar',
        title: 'Becas Progresar',
        html: 'La inscripción y el seguimiento se realizan mediante los canales oficiales de Progresar. Para una constancia de alumno regular, podés generarla desde SAGE. Si necesitás asesoramiento para usar SAGE, comunicate con el <strong>RTI</strong>; para verificar datos académicos o documentación, consultá con Secretaría.',
        actions: [['Abrir Progresar','https://www.argentina.gob.ar/educacion/progresar'],['Ingresar a SAGE','https://sage.entrerios.gov.ar/'],['Ver horario del RTI','../institucion.html#equipo'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      },
      {
        id: 'becas-instituto',
        priority: 20,
        phrases: ['instituto becario','instituto becario de entre rios'],
        keywords: ['becario'],
        synonyms: ['beca de entre rios','beca provincial','instituto de becas'],
        label: 'Instituto Becario',
        title: 'Instituto Becario de Entre Ríos',
        html: 'Consultá convocatorias, requisitos y estado de trámites en el sitio oficial del Instituto Becario. Si necesitás documentación escolar, podés solicitar orientación en Secretaría.',
        actions: [['Abrir Instituto Becario','https://www.institutobecario.gov.ar/'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      },
      {
        id: 'becas-otra',
        priority: 18,
        phrases: ['otra beca','otras becas'],
        keywords: ['otra'],
        required: ['beca'],
        label: 'Otra beca',
        title: 'Consulta sobre otra beca',
        html: 'Indicá el nombre de la beca o programa para que pueda orientarte mejor. Cuando el trámite requiere documentación escolar, la gestión se realiza mediante Secretaría o Administración.',
        actions: [['Ver recursos y enlaces','../recursos.html#enlaces'],['Contactar Secretaría','mailto:secretaria31benitojuarez@gmail.com']]
      }
    ]
  };

/* PORTAL_INTELIGENTE_V3_0_2026 */
window.BENITO_PORTAL_INTELIGENTE = {
  aec: { titulo: "Acuerdo Escolar de Convivencia 2026", url: "../biblioteca.html", resumen: "Documento aprobado que orienta derechos, responsabilidades, convivencia, uso pedagógico del celular, medidas reparatorias y Consejo Escolar de Convivencia." },
  proyecto: { titulo: "Nos cuidamos en comunidad", url: "../proyecto-nos-cuidamos.html", resumen: "Proyecto interdisciplinario sobre hábitos saludables, actividad física, ambiente y participación comunitaria. Incluye el proyecto de la huerta de 6.º Año con la profesora Alejandra Martínez, con preparación de la tierra, siembra en almácigos y registro completo en el Portal." },
  servicios: { titulo: "Portal de servicios", url: "../servicios.html", correoSecretaria: "secretaria31benitojuarez@gmail.com" }
};
