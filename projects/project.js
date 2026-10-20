/* Language and theme toggles for the case-study pages.
   Uses the same localStorage keys as the main site ('lang', 'theme'),
   so a visitor's choice carries over in both directions. */
(function () {
  var root = document.documentElement;

  function applyLang(lang) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });
  }
  var lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) {}
  applyLang(lang === 'ar' ? 'ar' : 'en');
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = b.getAttribute('data-set-lang');
      applyLang(next);
      try { localStorage.setItem('lang', next); } catch (e) {}
    });
  });

  var themeBtn = document.getElementById('themeBtn');
  function syncThemeIcon() {
    var use = themeBtn && themeBtn.querySelector('use');
    if (use) use.setAttribute('href', 'icons.svg#' + (root.getAttribute('data-theme') === 'light' ? 'i-moon' : 'i-sun'));
  }
  syncThemeIcon();
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeIcon();
  });

  // screenshot viewer
  var viewer = document.getElementById('viewer');
  if (viewer) {
    var big = viewer.querySelector('img');
    document.querySelectorAll('.shot').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        big.src = a.getAttribute('href');
        big.alt = a.querySelector('img').alt;
        viewer.showModal();
      });
    });
    viewer.addEventListener('click', function () { viewer.close(); });
  }
})();
