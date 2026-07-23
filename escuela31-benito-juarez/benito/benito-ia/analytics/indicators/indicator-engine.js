window.BenitoIndicators=(function(){
 const round=(n,d=1)=>Number(n.toFixed(d));
 function weightedAverage(rows,valueKey,weightKey='students'){
  const total=rows.reduce((s,r)=>s+(Number(r[weightKey])||0),0);
  return total?rows.reduce((s,r)=>s+(Number(r[valueKey])||0)*(Number(r[weightKey])||0),0)/total:0;
 }
 function institutional(data){
  const c=data.courses||[],totalStudents=c.reduce((s,r)=>s+r.students,0);
  return{
   totalCourses:c.length,
   totalStudents,
   attendance:round(weightedAverage(c,'attendance')),
   failureRate:round(weightedAverage(c,'failure_rate')),
   threePlus:c.reduce((s,r)=>s+r.three_plus,0),
   fivePlus:c.reduce((s,r)=>s+r.five_plus,0)
  };
 }
 function byCycle(data){
  const groups={};
  (data.courses||[]).forEach(r=>(groups[r.cycle]??=[]).push(r));
  return Object.entries(groups).map(([cycle,rows])=>{
   const total=rows.reduce((s,r)=>s+r.students,0);
   return{
    cycle,courses:rows.length,students:total,
    attendance:round(weightedAverage(rows,'attendance')),
    failureRate:round(weightedAverage(rows,'failure_rate')),
    threePlus:rows.reduce((s,r)=>s+r.three_plus,0),
    fivePlus:rows.reduce((s,r)=>s+r.five_plus,0)
   };
  });
 }
 function courseRisk(data,thresholds){
  return (data.courses||[]).map(r=>{
   let level='stable',score=0,reasons=[];
   if(r.failure_rate>=thresholds.criticalFailureRate){score+=2;reasons.push('desaprobación crítica')}
   else if(r.failure_rate>=thresholds.warningFailureRate){score+=1;reasons.push('desaprobación en alerta')}
   if(r.attendance<thresholds.criticalAttendanceRate){score+=2;reasons.push('asistencia crítica')}
   else if(r.attendance<thresholds.warningAttendanceRate){score+=1;reasons.push('asistencia en alerta')}
   if(r.five_plus>=4){score+=2;reasons.push('alta concentración de 5+ pendientes')}
   else if(r.three_plus>=6){score+=1;reasons.push('concentración de 3+ pendientes')}
   if(score>=5)level='critical';else if(score>=2)level='warning';
   return{...r,score,level,reasons};
  }).sort((a,b)=>b.score-a.score||b.failure_rate-a.failure_rate);
 }
 function subjectIndicators(data){
  return (data.subjects||[]).map(r=>({...r,rate:round(r.failed/r.enrolled*100)})).sort((a,b)=>b.rate-a.rate);
 }
 function trend(data){
  const p=data.periods||[]; if(p.length<2)return null;
  const a=p[p.length-2],b=p[p.length-1];
  return{
   from:a.period,to:b.period,
   attendanceChange:round(b.attendance-a.attendance),
   failureRateChange:round(b.failure_rate-a.failure_rate),
   threePlusChange:b.three_plus-a.three_plus,
   fivePlusChange:b.five_plus-a.five_plus
  };
 }
 return{institutional,byCycle,courseRisk,subjectIndicators,trend};
})();