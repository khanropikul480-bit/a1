/* CozyMealCove - Interactive Dinner Experience Controller */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeBtn(themeToggleBtn, currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme');
      const next = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeBtn(themeToggleBtn, next);
    });
  }

  function updateThemeBtn(btn, theme) {
    btn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
  }

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // 3. Evening Feast & Ingredient Proportion Calculator
  const guestCountInput = document.getElementById('guestCount');
  const feastStyleSelect = document.getElementById('feastStyle');
  const appetiteLevelSelect = document.getElementById('appetiteLevel');
  const calculateFeastBtn = document.getElementById('calculateFeastBtn');
  const resultItems = document.getElementById('resultItems');

  function calculateFeast() {
    if (!guestCountInput || !resultItems) return;
    const guests = Math.max(1, parseInt(guestCountInput.value) || 6);
    const style = feastStyleSelect ? feastStyleSelect.value : 'roast';
    const appetite = appetiteLevelSelect ? appetiteLevelSelect.value : 'standard';

    let multiplier = 1.0;
    if (appetite === 'comfort') multiplier = 1.25;
    if (appetite === 'light') multiplier = 0.8;

    let protein = '', aromatics = '', broth = '', starch = '', vessel = '', time = '';

    if (style === 'roast') {
      const meatLbs = (guests * 0.55 * multiplier).toFixed(1);
      const mirepoixG = Math.round(guests * 80 * multiplier);
      const brothCups = (guests * 0.75 * multiplier).toFixed(1);
      const polentaG = Math.round(guests * 65 * multiplier);
      const quart = guests > 8 ? '9-Quart' : guests > 4 ? '7-Quart' : '5-Quart';

      protein = `${meatLbs} lbs marbled chuck roast or beef shank`;
      aromatics = `${mirepoixG}g sweet yellow onions, heirloom carrots & celery`;
      broth = `${brothCups} cups rich roasted bone stock & cider reduction`;
      starch = `${polentaG}g stone-ground yellow polenta with mascarpone`;
      vessel = `${quart} Enameled Cast Iron Dutch Oven`;
      time = '4.5 Hours total (45 min active prep + 3.75 hr low simmer)';
    } else if (style === 'pasta') {
      const pastaG = Math.round(guests * 130 * multiplier);
      const raguLbs = (guests * 0.45 * multiplier).toFixed(1);
      const parmG = Math.round(guests * 35 * multiplier);

      protein = `${raguLbs} lbs slow-simmered beef, pork & pancetta ragù`;
      aromatics = `San Marzano plum tomatoes, fresh rosemary, sweet garlic`;
      broth = `Rich fond glaze & reduction`;
      starch = `${pastaG}g handmade durum egg tagliatelle`;
      vessel = `Large 8-Quart Heavy Pasta Pot & Copper Sauté Pan`;
      time = '6 Hours ragù simmer (fresh pasta rolled 30 min before serving)';
    } else if (style === 'skillet') {
      const poultryLbs = (guests * 0.65 * multiplier).toFixed(1);
      const rootLbs = (guests * 0.4 * multiplier).toFixed(1);

      protein = `${poultryLbs} lbs herb-brined bone-in roasted poultry`;
      aromatics = `Fresh sage, rosemary sprigs, garlic heads & shallots`;
      broth = `Pan drippings with cider glaze`;
      starch = `${rootLbs} lbs caramelized fingerling potatoes & parsnips`;
      vessel = `12-inch or 15-inch Seasoned Cast Iron Skillet`;
      time = '1.75 Hours total (25 min prep + 1.25 hr 400°F roast)';
    } else {
      const squashLbs = (guests * 0.6 * multiplier).toFixed(1);
      const farroG = Math.round(guests * 90 * multiplier);

      protein = `Crispy spiced chickpeas & toasted pepita seed clusters`;
      aromatics = `Warm cider-mustard emulsion & fresh garden thyme`;
      broth = `Golden vegetable dashi & maple glaze`;
      starch = `${farroG}g organic farro pilaf with roasted autumn squashes (${squashLbs} lbs)`;
      vessel = `Heavy Ceramic Roasting Pan & Dutch Oven`;
      time = '1.5 Hours total (20 min prep + 1 hr oven roast)';
    }

    resultItems.innerHTML = `
      <li><strong>Primary Main Course:</strong> ~${protein}</li>
      <li><strong>Aromatics & Mirepoix:</strong> ${aromatics}</li>
      <li><strong>Sauce / Cooking Liquid:</strong> ${broth}</li>
      <li><strong>Starch & Grain Base:</strong> ${starch}</li>
      <li><strong>Recommended Vessel:</strong> ${vessel}</li>
      <li><strong>Estimated Hearth Timeline:</strong> ${time}</li>
    `;
  }

  if (calculateFeastBtn) {
    calculateFeastBtn.addEventListener('click', calculateFeast);
  }
  if (guestCountInput) {
    guestCountInput.addEventListener('input', calculateFeast);
  }
  if (feastStyleSelect) {
    feastStyleSelect.addEventListener('change', calculateFeast);
  }
  if (appetiteLevelSelect) {
    appetiteLevelSelect.addEventListener('change', calculateFeast);
  }

  // 4. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 5. Toast Notification Helper
  function showToast(msg) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }

  // 6. Newsletter Subscription
  const newsForms = document.querySelectorAll('.newsletter-form, #newsletterForm');
  newsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`✨ Welcome! ${input.value} has joined the CozyMealCove Supper Club.`);
        input.value = '';
      }
    });
  });

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('💌 Thank you for reaching out! Your culinary inquiry has been received.');
      contactForm.reset();
    });
  }
});