// Only the three behaviours the live site actually has. No library: phase ② has to port
// this into a Cocoon child theme, and a bundled slider/animation library would have to be
// rewritten from scratch there.
//
//   1. mobile drawer (<=768px)
//   2. scroll reveal (opacity + translate, matching STUDIO's .appear)
//   3. demo notice dismissal
//
// The live site has NO hover states on links, buttons or cards — verified by measuring
// computed styles before and after mouseover. Nothing is added here.

(function () {
  "use strict";

  /* ---------------------------------------------------------------- drawer */

  var drawer = document.getElementById("drawer");
  var burger = document.querySelector(".hdr-burger");

  function setDrawer(open) {
    if (!drawer || !burger) return;
    drawer.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = drawer.querySelector(".drawer-close");
      if (first) first.focus();
    } else {
      burger.focus();
    }
  }

  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target.closest(".drawer-close, .drawer-scrim, a")) setDrawer(false);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && !drawer.hidden) setDrawer(false);
  });

  /* ---------------------------------------------------------- scroll reveal */

  // Mark the elements STUDIO animates. Doing it in JS rather than the template keeps the
  // markup that phase ② ports free of animation-only attributes.
  var revealSelector = [
    ".sec-head", ".about-text", ".about-photo", ".scard", ".news-row",
    ".story-col > *", ".story-img", ".mission-txt", ".mission-grid li",
    ".mvv-img", ".mvv-txt", ".itable li", ".srow", ".pcta", ".fcta",
    ".hero-h1 span", ".hero-copy", ".phero-inner > *", ".doc > *", ".cintro > *",
  ].join(",");

  var targets = [].slice.call(document.querySelectorAll(revealSelector));
  targets.forEach(function (el, i) {
    if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "");
    // Small stagger inside a group, as STUDIO does with its 0/300/600ms delays.
    el.style.transitionDelay = (i % 4) * 80 + "ms";
  });

  var rules = [].slice.call(document.querySelectorAll('[data-reveal="rule"]'));
  var all = targets.concat(rules);

  if (!("IntersectionObserver" in window)) {
    all.forEach(function (el) { el.classList.add("is-revealed"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    all.forEach(function (el) { io.observe(el); });
    // Anything already on screen at load should not wait for a scroll event.
    requestAnimationFrame(function () {
      all.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    });
  }

  /* ------------------------------------------------------------ demo notice */

  var notice = document.querySelector("[data-demo-notice]");
  if (notice) {
    var close = notice.querySelector("button");
    if (close) close.addEventListener("click", function () { notice.remove(); });
  }

  /* ------------------------------------------------------- form is inert */

  // Belt and braces: every control is already `disabled` in the markup and the form has no
  // action, but a stray Enter key must never post anything anywhere.
  var demoForm = document.querySelector("[data-demo-form]");
  if (demoForm) {
    demoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
})();
