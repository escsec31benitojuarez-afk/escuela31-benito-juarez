(function () {
  'use strict';

  const messages = document.getElementById('messages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('question');

  const NORMALIZATION_ALIASES = [
    [/\b(?:wsp|wasap|guasap)\b/g, 'whatsapp'],
    [/\b(?:cole|colegio)\b/g, 'escuela'],
    [/\bsecre\b/g, 'secretaria'],
    [/\bprece\b/g, 'preceptor'],
    [/\bcompus?\b/g, 'computadora'],
    [/\bbiblio\b/g, 'biblioteca'],
    [/\b(?:face|fb)\b/g, 'facebook'],
    [/\bprogre\b/g, 'progresar'],
    [/\bprogresa(?:l)?\b/g, 'progresar'],
    [/\bnene\b/g, 'hijo'],
    [/\bnena\b/g, 'hija'],
    [/\bmatricular\b/g, 'inscribir'],
    [/\bubicasion\b/g, 'ubicacion'],
    [/\bequivalensias\b/g, 'equivalencias'],
    [/\bconstansia\b/g, 'constancia'],
    [/\bdijital\b/g, 'digital'],
    [/\binasistensias\b/g, 'inasistencias'],
    [/\bsaje\b/g, 'sage'],
    [/\bactividaddes\b/g, 'actividades'],
    [/\bpreseptoria\b/g, 'preceptoria']
  ];

  const CONVERSATIONAL_FILLERS = [
    /\b(?:che|bueno|mira|disculpa|disculpe)\b/g,
    /\bpor favor\b/g,
    /\bsi no es molestia\b/g,
    /\bcuando puedas\b/g,
    /\b(?:queria|quisiera) consultar\b/g,
    /\bmi consulta es la siguiente\b/g,
    /\ben realidad\b/g,
    /\bte cuento\b/g
  ];

  const normalize = (value) => {
    let normalized = String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9ñ\s]/g, ' ')
      .replace(/([a-zñ])\1{2,}/g, '$1');
    CONVERSATIONAL_FILLERS.forEach((pattern) => {
      normalized = normalized.replace(pattern, ' ');
    });
    NORMALIZATION_ALIASES.forEach(([pattern, replacement]) => {
      normalized = normalized.replace(pattern, replacement);
    });
    return normalized.replace(/\s+/g, ' ').trim();
  };

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));

  const STOP_WORDS = new Set(['a','al','algo','como','con','cual','cuando','de','del','decir','donde','el','en','es','esta','favor','hay','informacion','la','las','lo','los','me','mi','necesito','para','por','podes','podrias','que','quiero','saber','se','si','sobre','un','una','y']);

  function tokens(text) {
    return normalize(text).split(' ').filter((token) => token.length > 1 && !STOP_WORDS.has(token));
  }

  function tokenVariants(token) {
    const variants = new Set([token]);
    if (token.length > 4 && token.endsWith('s')) variants.add(token.slice(0, -1));
    if (token.length > 5 && token.endsWith('es')) variants.add(token.slice(0, -2));
    return variants;
  }

  function sameToken(a, b) {
    const variantsA = tokenVariants(a);
    return [...tokenVariants(b)].some((variant) => variantsA.has(variant));
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

  function fuzzyTokenWeight(a, b) {
    if (a.length < 4 || b.length < 4) return 0;
    let bestDistance = Infinity;
    let longest = 0;
    tokenVariants(a).forEach((variantA) => {
      tokenVariants(b).forEach((variantB) => {
        bestDistance = Math.min(bestDistance, levenshtein(variantA, variantB));
        longest = Math.max(longest, variantA.length, variantB.length);
      });
    });
    if (bestDistance === 1 && longest >= 6) return 4;
    if (bestDistance <= (longest >= 8 ? 2 : 1)) return 2;
    return 0;
  }

  const knowledge = window.BENITO_CONOCIMIENTO || [];
  const flows = window.BENITO_FLUJOS || {};
  const portalTopics = window.BENITO_PORTAL_INTELIGENTE || {};

  const conversation = {
    lastIntent: null,
    lastFlow: null,
    lastAnswer: null,
    pendingFlow: null
  };

  function flowAnswer(flowName, option) {
    if (!option) return null;
    return {
      id: option.id || `${flowName}-detalle`,
      title: option.title,
      html: option.html,
      actions: option.actions || [],
      followUps: option.followUps || [],
      contextIntent: flowName,
      contextFlow: flowName
    };
  }

  function explicitFlowAnswer(question, preferredFlow = '') {
    const text = normalize(question);
    if (!text || /\bo\b/.test(text)) return null;

    const availableFlows = preferredFlow && flows[preferredFlow]
      ? [[preferredFlow, flows[preferredFlow]]]
      : Object.entries(flows);
    const candidates = availableFlows.flatMap(([flowName, options]) =>
      options.map((option) => ({
        flowName,
        option,
        rank: rankItem(option, text, preferredFlow === flowName ? flowName : '')
      }))
    ).filter((candidate) => candidate.rank.hasEvidence);

    candidates.sort(compareRanks);
    const best = candidates[0];
    const second = candidates[1];
    if (!best || best.rank.score < (preferredFlow ? 8 : 18)) return null;
    if (second && best.rank.score === second.rank.score &&
        best.rank.strongEvidence === second.rank.strongEvidence) return null;
    return flowAnswer(best.flowName, best.option);
  }

  function isNegated(text, expression) {
    return new RegExp(
      `\\b(?:no|tampoco)\\s+` +
      `(?:(?:quiero|necesito|busco)\\s+)?` +
      `(?:hablar\\s+con\\s+)?` +
      `(?:(?:informacion|datos)\\s+(?:sobre|de)\\s+)?` +
      `(?:(?:es\\s+)?por\\s+)?` +
      `(?:(?:el|la|los|las|un|una)\\s+)?(?:${expression})\\b`
    ).test(text);
  }

  function hasActiveTerm(text, expression) {
    return new RegExp(`\\b(?:${expression})\\b`).test(text) && !isNegated(text, expression);
  }

  function withoutNegatedTopics(text) {
    return text.replace(
      /\b(?:no|tampoco)\s+(?:(?:quiero|necesito|busco)\s+)?(?:hablar\s+con\s+)?(?:(?:informacion|datos)\s+(?:sobre|de)\s+)?(?:(?:es\s+)?por\s+)?(?:(?:el|la|los|las|un|una)\s+)?(?:sage|becas?|progresar|pase|traslado|aula digital|secretaria|preceptoria|producciones?|recursos?|horarios?)\b/g,
      ' '
    ).replace(/\s+/g, ' ').trim();
  }

  function clarificationFor(question) {
    const text = normalize(question);
    if (!text) return null;

    const topicSignals = [
      { id: 'becas', pattern: 'beca|becas|progresar|becario', label: 'Becas', question: 'Necesito información sobre becas' },
      { id: 'inscripcion', pattern: 'inscripcion|inscribir|anotar|matricula', label: 'Inscripción', question: 'Quiero inscribirme en la escuela' },
      { id: 'sage', pattern: 'sage', label: 'SAGE', question: 'Necesito ayuda con SAGE' },
      { id: 'aula', pattern: 'aula digital|tareas|apuntes|materiales', label: 'Aula Digital', question: 'Necesito acceder al Aula Digital' },
      { id: 'pase', pattern: 'pase|traslado|transferencia', label: 'Pase', question: 'Necesito información sobre un pase' }
    ];
    const mentionedTopics = topicSignals.filter(({ pattern }) => hasActiveTerm(text, pattern));
    if (/\bo\b/.test(text) && mentionedTopics.length > 1) {
      return {
        id: 'opciones',
        title: 'Necesito que elijas una opción',
        html: 'Mencionaste más de una gestión. ¿Sobre cuál querés consultar primero?',
        options: mentionedTopics.map(({ label, question: optionQuestion }) => [label, optionQuestion])
      };
    }

    if (/^(?:horario|horarios)$/.test(text)) {
      return {
        id: 'horario',
        title: '¿Qué horario necesitás?',
        html: 'Podés consultar el horario escolar o el horario de un área o integrante del equipo.',
        options: [
          ['Horario escolar', '¿Cuál es el horario de entrada y salida?'],
          ['Preceptoría', '¿Cuál es el horario de Preceptoría?'],
          ['Asesoría', '¿Cuál es el horario de la asesora pedagógica?'],
          ['RTI', '¿Cuál es el horario del RTI?']
        ]
      };
    }

    if (/\b(?:no puedo|no logro|quiero)\s+(?:entrar|ingresar|acceder)\b/.test(text) &&
        !/\b(?:sage|aula|portal|plataforma|facebook|primer|primero|1|escuela|inscripcion)\b/.test(text)) {
      return {
        id: 'acceso',
        title: '¿A qué necesitás ingresar?',
        html: 'Indicame si el problema es con SAGE, el Aula Digital u otro espacio del Portal.',
        options: [
          ['SAGE', 'No puedo entrar a SAGE'],
          ['Aula Digital', 'Necesito acceder al Aula Digital'],
          ['Contacto', 'Necesito comunicarme con la escuela']
        ]
      };
    }

    if (/\b(?:papel|documento|documentacion|presentar|tramite)\b/.test(text) &&
        !/\b(?:constancia|certificado|analitico|titulo|pase|inscripcion|equivalencia|alumno regular|escolaridad)\b/.test(text)) {
      return {
        id: 'documentacion',
        title: '¿De qué trámite se trata?',
        html: 'Decime qué documento necesitás o para qué gestión te lo solicitaron, así evito indicarte requisitos incorrectos.',
        options: [
          ['Constancia', 'Necesito una constancia de alumno regular'],
          ['Pase', 'Necesito pedir un pase'],
          ['Inscripción', 'Quiero inscribirme en la escuela'],
          ['Título o analítico', 'Necesito retirar mi título o analítico']
        ]
      };
    }

    if (/\b(?:hablar|comunicarme)\b/.test(text) &&
        /\b(?:alguien|persona)\b/.test(text)) {
      return {
        id: 'persona',
        title: '¿Con qué tema necesitás ayuda?',
        html: 'Puedo orientarte hacia Secretaría, Preceptoría, Tutoría u otro integrante del equipo.',
        options: [
          ['Secretaría', 'Necesito hablar con Secretaría'],
          ['Preceptoría', 'Necesito hablar con un preceptor'],
          ['Tutoría', 'Quiero hablar con un tutor'],
          ['Contacto general', '¿Cómo me comunico con la escuela?']
        ]
      };
    }

    if (/^(?:como hago|que hago|y ahora que|no se que hacer)$/.test(text)) {
      return {
        id: 'general',
        title: 'Necesito un poco más de información',
        html: 'Contame en una frase qué querés resolver: un trámite, un acceso, una materia, un horario o una consulta institucional.'
      };
    }
    return null;
  }

  function directIntent(question) {
    const text = normalize(question);
    if (/^benito$/.test(text) ||
        /\b(?:como te llamas|cual es tu nombre|quien sos|quien eres|decime tu nombre|nombre del asistente|presentate)\b/.test(text)) return 'identidad';
    if (/\b(?:que hace benito|que podes hacer|en que ayudas|en que me podes ayudar|para que servis)\b/.test(text)) return 'saludo';
    if (/\b(?:guardas|almacenas|recordas|memoria|conversaciones?)\b/.test(text) ||
        (/\bpreguntas?\b/.test(text) && /\b(?:ayer|anteriores?|otras?)\b/.test(text))) return 'privacidad-chat';
    if ((/\b(?:contraseña|contrasena|clave|credenciales?)\b/.test(text) &&
         /\b(?:plataforma|privada|cuenta|acceso)\b/.test(text)) ||
        (/\b(?:entrar|ingresar|acceder)\b/.test(text) &&
         /\b(?:sage|plataforma|cuenta)\b/.test(text) &&
         /\bpor mi\b/.test(text))) return 'seguridad-accesos';
    if (/\b(legajo|datos personales)\b/.test(text) ||
        /\b(?:informacion|datos)\s+(?:personales?\s+)?(?:sobre|de)\s+(?:un|una|otro|otra)\s+(?:alumno|alumna|estudiante)\b/.test(text) ||
        (/\b(?:mi hijo|mi hija|un alumno|una alumna|un estudiante|una estudiante|otro alumno|otra alumna|otro estudiante|otra estudiante)\b/.test(text) &&
         /\b(notas|calificaciones|faltas|inasistencias|asistencia|datos)\b/.test(text))) return 'privacidad';
    if ((/\b(?:cambiar|cambiarlo|cambiarla|cambiarme)\b/.test(text) &&
         /\b(?:escuela|colegio|institucion)\b/.test(text)) ||
        (/\b(?:retirar|sacar)\b/.test(text) &&
         /\b(?:definitivamente|otra escuela|otro colegio|otra institucion)\b/.test(text))) return 'pase';
    if (/\b(?:retirar|retiro|buscar|sacar)\b/.test(text) &&
        /\b(?:mi hijo|mi hija|al hijo|a la hija|al alumno|a la alumna|al estudiante|a la estudiante)\b/.test(text) &&
        !/\b(?:titulo|analitico|diploma|documentacion)\b/.test(text)) return 'retiro-estudiante';
    if (/\b(?:retirarlo|retirarla|buscarlo|buscarla)\b/.test(text) &&
        !/\b(?:titulo|analitico|diploma|documentacion)\b/.test(text)) return 'retiro-estudiante';
    if (hasActiveTerm(text, 'sage')) return 'sage';
    if (/\b(constancia|certificado)\b/.test(text) && /\b(alumno|regular|escolar)\b/.test(text)) return 'certificados';
    if (hasActiveTerm(text, 'pase|traslado|transferencia')) return 'pase';
    if (hasActiveTerm(text, 'beca|becas|progresar|becario')) return 'becas';
    if (/\b(inscripcion|inscribir|inscribirme|inscribirse|anotar|anotarme|matricula)\b/.test(text)) return 'inscripcion';
    if (/\b(?:ingresar|entrar)\b/.test(text) && /\b(?:primer|primero|1|escuela)\b/.test(text)) return 'inscripcion';
    if (/\bequivalencias?\b/.test(text) || /\breconocen?\b.*\bmaterias?\b/.test(text)) return 'equivalencias';
    if (/\b(inasistencia|inasistencias|justificar|falta|faltas)\b/.test(text)) return 'asistencia';
    if (hasActiveTerm(text, 'preceptor|preceptores|preceptoria')) return 'preceptoria';
    const specificArea = /\b(?:secretaria|preceptor|preceptores|preceptoria|asesora|asesoria|tutor|tutoria|rti|rector|rectoria|administracion)\b/.test(text);
    const contactChannel = /\b(?:telefono|telefonicamente|celular|numero|whatsapp|correo|mail|email|llamar)\b/.test(text);
    const schoolContact = /\b(?:comunicarme|comunicarse|comunicar|contactar|llamar|hablar)\b/.test(text) &&
      /\b(?:escuela|secundaria|colegio)\b/.test(text);
    if (!specificArea && (contactChannel || schoolContact ||
        /^(?:contacto|telefono|telefonicamente|celular|numero|whatsapp|correo|mail|email|llamar)$/.test(text))) return 'contacto';
    if (/\b(?:recursos?|tecnicas?)\b.*\b(?:estudiar|estudio|aprender)\b/.test(text)) return 'recursos-estudio';
    if (/\b(?:actividad|actividades|material|materiales|tareas|apuntes)\b/.test(text) &&
        /\b(?:curso|año)\b/.test(text)) return 'aula-digital';
    if (/\b(?:actividad|actividades|trabajo|trabajos|tarea|tareas|consigna|consignas)\b/.test(text) &&
        /\b(?:profe|profesor|profesora|docente|clase)\b/.test(text)) return 'aula-digital';
    if (hasActiveTerm(text, 'actividad|actividades|produccion|producciones') &&
        !/\b(?:subir|cargar|publicar|agregar)\b/.test(text)) return 'actividades';
    if (!/^(?:horario|horarios)$/.test(text) && hasActiveTerm(text, 'horario|horarios')) return 'horario-clases';
    if (/\borientacion\b/.test(text) &&
        !/\b(?:orientador|persona|quien|nombre|horario)\b/.test(text)) return 'datos-institucionales';
    if (/\bescuela virtual\b/.test(text)) return 'aula-digital';
    if (/\baula digital\b/.test(text)) return 'aula-digital';
    if (text === 'proyectos' ||
        /\b(?:planes|proyectos) institucionales?\b/.test(text) ||
        (/\b(?:planes|proyectos)\b/.test(text) && /\bescuela\b/.test(text))) return 'programas';
    if (/\b(?:me lleve|me quedo)\b.*\b(?:materia|matematica|lengua|fisica|quimica)\b/.test(text)) return 'materias-previas';
    if (/\b(analitico|titulo|diploma)\b/.test(text)) return 'analitico-titulo';
    if (/\b(previa|previas|pendiente|pendientes)\b/.test(text)) return 'materias-previas';
    return null;
  }

  function meetsRequired(item, text, queryTokens, contextFlow = '') {
    if (!item.required || !item.required.length) return true;
    const explicitMultiwordMatch = [...(item.phrases || []), ...(item.synonyms || [])]
      .map((value) => normalize(value))
      .some((value) => value.includes(' ') && (text === value || text.includes(value)));
    if (explicitMultiwordMatch) return true;
    return item.required.every((required) => {
      const normalizedRequired = normalize(required);
      return normalizedRequired === normalize(contextFlow) ||
        text.includes(normalizedRequired) ||
        queryTokens.some((token) => sameToken(token, normalizedRequired));
    });
  }

  function rankItem(item, query, contextFlow = '') {
    const text = withoutNegatedTopics(normalize(query));
    const queryTokens = tokens(text);
    if (!meetsRequired(item, text, queryTokens, contextFlow)) {
      return { score: 0, hasEvidence: false, strongEvidence: 0, phraseEvidence: 0, exactKeywords: 0, fuzzyKeywords: 0 };
    }

    let phraseEvidence = 0;
    let exactKeywords = 0;
    let fuzzyKeywords = 0;
    (item.phrases || []).forEach((phrase) => {
      const normalizedPhrase = normalize(phrase);
      if (!normalizedPhrase) return;
      if (text === normalizedPhrase) phraseEvidence += 30;
      else if (text.includes(normalizedPhrase)) phraseEvidence += 18;
    });

    (item.synonyms || []).forEach((synonym) => {
      const normalizedSynonym = normalize(synonym);
      if (!normalizedSynonym) return;
      if (normalizedSynonym.includes(' ')) {
        if (text === normalizedSynonym) phraseEvidence += 24;
        else if (text.includes(normalizedSynonym)) phraseEvidence += 14;
        return;
      }
      if (queryTokens.some((token) => sameToken(token, normalizedSynonym))) exactKeywords += 5;
      else {
        const fuzzyWeight = Math.max(0, ...queryTokens.map((token) => fuzzyTokenWeight(token, normalizedSynonym)));
        fuzzyKeywords += fuzzyWeight;
      }
    });

    (item.keywords || []).forEach((keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (!normalizedKeyword) return;
      if (normalizedKeyword.includes(' ')) {
        if (text.includes(normalizedKeyword)) exactKeywords += 10;
        return;
      }
      if (queryTokens.some((token) => sameToken(token, normalizedKeyword))) exactKeywords += 6;
      else {
        const fuzzyWeight = Math.max(0, ...queryTokens.map((token) => fuzzyTokenWeight(token, normalizedKeyword)));
        fuzzyKeywords += fuzzyWeight;
      }
    });

    const strongEvidence = phraseEvidence + exactKeywords;
    const hasEvidence = strongEvidence > 0 || fuzzyKeywords >= 4;
    const score = hasEvidence
      ? strongEvidence + fuzzyKeywords + (strongEvidence > 0 || fuzzyKeywords >= 4 ? (item.priority || 0) : 0)
      : 0;
    return { score, hasEvidence, strongEvidence, phraseEvidence, exactKeywords, fuzzyKeywords };
  }

  function compareRanks(a, b) {
    return b.rank.score - a.rank.score ||
      b.rank.phraseEvidence - a.rank.phraseEvidence ||
      b.rank.exactKeywords - a.rank.exactKeywords ||
      a.rank.fuzzyKeywords - b.rank.fuzzyKeywords ||
      (b.item ? (b.item.priority || 0) : (b.option.priority || 0)) -
        (a.item ? (a.item.priority || 0) : (a.option.priority || 0));
  }

  function findBestAnswer(question) {
    const text = normalize(question);
    if (!text) return null;
    const ranked = knowledge
      .map((item) => ({ item, rank: rankItem(item, text) }))
      .filter((candidate) => candidate.rank.hasEvidence)
      .sort(compareRanks);

    const best = ranked[0];
    const second = ranked[1];
    if (!best || best.rank.score < 11) return null;
    if (second && best.rank.score === second.rank.score &&
        best.rank.phraseEvidence === second.rank.phraseEvidence &&
        best.rank.exactKeywords === second.rank.exactKeywords) return null;
    return best.item;
  }

  function contextCompatible(routedId) {
    if (!routedId) return true;
    if (routedId === conversation.lastIntent || routedId === conversation.lastFlow) return true;
    const sageFamily = new Set(['sage', 'certificados']);
    return sageFamily.has(routedId) && sageFamily.has(conversation.lastIntent);
  }

  function contextualAnswer(question) {
    const text = normalize(question);
    if (!text || !conversation.lastIntent) return null;

    if (conversation.pendingFlow) {
      const pendingMatch = explicitFlowAnswer(question, conversation.pendingFlow);
      if (pendingMatch) return pendingMatch;
    }

    const contextItem = conversation.lastAnswer ||
      knowledge.find((item) => item.id === conversation.lastIntent);
    const followUps = contextItem && contextItem.followUps ? contextItem.followUps : [];
    const rankedFollowUps = followUps
      .map((item) => ({
        item,
        rank: rankItem(item, text, conversation.lastFlow || conversation.lastIntent)
      }))
      .filter((candidate) => candidate.rank.hasEvidence)
      .sort(compareRanks);
    const best = rankedFollowUps[0];
    const second = rankedFollowUps[1];
    if (!best || best.rank.score < 8) return null;
    if (second && best.rank.score === second.rank.score &&
        best.rank.strongEvidence === second.rank.strongEvidence) return null;

    if (best.item.target) {
      return knowledge.find((item) => item.id === best.item.target) || null;
    }
    return {
      ...best.item,
      contextIntent: conversation.lastIntent,
      contextFlow: conversation.lastFlow || null,
      contextSource: contextItem
    };
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
        renderAnswer(flowAnswer(flowName, option));
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

  function addClarificationButtons(bubble, options) {
    const wrap = document.createElement('div');
    wrap.className = 'clarifications';
    (options || [
      ['Trámite o constancia','Necesito hacer un trámite o pedir una constancia'],
      ['Autoridad u horario','Quiero consultar una autoridad o un horario'],
      ['Aula Digital','Necesito acceder al Aula Digital'],
      ['SAGE o calificaciones','Necesito ayuda con SAGE o las calificaciones']
    ]).forEach(([label, question]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => submit(question));
      wrap.appendChild(button);
    });
    bubble.appendChild(wrap);
  }

  function renderAnswer(match) {
    if (match) {
      conversation.lastIntent = match.contextIntent || match.id;
      conversation.lastFlow = match.contextFlow || match.flow || null;
      conversation.lastAnswer = match.contextSource || match;
      conversation.pendingFlow = match.flow || match.contextFlow || null;
      const bubble = addMessage(match.html, 'assistant', match.title);
      addActions(bubble, match.actions);
      if (match.flow) addFlowButtons(bubble, match.flow);
      addRelatedSuggestions(bubble, match.id);
      return true;
    }
    return false;
  }

  function answer(question) {
    const flowMatch = explicitFlowAnswer(question);
    if (renderAnswer(flowMatch)) return;

    const routedId = directIntent(question);
    const contextualMatch = contextualAnswer(question);
    if (contextualMatch && contextCompatible(routedId) && renderAnswer(contextualMatch)) return;

    const routedMatch = routedId
      ? knowledge.find((item) => item.id === routedId)
      : null;
    if (renderAnswer(routedMatch)) return;

    const clarification = clarificationFor(question);
    if (clarification) {
      conversation.pendingFlow = null;
      const clarificationBubble = addMessage(clarification.html, 'assistant', clarification.title);
      addClarificationButtons(clarificationBubble, clarification.options);
      addActions(clarificationBubble, clarification.actions || [['Ver contacto','../contacto.html']]);
      return;
    }

    if (renderAnswer(findBestAnswer(question))) return;

    const fallback = addMessage(
      'No puedo identificar todavía qué información necesitás. Para evitar darte una respuesta incorrecta, elegí una opción o reformulá la consulta con un poco más de detalle.',
      'assistant',
      'Necesito precisar la consulta'
    );
    addClarificationButtons(fallback);
    addActions(fallback, [['Ver contacto','../contacto.html']]);
  }

  function answerTopic(topic) {
    const normalizedTopic = normalize(topic);
    const intentByTopic = {
      constancia: 'certificados',
      sage: 'sage',
      becas: 'becas',
      pase: 'pase'
    };
    const routedId = intentByTopic[normalizedTopic];
    if (routedId) {
      renderAnswer(knowledge.find((item) => item.id === routedId));
      return;
    }

    const portalTopic = portalTopics[normalizedTopic];
    if (portalTopic) {
      renderAnswer({
        id: normalizedTopic,
        title: portalTopic.titulo,
        html: portalTopic.resumen,
        actions: portalTopic.url ? [['Abrir documento', portalTopic.url]] : []
      });
    }
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
    'Hola. Soy <strong>Benito IA</strong>, el asistente virtual de la Escuela Secundaria Nº 31 “Benito Juárez”.<br><br>Puedo orientarte con información institucional publicada sobre trámites, horarios, autoridades, Aula Digital, SAGE, becas, asistencia, trayectorias, actividades y servicios. ¿Qué necesitás saber?',
    'assistant',
    'Bienvenido'
  );
  const initialTopic = new URLSearchParams(window.location.search || '').get('tema');
  if (initialTopic) window.setTimeout(() => answerTopic(initialTopic), 0);
  input.focus();
}());
