document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ПЛАВНЫЙ СКРОЛЛ LENIS
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. МОБИЛЬНОЕ МЕНЮ (Улучшенная логика)
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = () => {
        burger?.classList.toggle('burger--active');
        mobileMenu?.classList.toggle('mobile-menu--active');
        document.body.style.overflow = mobileMenu?.classList.contains('mobile-menu--active') ? 'hidden' : '';
    };

    const closeMenu = () => {
        burger?.classList.remove('burger--active');
        mobileMenu?.classList.remove('mobile-menu--active');
        document.body.style.overflow = '';
    };

    burger?.addEventListener('click', toggleMenu);
    
    // Закрытие при клике на любой пункт меню
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 3. COOKIE POPUP (С памятью)
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptCookies = document.getElementById('acceptCookies');

    if (!localStorage.getItem('pilot_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup?.classList.add('cookie-popup--active');
        }, 3000); // Показать через 3 секунды
    }

    acceptCookies?.addEventListener('click', () => {
        cookiePopup?.classList.remove('cookie-popup--active');
        localStorage.setItem('pilot_cookies_accepted', 'true');
    });

    // 4. HEADER ПРИ СКРОЛЛЕ
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // 5. НАДЕЖНАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ (Intersection Observer)
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Анимируем вложенные элементы (карточки), если они есть
                const children = entry.target.querySelectorAll('.feature-card, .blog-card, .innovations-card, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = "1";
                        child.style.transform = "translateY(0)";
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. HERO АНИМАЦИЯ (Запуск сразу)
    gsap.from('.hero__title', { y: 40, opacity: 0, duration: 1.2, delay: 0.5 });
    gsap.from('.hero__subtitle', { y: 30, opacity: 0, duration: 1.2, delay: 0.8 });
    gsap.from('.hero__actions', { y: 20, opacity: 0, duration: 1.2, delay: 1.1 });

    // 7. ЛОГИКА ФОРМЫ (Математическая капча)
    const contactForm = document.getElementById('contactForm');
    const captchaQuestion = document.getElementById('captchaQuestion');
    let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 5), res = n1 + n2;
    if(captchaQuestion) captchaQuestion.textContent = `${n1} + ${n2}`;

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const ans = document.getElementById('captchaInput')?.value;
        if (parseInt(ans) !== res) return alert('Неверно! Попробуйте снова.');
        
        document.getElementById('formMessage')?.classList.add('form__message--active');
    });
});