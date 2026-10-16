/* ============================================================
   HERO — Rotador de palabras + spotlight
   ============================================================ */

/* ------------------------------------------------------------
   1. ROTADOR DE PALABRAS DEL TÍTULO
   ------------------------------------------------------------ */
(function () {
  const el = document.getElementById('rotator');
  if (!el) return;

  const words = ['se mueven', 'conectan', 'destacan', 'funcionan'];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;

  if (reduce) return;

  function cycle() {
    el.style.animation = 'rotOut .38s cubic-bezier(.4,0,1,1) forwards';

    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.style.animation = 'rotIn .55s cubic-bezier(.16,1,.3,1) forwards';
    }, 380);
  }

  setInterval(cycle, 2800);
})();

/* ------------------------------------------------------------
   2. SPOTLIGHT QUE SIGUE AL CURSOR EN EL HERO
   ------------------------------------------------------------ */
(function () {
  const hero = document.querySelector('.hero');
  const spot = document.querySelector('.hero__spotlight');
  if (!hero || !spot) return;
  if (window.matchMedia('(hover: none)').matches) return;

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    spot.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
})();