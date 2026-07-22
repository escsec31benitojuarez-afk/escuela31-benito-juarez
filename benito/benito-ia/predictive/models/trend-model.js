window.BenitoTrendModel=(function(){
 function groupByCourse(series){
  const g={};series.forEach(r=>(g[r.course]??=[]).push(r));Object.values(g).forEach(a=>a.sort((x,y)=>x.order-y.order));return g;
 }
 function slope(rows,key){
  const n=rows.length;if(n<2)return 0;
  const xs=rows.map(r=>r.order),ys=rows.map(r=>Number(r[key]));
  const mx=xs.reduce((a,b)=>a+b,0)/n,my=ys.reduce((a,b)=>a+b,0)/n;
  const num=xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0),den=xs.reduce((s,x)=>s+(x-mx)**2,0);
  return den?num/den:0;
 }
 function clamp(x,min=0,max=100){return Math.max(min,Math.min(max,x))}
 function forecastCourse(rows,horizon=2){
  const last=rows[rows.length-1],metrics=['attendance','failure_rate','engagement','digital_use'];
  const slopes={},forecast={};
  metrics.forEach(k=>{slopes[k]=slope(rows,k);forecast[k]=clamp(last[k]+slopes[k]*horizon)});
  const volatility=metrics.reduce((s,k)=>s+Math.abs(slopes[k]),0)/metrics.length;
  const confidence=Math.max(.55,Math.min(.92,.9-volatility/35));
  let direction='stable';
  const riskDelta=(forecast.failure_rate-last.failure_rate)+(last.attendance-forecast.attendance)+(last.engagement-forecast.engagement);
  if(riskDelta>=8)direction='worsening';else if(riskDelta<=-8)direction='improving';
  return{course:last.course,cycle:last.cycle,last,slopes,forecast,horizon,confidence,direction,riskDelta};
 }
 function forecastAll(data,horizon=2){
  const groups=groupByCourse(data.series||[]);
  return Object.values(groups).map(rows=>forecastCourse(rows,horizon)).sort((a,b)=>b.riskDelta-a.riskDelta);
 }
 return{groupByCourse,slope,forecastCourse,forecastAll};
})();