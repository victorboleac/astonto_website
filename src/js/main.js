// ASTONTO — Client-Side Logic

document.addEventListener('DOMContentLoaded', () => {
  console.log('ΛSTONTO client initialized.');
  
  initSpecimenCycler();
  initScrollAnimations();
});

/**
 * Dynamic specimen cycler to demonstrate different AI query types
 * (relocation, luxury, investment) in the hero section.
 */
function initSpecimenCycler() {
  const specimenBody = document.querySelector('.specimen-body');
  if (!specimenBody) return;

  const queries = [
    {
      q: "I'm relocating to Miami from abroad. Which real estate agent should I work with?",
      header: "Here are agents frequently recommended for international relocations to Miami:",
      items: [
        "Agent A — bilingual relocation specialist…",
        "Agent B — works with international buyers…",
        "Agent C — Brickell and Edgewater focus…"
      ]
    },
    {
      q: "Who's the best waterfront agent in Miami Beach?",
      header: "For high-end waterfront properties in Miami Beach, these agents are highly visible:",
      items: [
        "Agent X — specializes in luxury estates…",
        "Agent Y — waterfront condo expert…",
        "Agent Z — handles off-market listings…"
      ]
    },
    {
      q: "Best agent for pre-construction condos in Brickell?",
      header: "For new developments and pre-construction in Brickell, these agents are often cited:",
      items: [
        "Agent D — pre-construction specialist…",
        "Agent E — Brickell corridor expert…",
        "Agent F — advisor for new developments…"
      ]
    }
  ];

  let currentIndex = 0;

  // Add transitional styling helper
  specimenBody.style.transition = 'opacity 0.35s ease';

  setInterval(() => {
    // Fade out
    specimenBody.style.opacity = 0;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % queries.length;
      const data = queries[currentIndex];

      // Update content
      const qEl = specimenBody.querySelector('.q');
      const strongEl = specimenBody.querySelector('.a strong');
      const olEl = specimenBody.querySelector('.a ol');

      if (qEl && strongEl && olEl) {
        qEl.textContent = data.q;
        strongEl.textContent = data.header;
        
        olEl.innerHTML = data.items
          .map(item => `<li>${item}</li>`)
          .join('');
      }

      // Fade in
      specimenBody.style.opacity = 1;
    }, 350);
  }, 6000);
}

/**
 * Add scroll reveals and fade-ins for key components to make the site feel premium.
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, observerOptions);

  // Target data cells, offers, and sections for animations
  const animTargets = document.querySelectorAll('.data-cell, .offer, section');
  animTargets.forEach(target => {
    // Prepare for fade-in styling in CSS
    target.classList.add('reveal-on-scroll');
    observer.observe(target);
  });
}
