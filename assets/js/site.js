/* Kayyem Therapy — site.js (no dependencies) */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;

  /* ---------- Sticky header shadow ---------- */
  var header = doc.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  var toggle = doc.querySelector(".nav-toggle");
  var menu = doc.getElementById("nav-menu");

  function setNav(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setNav(!menu.classList.contains("is-open"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setNav(false); });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setNav(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Intro video ---------- */
  doc.querySelectorAll("[data-video]").forEach(function (frame) {
    var video = frame.querySelector("video");
    var play = frame.querySelector(".video-play");
    if (!video || !play) return;

    play.addEventListener("click", function () {
      frame.classList.add("is-playing");
      video.controls = true;
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
      video.focus();
    });

    video.addEventListener("ended", function () {
      frame.classList.remove("is-playing");
      video.controls = false;
      try { video.currentTime = 0; } catch (e) {}
    });
  });

  /* ---------- Scheduler modal ---------- */
  var modal = doc.getElementById("scheduler-modal");
  if (modal) {
    var iframe = modal.querySelector("iframe");
    var url = modal.getAttribute("data-url");
    var closeBtn = modal.querySelector(".modal-close");
    var lastFocus = null;

    function openModal() {
      lastFocus = doc.activeElement;
      if (iframe && iframe.getAttribute("src") !== url) iframe.setAttribute("src", url);
      modal.classList.add("is-open");
      modal.removeAttribute("aria-hidden");
      body.classList.add("modal-open");
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      body.classList.remove("modal-open");
      if (iframe) iframe.setAttribute("src", "about:blank");
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }

    doc.querySelectorAll("[data-open-scheduler]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

    modal.querySelectorAll("[data-close-scheduler]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
  }

  /* ---------- Escape key ---------- */
  doc.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (modal && modal.classList.contains("is-open")) {
      modal.querySelector(".modal-close").click();
    } else if (menu && menu.classList.contains("is-open")) {
      setNav(false);
      if (toggle) toggle.focus();
    }
  });

  /* ---------- Contact form → mail app ---------- */
  var form = doc.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || "").trim();
      var email = (form.elements.email.value || "").trim();
      var message = (form.elements.message.value || "").trim();
      var subject = encodeURIComponent("Website inquiry from " + (name || "a new client"));
      var bodyText = encodeURIComponent(
        "Name: " + name + "\nEmail: " + email + "\n\n" + message
      );
      window.location.href = "mailto:kayyemtherapy@gmail.com?subject=" + subject + "&body=" + bodyText;
      var note = form.querySelector("[data-form-status]");
      if (note) note.textContent = "Your email app should open with the message ready to send. If it didn't, email kayyemtherapy@gmail.com directly.";
    });
  }

  /* ---------- Current year ---------- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
