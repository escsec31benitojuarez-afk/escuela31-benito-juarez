window.BenitoAuth=(function(){
  'use strict';
  const SESSION_KEY='benitoIA_session_v6';
  const FAILED_KEY='benitoIA_failed_logins_v6';
  const now=()=>Date.now();
  const cfg=()=>BENITO_IA_CONFIG.security;
  const users=()=>BENITO_DEMO_USERS.users||[];
  const role=id=>(BENITO_ROLES.roles||[]).find(r=>r.id===id);

  function readJSON(storage,key,fallback){
    try{return JSON.parse(storage.getItem(key)||JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function writeJSON(storage,key,value){
    try{storage.setItem(key,JSON.stringify(value));return true;}
    catch(e){return false;}
  }
  function failed(){return readJSON(localStorage,FAILED_KEY,{});}
  function saveSession(session){
    // localStorage mantiene la sesión al navegar entre archivos HTML en GitHub Pages.
    // Solo se almacenan datos de demostración, nunca datos personales reales.
    writeJSON(localStorage,SESSION_KEY,session);
    // Compatibilidad con versiones previas abiertas en la misma pestaña.
    try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(session));}catch(e){}
  }
  function clearSession(){
    try{localStorage.removeItem(SESSION_KEY);}catch(e){}
    try{sessionStorage.removeItem(SESSION_KEY);}catch(e){}
    try{sessionStorage.removeItem('benitoIA_v40_session');}catch(e){}
  }
  function login(username,password){
    if(cfg().privateAreaEnabled===false){
      clearSession();
      return{ok:false,error:'La plataforma institucional se encuentra en preparación.'};
    }
    username=String(username||'').trim();
    const attempts=failed();
    const blocked=attempts[username];
    if(blocked&&blocked.count>=cfg().maxFailedAttempts){
      return{ok:false,error:'Acceso temporalmente bloqueado. Borrá los datos del sitio o utilizá otro navegador para reiniciar la demostración.'};
    }
    const user=users().find(x=>x.username===username&&x.active);
    if(!user||user.passwordDemo!==password){
      const item=attempts[username]||{count:0};
      item.count+=1;item.lastAttempt=now();attempts[username]=item;
      writeJSON(localStorage,FAILED_KEY,attempts);
      BenitoSecurityAudit.log('login_failed',{resource:'login',outcome:'denied',reason:'invalid_credentials'});
      return{ok:false,error:'Credenciales incorrectas.'};
    }
    delete attempts[username];writeJSON(localStorage,FAILED_KEY,attempts);
    const session={
      id:'session-'+now(),userId:user.id,displayName:user.displayName,
      availableProfiles:user.availableProfiles,activeProfile:user.defaultProfile,
      createdAt:now(),lastActivity:now(),expiresAt:now()+cfg().sessionTimeoutMinutes*60000,
      demo:true,version:6
    };
    saveSession(session);
    BenitoSecurityAudit.log('login_success',{userId:user.id,profile:session.activeProfile,resource:'login'});
    return{ok:true,session};
  }
  function getSession(){
    if(cfg().privateAreaEnabled===false){clearSession();return null;}
    let session=readJSON(localStorage,SESSION_KEY,null);
    if(!session){
      session=readJSON(sessionStorage,SESSION_KEY,null)||readJSON(sessionStorage,'benitoIA_v40_session',null);
      if(session)saveSession(session);
    }
    if(!session)return null;
    if(!session.expiresAt||now()>session.expiresAt){clearSession();return null;}
    if(!users().some(u=>u.id===session.userId&&u.active)){clearSession();return null;}
    return session;
  }
  function touch(){
    const session=getSession();if(!session)return null;
    session.lastActivity=now();session.expiresAt=now()+cfg().sessionTimeoutMinutes*60000;
    saveSession(session);return session;
  }
  function switchProfile(profileId){
    const session=getSession();
    if(!session||!session.availableProfiles.includes(profileId)||!role(profileId))return{ok:false};
    session.activeProfile=profileId;session.expiresAt=now()+cfg().sessionTimeoutMinutes*60000;
    saveSession(session);
    BenitoSecurityAudit.log('profile_switched',{userId:session.userId,profile:profileId});
    return{ok:true,session};
  }
  function logout(){
    const session=getSession();
    if(session)BenitoSecurityAudit.log('logout',{userId:session.userId,profile:session.activeProfile});
    clearSession();
  }
  return{login,getSession,touch,switchProfile,logout,currentRole:()=>{const s=getSession();return role(s?s.activeProfile:'public')},role};
})();
