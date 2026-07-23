window.BenitoNetworkStatus=(function(){
  const listeners=[];
  function status(){return navigator.onLine?'online':'offline'}
  function notify(){listeners.forEach(fn=>fn(status()))}
  window.addEventListener('online',notify);
  window.addEventListener('offline',notify);
  function subscribe(fn){listeners.push(fn);fn(status())}
  return{status,subscribe};
})();