(function() {
    'use strict';
    
    const allowedDomains = [
      '648kk.codeberg.page',
      'ejkstudio.codeberg.page'
    ];
    
    function isInIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }
    
    function isAllowedDomain() {
      try {
        const parentHostname = window.top.location.hostname;
        return allowedDomains.some(domain => 
          parentHostname === domain || parentHostname.endsWith('.' + domain)
        );
      } catch (e) {
        return false;
      }
    }
    
    function protectFrame() {
      if (isInIframe()) {
        if (!isAllowedDomain()) {
          try {
            window.top.location = window.self.location;
          } catch (e) {
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0a;color:#f0f0f0;font-family:Inter,sans-serif;text-align:center;"><div><h1 style="font-size:2rem;margin-bottom:1rem;">⛔ Access Denied</h1><p style="font-size:1.2rem;opacity:0.7;">This game can only be played on EJK-Lite.</p><a href="https://yourdomain.com" style="display:inline-block;margin-top:2rem;padding:12px 32px;background:#ff3366;color:white;text-decoration:none;border-radius:50px;font-weight:500;">Go to EJK-Lite</a></div></div>';
          }
          return false;
        }
      }
      return true;
    }
    
    if (!protectFrame()) {
      return;
    }
    
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-Frame-Options';
    meta.content = 'SAMEORIGIN';
    document.head.appendChild(meta);
    
    setInterval(protectFrame, 2000);
    
    document.addEventListener('visibilitychange', protectFrame);
    
    if (isInIframe() && !isAllowedDomain()) {
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
        }
      });
    }
    
    console.log('EJK-Lite Active');
  })();