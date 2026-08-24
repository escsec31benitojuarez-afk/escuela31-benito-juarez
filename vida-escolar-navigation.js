(function () {
  'use strict';

  const menu = document.querySelector('.side-menu');
  const sections = Array.from(document.querySelectorAll('.life-section[id]'));

  if (!menu || !sections.length) return;

  const links = Array.from(menu.querySelectorAll('a[href^="#"]'));
  const sectionsByHash = new Map(sections.map(function (section) {
    return ['#' + section.id.toLowerCase(), section];
  }));
  const defaultHash = '#' + sections[0].id.toLowerCase();

  function normalizedHash() {
    let hash = window.location.hash;

    try {
      hash = decodeURIComponent(hash);
    } catch (error) {
      hash = '';
    }

    hash = hash.trim().toLowerCase();
    return sectionsByHash.has(hash) ? hash : defaultHash;
  }

  function showSectionFromHash(scrollToSection) {
    const activeHash = normalizedHash();
    const activeSection = sectionsByHash.get(activeHash);

    sections.forEach(function (section) {
      const isActive = section === activeSection;
      section.hidden = !isActive;
      section.setAttribute('aria-hidden', String(!isActive));
    });

    links.forEach(function (link) {
      const isActive = link.getAttribute('href').toLowerCase() === activeHash;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (scrollToSection && activeSection) {
      window.requestAnimationFrame(function () {
        activeSection.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    }
  }

  menu.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !menu.contains(link)) return;

    const requestedHash = link.getAttribute('href').toLowerCase();
    if (!sectionsByHash.has(requestedHash)) return;

    event.preventDefault();
    if (window.location.hash.toLowerCase() === requestedHash) {
      showSectionFromHash(true);
    } else {
      window.location.hash = requestedHash;
    }
  });

  window.addEventListener('hashchange', function () {
    showSectionFromHash(true);
  });

  showSectionFromHash(Boolean(window.location.hash));
})();
