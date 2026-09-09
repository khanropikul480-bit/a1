document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.id = 'navBackdrop';
    document.body.appendChild(backdrop);
    
    function toggleMobileMenu() {
        const isOpen = mainNav.classList.contains('is-open');
        if (isOpen) {
            mainNav.classList.remove('is-open');
            mobileToggle.classList.remove('is-active');
            backdrop.classList.remove('is-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            mainNav.classList.add('is-open');
            mobileToggle.classList.add('is-active');
            backdrop.classList.add('is-active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }
    
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
    if (backdrop) backdrop.addEventListener('click', toggleMobileMenu);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1140 && mainNav.classList.contains('is-open')) {
                toggleMobileMenu();
            }
        });
    });

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(el => {
                if (el !== item) el.classList.remove('active');
            });
            item.classList.toggle('active', !isActive);
        });
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
});
