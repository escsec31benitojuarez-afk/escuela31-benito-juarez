(function () {
  const headers = document.querySelectorAll('.site-header .header-inner');

  headers.forEach(function (header, index) {
    const nav = header.querySelector('.nav-links');
    if (!nav || header.querySelector('.portal-menu-toggle')) return;

    const navId = nav.id || ('portal-main-navigation-' + index);
    nav.id = navId;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'portal-menu-toggle';
    button.setAttribute('aria-controls', navId);
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span aria-hidden="true">☰</span> Menú';

    header.insertBefore(button, nav);

    function closeMenu() {
      nav.classList.remove('is-open');
      button.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }

    button.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      button.classList.toggle('is-open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100) closeMenu();
    });
  });
})();
