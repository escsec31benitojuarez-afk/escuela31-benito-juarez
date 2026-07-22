window.BENITO_IA_CONFIG = {
  version: '1.2.0-conversacional',
  assistantName: 'Benito IA',
  assistantSubtitle: 'Asistente pedagógico y digital',
  schoolName: 'Escuela Secundaria N.º 31 “Benito Juárez”',
  launcherLabel: 'Benito IA',
  welcomeTitle: '¡Hola! 👋',
  welcomeText: 'Soy Benito IA. Elegí cómo participás en la comunidad educativa para que pueda orientarte mejor.',
  privacyText: 'No compartas datos personales, contraseñas ni información sensible.',
  storageKey: 'benitoIA_v1_2_state',
  maxHistory: 24,
  typingDelay: 480,
  fuzzyThreshold: 0.72,
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
      quicks: ['Aula Digital','¿Cómo estudio mejor?','Becas','Vida Escolar']
    },
    familia: {
      label: 'Soy familia',
      icon: '👨‍👩‍👧',
      quicks: ['Contacto','SAGE y calificaciones','Vida Escolar','Becas']
    },
    docente: {
      label: 'Soy docente',
      icon: '👩‍🏫',
      quicks: ['Programas','Aula Digital','Aprender a Aprender','Recursos']
    },
    visitante: {
      label: 'Soy visitante',
      icon: '👥',
      quicks: ['Institución','Historia','Vida Escolar','Contacto']
    }
  }
};