/* ==========================================================================
   Shared site behavior. Content comes from data.js — edit that file, not
   this one.
   ========================================================================== */

(function () {
  const tagColorMap = { blue: "#3049E8", burgundy: "#A30000", green: "#0C7A44" };

  const waLink = (message) =>
    `https://wa.me/${SITE_DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const playIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M6 4l14 8-14 8V4z" fill="currentColor"/></svg>`;
  const checkIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ---- Nav: scrolled state + mobile toggle + active link ---- */
  function initNav() {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("is-open");
        links.classList.toggle("is-open");
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          toggle.classList.remove("is-open");
          links.classList.remove("is-open");
        })
      );
    }

    const current = document.body.dataset.page;
    document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
      if (a.dataset.page === current) a.classList.add("is-active");
    });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---- Wire up every WhatsApp CTA on the page ---- */
  function initWhatsAppLinks() {
    document.querySelectorAll("[data-wa]").forEach((el) => {
      const custom = el.getAttribute("data-wa-message");
      el.href = waLink(custom || SITE_DATA.defaultMessage);
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  /* ---- Render project cards into any [data-projects] container ---- */
  function renderProjects() {
    document.querySelectorAll("[data-projects]").forEach((container) => {
      const limit = parseInt(container.dataset.projects, 10) || SITE_DATA.projects.length;
      const list = SITE_DATA.projects.slice(0, limit);

      container.innerHTML = list
        .map((p, i) => {
          const color = tagColorMap[p.tagColor] || tagColorMap.blue;
          const href = p.videoUrl && p.videoUrl !== "#" ? p.videoUrl : "javascript:void(0)";
          const target = p.videoUrl && p.videoUrl !== "#" ? ' target="_blank" rel="noopener"' : "";
          return `
          <a href="${href}"${target} class="project-card reveal" style="--i:${i}">
            <div class="project-thumb" style="--thumb-bg: linear-gradient(155deg, #12161F, #080B10)">
              <div class="project-thumb-play">${playIcon}</div>
            </div>
            <div class="project-info">
              <span class="project-tag" style="--tag-color:${color}">${p.category}</span>
              <h3>${p.title}</h3>
              <p>Client project &mdash; edit details in data.js</p>
            </div>
          </a>`;
        })
        .join("");
    });
  }

  /* ---- Render pricing cards into any [data-pricing] container ---- */
  function renderPricing() {
    document.querySelectorAll("[data-pricing]").forEach((container) => {
      container.innerHTML = SITE_DATA.pricing
        .map((tier) => {
          const message = `Hi Badar! I'd like to book the "${tier.tier}" package ($${tier.price}${tier.unit}).`;
          return `
          <div class="price-card reveal ${tier.featured ? "price-card--featured" : ""}">
            <div class="price-tier-name">${tier.tier}</div>
            <div class="price-amount">$${tier.price}<span>${tier.unit}</span></div>
            <p class="price-desc">${tier.desc}</p>
            <ul class="price-features">
              ${tier.features.map((f) => `<li>${checkIcon}${f}</li>`).join("")}
            </ul>
            <a href="${waLink(message)}" target="_blank" rel="noopener" class="btn btn--wa btn--block">
              Book on WhatsApp
            </a>
          </div>`;
        })
        .join("");
    });
  }

  /* ---- Filter bar (portfolio page) ---- */
  function initFilters() {
    const bar = document.querySelector(".filter-bar");
    const grid = document.querySelector("[data-projects]");
    if (!bar || !grid) return;

    bar.addEventListener("click", (e) => {
      const pill = e.target.closest(".filter-pill");
      if (!pill) return;
      bar.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      const filter = pill.dataset.filter;
      grid.querySelectorAll(".project-card").forEach((card) => {
        const tag = card.querySelector(".project-tag").textContent;
        const show = filter === "All" || tag === filter;
        card.style.display = show ? "" : "none";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    renderPricing();
    initWhatsAppLinks();
    initFilters();
    initNav();
    initReveal();

    document.querySelectorAll(".marquee").forEach((m) => {
      m.innerHTML = m.innerHTML + m.innerHTML;
    });
  });
})();
