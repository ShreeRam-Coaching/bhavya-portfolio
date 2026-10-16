/* Smooth scrolling (Lenis) + My work sticky stacking cards (GSAP UI "sticky-scroll", plain JS) */
(function () {
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var imgs = document.querySelectorAll('img');
  for (var n = 0; n < imgs.length; n++) imgs[n].decoding = 'async';       // big screenshots decode off the main thread

  var wrap = document.getElementById('showcase');
  var cards = wrap ? [].slice.call(wrap.querySelectorAll('.scard')) : [];

  // ---- maximalist dressing for each card: ticker, giant word, tags, browser frame, chips, sticker, spinning badge
  function mk(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }
  cards.forEach(function (card, i) {
    var title = card.querySelector('.scard-title');
    var shot = card.querySelector('.scard-img');
    var body = card.querySelector('.scard-body');
    var num = card.querySelector('.scard-idx').textContent.trim();
    var name = title.textContent.trim();
    if (i === cards.length - 1) card.classList.add('lm');

    var line = (name + ' \u2726 CONCEPT WEBSITE \u2726 FREE DEMO \u2726 ').toUpperCase();
    line = line + line + line;
    var marq = mk('div', 'scard-marq'); marq.setAttribute('aria-hidden', 'true');
    marq.appendChild(mk('div', '', '<span>' + line + '</span><span>' + line + '</span>'));
    card.insertBefore(marq, card.firstChild);

    var word = mk('div', 'scard-bgword', name.split(' ')[0]); word.setAttribute('aria-hidden', 'true');
    card.insertBefore(word, marq.nextSibling);
    var count = mk('div', 'scard-count', num + ' / 0' + cards.length); count.setAttribute('aria-hidden', 'true');
    card.insertBefore(count, word.nextSibling);

    body.insertBefore(mk('ul', 'scard-tags', '<li>Clinic website</li><li>Web design</li><li>Mobile-friendly</li><li>Concept</li>'), title);

    var stage = mk('div', 'scard-stage');
    shot.parentNode.insertBefore(stage, shot);
    stage.appendChild(shot);
    stage.appendChild(mk('span', 'scard-chip c1', 'Services'));
    stage.appendChild(mk('span', 'scard-chip c2', 'Timings &amp; contact'));
    stage.appendChild(mk('span', 'scard-sticker', 'Concept<br>\u2726'));
    var spin = mk('a', 'scard-spin',
      '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="scc' + i + '" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs>' +
      '<text><textPath href="#scc' + i + '" textLength="280" lengthAdjust="spacing">VIEW WEBSITE \u2726 VIEW WEBSITE \u2726 </textPath></text></svg><b>\u2197</b>');
    spin.href = shot.href; spin.target = '_blank'; spin.rel = 'noopener'; spin.tabIndex = -1; spin.setAttribute('aria-hidden', 'true');
    stage.appendChild(spin);
  });

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // ---- smooth scroll, kept in step with GSAP so pinned cards never lag or jitter
  if (window.Lenis && !calm) {
    var lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      anchors: { offset: -70 }                                           // nav links glide, clear of the fixed header
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ---- My work: each card is pinned while the next slides over it
  return; // pinning removed: cards scroll normally
  cards.forEach(function (card, i) {
    if (i >= cards.length - 1) return;
    ScrollTrigger.create({
      trigger: card, start: 'top top',
      endTrigger: cards[cards.length - 1], end: 'top top',
      pin: true, pinSpacing: false
    });
    gsap.fromTo(card,                                                    // shrink, tilt and darken, tied to scroll
      { scale: 1, rotation: 0, '--after-opacity': 0 },
      {
        scale: 0.75, rotation: i % 2 === 0 ? 5 : -5, '--after-opacity': 1, ease: 'none', force3D: true,
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true }
      });
  });

  addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
