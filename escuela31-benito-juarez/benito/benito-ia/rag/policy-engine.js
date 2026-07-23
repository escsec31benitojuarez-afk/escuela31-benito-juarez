window.BenitoPolicyEngine=(function(){
  const personal=/\b(dni|documento|contraseña|clave|domicilio particular|telefono personal|historia clinica|diagnostico|legajo individual)\b/i;
  const highRisk=/\b(expulsar|sancion disciplinaria|denuncia|violencia|abuso|autolesion|suicidio|emergencia medica)\b/i;

  function inspect(query){
    if(personal.test(query))return{
      allowed:false,
      type:'privacy',
      message:'No puedo solicitar ni procesar datos personales o sensibles. Para una situación individual, comunicate por los canales institucionales.'
    };
    if(highRisk.test(query))return{
      allowed:false,
      type:'human-escalation',
      message:'Esta consulta requiere intervención humana y no debe resolverse solamente mediante el asistente. Comunicate de inmediato con el equipo institucional o con el servicio correspondiente.'
    };
    return{allowed:true};
  }

  return{inspect};
})();