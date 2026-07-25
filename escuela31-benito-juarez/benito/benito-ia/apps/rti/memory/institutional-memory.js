window.BenitoInstitutionalMemory=(function(){
 function normalize(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
 function search(entries,query){
  const q=normalize(query).split(/\s+/).filter(Boolean);
  return entries.map(e=>{
   const text=normalize(`${e.title} ${e.detail} ${e.type} ${e.date}`);
   const score=q.reduce((s,w)=>s+(text.includes(w)?1:0),0);
   return{...e,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||b.date.localeCompare(a.date));
 }
 return{search};
})();