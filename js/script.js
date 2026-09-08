/* CozyMealCove Dinner Gastronomy Interactive Script */
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButtonText(themeToggleBtn, currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtonText(themeToggleBtn, newTheme);
    });
  }

  function updateThemeButtonText(btn, theme) {
    btn.innerHTML = theme === 'dark' ? '☀️ Warm Light' : '🌙 Hearth Dark';
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Interactive Dinner Feast Calculator
  const guestsSlider = document.getElementById('guestsSlider');
  const coursesSlider = document.getElementById('coursesSlider');
  const braiseSlider = document.getElementById('braiseSlider');

  const portionOutput = document.getElementById('portionOutput');
  const prepOutput = document.getElementById('prepOutput');
  const moodOutput = document.getElementById('moodOutput');
  const pairingRec = document.getElementById('pairingRec');

  function updateCalculator() {
    if (!guestsSlider) return;
    const guests = parseInt(guestsSlider.value);
    const courses = parseInt(coursesSlider.value);
    const hours = parseInt(braiseSlider.value);

    // Calculate total dinner portion mass in kg
    const totalMass = (guests * 0.45 * (courses / 3)).toFixed(1);
    if (portionOutput) portionOutput.innerText = totalMass + ' kg Feasting Yield';

    // Calculate prep & slow-braise schedule
    const totalPrep = hours + Math.round(courses * 0.5);
    if (prepOutput) prepOutput.innerText = totalPrep + ' Hours Total Prep';

    // Ambience scale
    let mood = 'Intimate Hearth Dinner';
    if (guests >= 8) mood = 'Grand Communal Feast';
    else if (guests <= 2) mood = 'Cozy Romantic Alcove';
    if (moodOutput) moodOutput.innerText = mood;

    // Pairing recommendation
    let rec = 'Sparkling Orchard Honey Cider';
    if (courses >= 4) rec = 'Smoked Thyme & Blackcurrant Botanical Cordial';
    else if (hours >= 5) rec = 'Aromatic Spiced Apple & Clove Hearth Press';
    if (pairingRec) pairingRec.innerText = rec;
  }

  if (guestsSlider) {
    guestsSlider.addEventListener('input', updateCalculator);
    coursesSlider.addEventListener('input', updateCalculator);
    braiseSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

  // Supper Club Newsletter Toast
  const newsForms = document.querySelectorAll('.newsletter-form');
  newsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        alert('Welcome to CozyMealCove Supper Club! Your email (' + input.value + ') has been registered for seasonal dinner dispatches.');
        input.value = '';
      }
    });
  });
});
