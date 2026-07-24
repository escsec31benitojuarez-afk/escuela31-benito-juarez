window.BenitoRTIStore=(function(){
 const KEY='benito_rti_state_v1';
 function clone(x){return JSON.parse(JSON.stringify(x))}
 function load(){
  try{const saved=localStorage.getItem(KEY);if(saved)return JSON.parse(saved)}catch(e){}
  return clone(window.BENITO_RTI_DATA);
 }
 function save(state){localStorage.setItem(KEY,JSON.stringify(state));return state}
 function reset(){localStorage.removeItem(KEY);return load()}
 function updateTask(id,status){
  const s=load(),t=s.tasks.find(x=>x.id===id);if(t)t.status=status;save(s);return s;
 }
 function addMemory(entry){
  const s=load();s.memory.unshift({...entry,date:entry.date||new Date().toISOString().slice(0,10)});save(s);return s;
 }
 return{load,save,reset,updateTask,addMemory};
})();