// Espera o DOM (estrutura HTML) carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // FEATURE 1: Animações de Entrada ao Rolar (Fade-in)
    // =================================================================
    
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elementsToAnimate.forEach(element => { observer.observe(element); });

    // =================================================================
    // FEATURE 2: Marcar o Link Ativo no Menu (Active Nav Link)
    // =================================================================

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav a');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => { link.classList.remove('nav-active'); });
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-active');
                }
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(section => { navObserver.observe(section); });

    // =================================================================
    // FEATURE 3: Melhorar a Lógica do Menu Mobile (JS)
    // =================================================================

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const navMenuLinks = document.querySelectorAll('nav a'); 

    hamburgerMenu.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
        hamburgerMenu.classList.toggle('is-active'); 
    });

    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('menu-open');
            hamburgerMenu.classList.remove('is-active');
        });
    });

    // =================================================================
    // FEATURE 4: Botão "Voltar ao Topo"
    // =================================================================

    const backToTopButton = document.getElementById('backToTopButton');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    
    // =================================================================
    // FEATURE 5: Banner de Cookies (LGPD)
    // =================================================================

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Verifica se o usuário já aceitou (usando localStorage)
    if (!localStorage.getItem('nutreiner_cookies_accepted')) {
        // Se não aceitou, mostra o banner
        cookieBanner.classList.add('visible');
    }

    // Ouve o clique no botão "Aceitar"
    acceptCookiesButton.addEventListener('click', () => {
        // Salva a preferência no localStorage
        localStorage.setItem('nutreiner_cookies_accepted', 'true');
        // Esconde o banner
        cookieBanner.classList.remove('visible');
    });

});