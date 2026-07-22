(function () {
  'use strict';

  const CONFIG = {
    assistantName: 'Benito IA',
    subtitle: 'Asistente pedagógico y digital',
    school: 'Escuela Secundaria N.º 31 “Benito Juárez”',
    storageKey: 'benitoIAConversationOpen',
    maxMessages: 20
  };

  const LINKS = {
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
  };

  const quickQuestions = [
    '¿Qué puedo encontrar en el Aula Digital?',
    '¿Cómo puedo estudiar mejor?',
    '¿Dónde están las becas?',
    '¿Cómo contacto a la escuela?'
  ];

  const intents = [
    {
      terms: ['hola', 'buen día', 'buen dia', 'buenas', 'quién sos', 'quien sos', 'qué sos', 'que sos'],
      answer: () => `¡Hola! Soy <strong>${CONFIG.assistantName}</strong>, el asistente pedagógico y digital de la ${CONFIG.school}. Puedo orientarte dentro del sitio, ayudarte a encontrar recursos y proponerte estrategias para estudiar mejor.`
    },
    {
      terms: ['aula digital', 'materiales', 'curso', 'repositorio', 'clases', 'actividad por curso'],
      answer: () => `El <strong>Aula Digital</strong> es el repositorio pedagógico multiformato de la escuela. Allí encontrarás materiales de estudio, actividades, recursos digitales, continuidad pedagógica y producciones organizadas por curso. <a href="${LINKS.aula}">Ingresar al Aula Digital</a>.`
    },
    {
      terms: ['estudiar mejor', 'técnica de estudio', 'tecnica de estudio', 'aprender a aprender', 'cómo estudio', 'como estudio', 'preparar una evaluación', 'preparar un examen'],
      answer: () => `Para estudiar con más estrategia, te recomiendo esta ruta: <strong>1)</strong> definí una meta concreta; <strong>2)</strong> trabajá con una técnica activa; <strong>3)</strong> cerrá el material y comprobá qué recordás; <strong>4)</strong> revisá errores y ajustá. Podés probar recuperación activa, método Cornell, explicación simple o estudio espaciado.`
    },
    {
      terms: ['recuperación activa', 'recuperacion activa'],
      answer: () => `La <strong>recuperación activa</strong> consiste en cerrar el material y escribir o explicar todo lo que recordás. Después comparás con los apuntes para detectar qué comprendiste y qué necesitás revisar.`
    },
    {
      terms: ['cornell', 'método cornell', 'metodo cornell'],
      answer: () => `El <strong>método Cornell</strong> organiza la hoja en preguntas o palabras clave, notas principales y una síntesis final. Para repasar, tapá las notas e intentá responder las preguntas de la izquierda.`
    },
    {
      terms: ['estudio espaciado', 'repasar', 'memoria'],
      answer: () => `El <strong>estudio espaciado</strong> distribuye repasos breves en distintos momentos: hoy, mañana, en tres días y en una semana. Es más efectivo que concentrar todo el estudio en una sola noche.`
    },
    {
      terms: ['pomodoro', '25 minutos', 'bloque de estudio'],
      answer: () => `Podés comenzar con un bloque posible de <strong>25 minutos de foco y 5 minutos de pausa</strong>. Elegí una meta concreta, silenciá notificaciones y cerrá comprobando si podés explicarlo sin mirar.`
    },
    {
      terms: ['beca', 'becas', 'progresar', 'instituto becario'],
      answer: () => `Los accesos a <strong>becas y acompañamiento estudiantil</strong> están reunidos en la sección Recursos. Allí encontrarás los enlaces disponibles para estudiantes y familias. <a href="${LINKS.recursos}">Ver Recursos</a>.`
    },
    {
      terms: ['sage', 'calificaciones', 'boletín', 'boletin'],
      answer: () => `El acceso a <strong>SAGE</strong> y otros servicios para familias se encuentra en Recursos. <a href="${LINKS.recursos}">Ir a Recursos</a>. Para una situación particular, conviene comunicarse con la escuela.`
    },
    {
      terms: ['contacto', 'teléfono', 'telefono', 'celular', 'correo', 'email', 'dirección', 'direccion', 'dónde queda', 'donde queda'],
      answer: () => `Podés comunicarte con la escuela al <a href="tel:+543454949814">+54 345 4949814</a> o por correo a <a href="mailto:secundaria31.cd@entrerios.edu.ar">secundaria31.cd@entrerios.edu.ar</a>. La institución se encuentra en Estación Yuquerí, Concordia, Entre Ríos. <a href="${LINKS.contacto}">Ver contacto completo</a>.`
    },
    {
      terms: ['rector', 'secretaria', 'asesora', 'equipo directivo', 'autoridades'],
      answer: () => `La información sobre autoridades, equipo institucional, modalidad y organización escolar está disponible en <a href="${LINKS.institucion}">Institución</a>.`
    },
    {
      terms: ['alumno solidario', 'axel', 'solidario'],
      answer: () => `El reconocimiento <strong>Alumno Solidario 2026</strong> fue otorgado a <strong>Axel Omar Castro</strong>, por representar valores de solidaridad, compañerismo, respeto, compromiso y colaboración. <a href="${LINKS.vida}#alumno-solidario">Ver reconocimiento</a>.`
    },
    {
      terms: ['cuadro de honor', 'honor', 'destacados', 'reconocimiento académico'],
      answer: () => `El <strong>Cuadro de Honor Institucional</strong> reconoce a estudiantes destacados por su desempeño académico. Podés consultarlo en <a href="${LINKS.vida}">Vida Escolar</a>.`
    },
    {
      terms: ['centro de estudiantes', 'participación estudiantil', 'participacion estudiantil'],
      answer: () => `La escuela avanza hacia la conformación de su primer <strong>Centro de Estudiantes</strong>, como espacio democrático de participación, representación y construcción colectiva. <a href="${LINKS.vida}">Conocer el proceso</a>.`
    },
    {
      terms: ['promo 2026', 'egresados', 'promoción', 'promocion'],
      answer: () => `El espacio <strong>Promo 2026</strong> reúne fotos, recuerdos, producciones, mensajes y momentos significativos de los futuros egresados. <a href="${LINKS.promo}">Ir a Promo 2026</a>.`
    },
    {
      terms: ['campaña', 'campanas', 'comunicado', 'mesas de examen', 'fechas institucionales', 'preceptores'],
      answer: () => `Las campañas, mesas de examen, fechas institucionales e información para preceptores se publican en <a href="${LINKS.vida}">Vida Escolar</a>, dentro de Comunicaciones institucionales.`
    },
    {
      terms: ['programa', 'programas de estudio', 'proyecto institucional', 'proyectos'],
      answer: () => `Los programas y proyectos institucionales están organizados en <a href="${LINKS.programas}">Programas y proyectos</a>. El repositorio de programas de estudio se encuentra en preparación junto con la Asesoría Pedagógica.`
    },
    {
      terms: ['ciclo del agua', 'producciones', 'actividades y producciones'],
      answer: () => `En <a href="${LINKS.actividades}">Actividades y producciones</a> podés conocer experiencias de aprendizaje realizadas por estudiantes, como el proyecto <strong>El ciclo del agua</strong> de 2.º Año B, en Ciencias Naturales.`
    },
    {
      terms: ['historia', 'benito juárez', 'benito juarez', 'identidad'],
      answer: () => `La historia de la escuela y la identidad vinculada a Benito Juárez están desarrolladas en <a href="${LINKS.historia}">Historia e identidad</a>.`
    },
    {
      terms: ['biblioteca', 'comedor', 'acompañamiento'],
      answer: () => `La información sobre biblioteca, comedor y espacios de acompañamiento institucional está disponible en <a href="${LINKS.comunidad}">Comunidad</a>.`
    },
    {
      terms: ['video', 'multimedia', 'música', 'musica'],
      answer: () => `Los videos, producciones audiovisuales e identidad sonora institucional están reunidos en <a href="${LINKS.multimedia}">Multimedia</a>.`
    }
  ];

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9ñü\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function scoreIntent(query, intent) {
    const normalized = normalize(query);
    return intent.terms.reduce((score, term) => {
      const t = normalize(term);
      if (normalized.includes(t)) return score + (t.split(' ').length * 3);
      return score;
    }, 0);
  }

  function answerQuestion(question) {
    const ranked = intents
      .map(intent => ({ intent, score: scoreIntent(question, intent) }))
      .sort((a, b) => b.score - a.score);

    if (ranked[0] && ranked[0].score > 0) return ranked[0].intent.answer();

    return `Todavía no tengo una respuesta específica para esa consulta. Puedo ayudarte con información sobre el Aula Digital, recursos, becas, contacto, Vida Escolar, Promo 2026, programas institucionales y técnicas para estudiar. También podés consultar la <a href="${LINKS.inicio}">página principal</a> o comunicarte con la escuela.`;
  }

  function createEl(tag, className, html) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (html !== undefined) el.innerHTML = html;
    return el;
  }

  function buildChatbot() {
    if (document.getElementById('benitoIAWidget')) return;

    const root = createEl('div', 'benito-ia-widget');
    root.id = 'benitoIAWidget';

    const launcher = createEl('button', 'benito-ia-launcher');
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Abrir Benito IA');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = '<span class="benito-ia-launcher-icon">BJ</span><span class="benito-ia-launcher-label">Benito IA</span><span class="benito-ia-status-dot" aria-hidden="true"></span>';

    const panel = createEl('section', 'benito-ia-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Benito IA, asistente pedagógico y digital');
    panel.setAttribute('aria-hidden', 'true');

    const header = createEl('header', 'benito-ia-header', `
      <div class="benito-ia-avatar" aria-hidden="true">BJ</div>
      <div>
        <strong>${CONFIG.assistantName}</strong>
        <span>${CONFIG.subtitle}</span>
      </div>
      <button type="button" class="benito-ia-close" aria-label="Cerrar asistente">×</button>
    `);

    const messages = createEl('div', 'benito-ia-messages');
    messages.setAttribute('aria-live', 'polite');
    messages.setAttribute('aria-label', 'Conversación');

    const quick = createEl('div', 'benito-ia-quick');
    quick.setAttribute('aria-label', 'Preguntas sugeridas');
    quickQuestions.forEach(question => {
      const btn = createEl('button', 'benito-ia-chip', question);
      btn.type = 'button';
      btn.dataset.question = question;
      quick.appendChild(btn);
    });

    const form = createEl('form', 'benito-ia-form');
    form.innerHTML = `
      <label class="sr-only" for="benitoIAInput">Escribí tu consulta</label>
      <input id="benitoIAInput" type="text" maxlength="240" autocomplete="off" placeholder="Escribí tu consulta…" required>
      <button type="submit" aria-label="Enviar consulta">➤</button>
    `;

    const note = createEl('p', 'benito-ia-note', 'Orientación institucional. No compartas datos personales ni información sensible.');

    panel.append(header, messages, quick, form, note);
    root.append(panel, launcher);
    document.body.appendChild(root);

    const input = form.querySelector('input');
    const closeBtn = header.querySelector('.benito-ia-close');

    function addMessage(type, html) {
      const row = createEl('div', `benito-ia-message ${type}`);
      row.innerHTML = `<div class="benito-ia-bubble">${html}</div>`;
      messages.appendChild(row);
      while (messages.children.length > CONFIG.maxMessages) messages.removeChild(messages.firstElementChild);
      messages.scrollTop = messages.scrollHeight;
    }

    function openPanel() {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      launcher.setAttribute('aria-expanded', 'true');
      sessionStorage.setItem(CONFIG.storageKey, 'true');
      window.setTimeout(() => input.focus(), 180);
    }

    function closePanel() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      launcher.setAttribute('aria-expanded', 'false');
      sessionStorage.setItem(CONFIG.storageKey, 'false');
      launcher.focus();
    }

    function ask(question) {
      const clean = question.trim();
      if (!clean) return;
      addMessage('user', clean.replace(/[<>]/g, ''));
      input.value = '';
      quick.hidden = true;
      const typing = createEl('div', 'benito-ia-message assistant typing', '<div class="benito-ia-bubble"><span></span><span></span><span></span></div>');
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
      window.setTimeout(() => {
        typing.remove();
        addMessage('assistant', answerQuestion(clean));
      }, 450);
    }

    launcher.addEventListener('click', () => panel.classList.contains('is-open') ? closePanel() : openPanel());
    closeBtn.addEventListener('click', closePanel);
    form.addEventListener('submit', event => {
      event.preventDefault();
      ask(input.value);
    });
    quick.addEventListener('click', event => {
      const btn = event.target.closest('[data-question]');
      if (btn) ask(btn.dataset.question);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });

    addMessage('assistant', `¡Hola! Soy <strong>${CONFIG.assistantName}</strong>, el asistente pedagógico y digital de la Escuela Secundaria N.º 31 “Benito Juárez”. ¿En qué puedo ayudarte?`);

    if (sessionStorage.getItem(CONFIG.storageKey) === 'true') openPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChatbot);
  } else {
    buildChatbot();
  }
})();
