window.BenitoRAGRetriever=(function(){
  const STOP=new Set(['para','como','este','esta','estos','estas','desde','hasta','sobre','entre','donde','cuando','porque','por','con','sin','del','las','los','una','uno','unos','unas','que','sus','mas','muy','ser','son','en','el','la','y','o','de','al']);
  const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñü\s]/g,' ').replace(/\s+/g,' ').trim();
  const tokens=s=>normalize(s).split(' ').filter(w=>w.length>2&&!STOP.has(w));

  function score(query,chunk,options={}){
    const q=tokens(query), set=new Set(chunk.tokens||[]);
    let score=0;
    q.forEach(t=>{
      if(set.has(t))score+=4;
      if(normalize(chunk.title).includes(t))score+=4;
      if((chunk.keywords||[]).some(k=>normalize(k).includes(t)))score+=3;
    });
    const phrase=normalize(query);
    if(normalize(chunk.text).includes(phrase))score+=14;
    if(normalize(chunk.title).includes(phrase))score+=18;
    if(options.profile&&(chunk.audiences||[]).includes(options.profile))score+=3;
    if(options.module&&chunk.module===options.module)score+=2;
    if(chunk.validation==='validado')score+=5;
    else score-=3;
    score+=(chunk.sourcePriority||1);
    if(chunk.sensitivity!=='public')score-=20;
    return score;
  }

  function search(query,options={}){
    const data=window.BENITO_RAG_INDEX||{chunks:[]};
    return data.chunks.map(chunk=>({chunk,score:score(query,chunk,options)}))
      .filter(x=>x.score>0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,options.limit||5);
  }

  function confidence(results){
    if(!results.length)return {level:'sin evidencia',value:0};
    const top=results[0].score;
    const validated=results.filter(x=>x.chunk.validation==='validado').length;
    let value=Math.min(100,Math.round(top*4+validated*6));
    let level=value>=75?'alta':value>=48?'media':value>=25?'baja':'sin evidencia';
    return {level,value};
  }

  return{search,confidence,normalize,tokens};
})();