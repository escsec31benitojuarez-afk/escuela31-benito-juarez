(function () {
  'use strict';

  const messages = document.getElementById('messages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('question');
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q');

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

  const knowledge = window.BENITO_CONOCIMIENTO || [];
  const flows = window.BENITO_FLUJOS || {};

  const conversation = { lastIntent: null, lastFlow: null };

  function directIntent(question) {
    const text = normalize(question);
    if (/\b(sage)\b/.test(text)) return 'sage';
    if (/\b(constancia|certificado)\b/.test(text) && /\b(alumno|regular|escolar)\b/.test(text)) return 'certificados';
    if (/\b(pase|traslado|transferencia)\b/.test(text)) return 'pase';
    if (/\b(beca|becas|progresar|becario)\b/.test(text)) return 'becas';
    if (/\b(analitico|titulo|diploma)\b/.test(text)) return 'analitico-titulo';
    if (/\b(inasistencia|inasistencias|justificar|falta|faltas)\b/.test(text)) return 'asistencia';
    if (/\b(previa|previas|pendiente|pendientes)\b/.test(text)) return 'materias-previas';
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
        conversation.lastFlow = flowName;
        const response = addMessage(option.html, 'assistant', option.title);
        addActions(response, option.actions);
      });
      wrap.appendChild(button);
    });
    bubble.appendChild(wrap);
  }


  function addRelatedSuggestions(bubble, intentId) {
    const related = {
      certificados: [['No puedo entrar a SAGE','No puedo entrar a SAGE'],['Necesito firma y sello','Necesito una constancia firmada y sellada']],
      'materias-previas': [['Ver mesas de examen','¿Cuándo son las mesas de examen?'],['Necesito tutoría','Necesito una tutoría']],
      asistencia: [['Ver Preceptoría','¿Quiénes son los preceptores?'],['Consultar horario','¿Cuál es el horario escolar?']],
      'familias-seguimiento': [['Ver equipo','¿Quién integra el equipo institucional?'],['Consultar SAGE','No puedo entrar a SAGE']]
    }[intentId] || [];
    if (!related.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'clarifications related';
    related.forEach(([label, question]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => submit(question));
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
      conversation.lastIntent = match.id;
      conversation.lastFlow = match.flow || null;
      const bubble = addMessage(match.html, 'assistant', match.title);
      addActions(bubble, match.actions);
      if (match.flow) addFlowButtons(bubble, match.flow);
      addRelatedSuggestions(bubble, match.id);
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
    'Hola. Soy <strong>Benito IA</strong>, el asistente virtual de la Escuela Secundaria N.º 31 “Benito Juárez”.<br><br>Puedo orientarte con información institucional publicada sobre trámites, horarios, autoridades, Aula Digital, SAGE, becas, asistencia, trayectorias, actividades y servicios. ¿Qué necesitás saber?',
    'assistant',
    'Bienvenido'
  );
  input.focus();
}());
  if (initialQuery && input) {
    input.value = initialQuery;
    window.setTimeout(() => submit(initialQuery), 250);
  }

