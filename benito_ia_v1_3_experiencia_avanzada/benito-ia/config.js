window.BENITO_IA_CONFIG = {
  version: '1.3.0-experiencia-avanzada',
  assistantName: 'Benito IA',
  assistantSubtitle: 'Asistente pedagógico y digital',
  schoolName: 'Escuela Secundaria N.º 31 “Benito Juárez”',
  launcherLabel: 'Benito IA',
  welcomeTitle: '¡Hola! 👋',
  welcomeText: 'Puedo orientarte dentro del sitio, ayudarte a encontrar recursos y acompañarte con estrategias de estudio.',
  privacyText: 'No compartas datos personales, contraseñas ni información sensible.',
  storageKey: 'benitoIA_v1_3_state',
  analyticsKey: 'benitoIA_v1_3_analytics',
  maxHistory: 30,
  typingDelay: 520,
  fuzzyThreshold: 0.70,
  enableLocalAnalytics: true,
  paths: {
    inicio: 'index.html',
    institucion: 'institucion.html',
    historia: 'historia.html',
    recursos: 'recursos.html',
    aula: 'aula-digital.html',
    actividades: 'actividades.html',
    vida: 'vida-escolar.html',
    promo: 'promo-2026.html',
    programas: 'programas.html',
    comunidad: 'comunidad.html',
    multimedia: 'multimedia.html',
    contacto: 'contacto.html'
  },
  profiles: {
    estudiante: {
      label: 'Soy estudiante',
      icon: '🎓',
      greeting: 'Voy a priorizar materiales, técnicas de estudio, becas y vida escolar.',
      quicks: ['Aula Digital','Necesito estudiar','Becas','Vida Escolar']
    },
    familia: {
      label: 'Soy familia',
      icon: '👨‍👩‍👧',
      greeting: 'Voy a priorizar contacto, comunicaciones, SAGE, becas e información institucional.',
      quicks: ['Contacto','SAGE y calificaciones','Vida Escolar','Becas']
    },
    docente: {
      label: 'Soy docente',
      icon: '👩‍🏫',
      greeting: 'Voy a priorizar programas, recursos, repositorios y materiales de acompañamiento pedagógico.',
      quicks: ['Programas','Aula Digital','Aprender a Aprender','Recursos']
    },
    visitante: {
      label: 'Soy visitante',
      icon: '👥',
      greeting: 'Voy a priorizar historia, institución, vida escolar y contacto.',
      quicks: ['Institución','Historia','Vida Escolar','Contacto']
    }
  }
};