(function(){
  const STAGING=true;
  if(!STAGING)return;
  const base='./benito-ia/';
  const styles=['benito-ia.css'];
  const scripts=[
    'config.js',
    'knowledge/index.js',
    'rag/rag-index.js',
    'rag/retriever.js',
    'rag/grounded-answer.js',
    'rag/policy-engine.js',
    'pilot/feature-flags.js',
    'pilot/usage-limiter.js',
    'pilot/feedback.js',
    'telemetry/telemetry.js',
    'offline/network-status.js',
    'accessibility/a11y.js',
    'pilot/pilot-ui.js',
    'providers/rag-local-provider.js',
    'api/request-builder.js',
    'api/response-validator.js',
    'providers/iag-simulation-provider.js',
    'providers/iag-external-provider.js',
    'logging/audit-log.js',
    'providers/hybrid-provider.js',
    'providers/local-provider.js',
    'ui/app.js'
  ];
  styles.forEach(file=>{
    const l=document.createElement('link');l.rel='stylesheet';l.href=base+file;document.head.appendChild(l);
  });
  let chain=Promise.resolve();
  scripts.forEach(file=>{
    chain=chain.then(()=>new Promise((resolve,reject)=>{
      const s=document.createElement('script');s.src=base+file;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);
    }));
  });
})();