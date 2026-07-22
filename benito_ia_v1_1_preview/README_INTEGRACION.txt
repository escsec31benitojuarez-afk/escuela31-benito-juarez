BENITO IA v1.1 · ENTORNO DE PRUEBA

1. Abrir index.html para evaluar el asistente sin modificar el sitio público.
2. Archivos del componente:
   - benito-ia/config.js
   - benito-ia/conocimiento.js
   - benito-ia/benito-ia.css
   - benito-ia/benito-ia.js
3. Cuando la versión sea aprobada, copiar la carpeta benito-ia al sitio.
4. Agregar dentro de <head>:
   <link rel="stylesheet" href="benito-ia/benito-ia.css">
5. Agregar antes de </body>, en este orden:
   <script src="benito-ia/config.js"></script>
   <script src="benito-ia/conocimiento.js"></script>
   <script src="benito-ia/benito-ia.js"></script>

No usa API ni servicios externos. Funciona como MVP local y estable.
