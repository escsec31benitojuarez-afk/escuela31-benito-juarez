window.BenitoUsageLimiter=(function(){
  const KEY='benitoIA_v24_usage';
  function today(){return new Date().toISOString().slice(0,10)}
  function state(){
    try{
      const s=JSON.parse(localStorage.getItem(KEY)||'{}');
      return s.date===today()?s:{date:today(),count:0};
    }catch(e){return{date:today(),count:0}}
  }
  function canUse(){
    const s=state(),limit=window.BENITO_IA_CONFIG.pilot.dailyInteractionLimit||50;
    return{allowed:s.count<limit,count:s.count,limit,remaining:Math.max(0,limit-s.count)}
  }
  function increment(){
    const s=state();s.count++;localStorage.setItem(KEY,JSON.stringify(s));return canUse()
  }
  function reset(){localStorage.removeItem(KEY)}
  return{canUse,increment,reset};
})();