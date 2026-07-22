# Fase 8 — RAG local y preparación para IAG

## Capacidades incorporadas

- Índice documental fragmentado.
- Recuperación léxica ponderada.
- Priorización de contenidos validados.
- Cálculo orientativo de confianza.
- Fuentes visibles en cada respuesta.
- Evidencias recuperadas por fragmento.
- Políticas de privacidad y derivación humana.
- Proveedor RAG separado de la interfaz.
- Laboratorio de pruebas independiente.

## Archivos principales

- `rag-lab.html`: laboratorio de consultas.
- `benito-ia/rag/rag-index.json`: índice documental.
- `benito-ia/rag/retriever.js`: recuperación.
- `benito-ia/rag/grounded-answer.js`: respuestas fundamentadas.
- `benito-ia/rag/policy-engine.js`: privacidad y derivación.
- `benito-ia/providers/rag-local-provider.js`: proveedor RAG.

## Alcance

Esta fase no utiliza todavía embeddings, base vectorial ni API externa. Simula el flujo RAG de forma local y auditable para validar la arquitectura, el conocimiento y la experiencia de usuario antes de incorporar una IAG real.
