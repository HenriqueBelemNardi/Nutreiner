// Espera o DOM (estrutura HTML) carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // FEATURE 1: Animações de Entrada ao Rolar (Fade-in)
    // =================================================================
    
    // Seleciona todos os elementos que devem ser animados ao rolar
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Configura o 'observador'
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento está visível na tela
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' para ativar a animação CSS
                entry.target.classList.add('visible');
                // (Opcional) Para de observar o elemento depois que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    });

    // Coloca o observador para 'assistir' cada elemento
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // =================================================================
    // FEATURE 2: Marcar o Link Ativo no Menu (Active Nav Link)
    // =================================================================

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove 'nav-active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                });

                // Adiciona 'nav-active' ao link correspondente
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-active');
                }
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px', // Define uma 'linha' no meio da tela
        threshold: 0
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // =================================================================
    // FEATURE 3: Melhorar a Lógica do Menu Mobile (JS)
    // =================================================================

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const navMenuLinks = document.querySelectorAll('nav a'); // Pega os links do menu

    // Abre/Fecha o menu ao clicar no hamburger
    hamburgerMenu.addEventListener('click', () => {
        nav.classList.toggle('menu-open');
        hamburgerMenu.classList.toggle('is-active'); // Para animar o 'X'
    });

    // Fecha o menu ao clicar em um link (ótimo para UX)
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

    // Mostra/Esconde o botão baseado na posição do scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra o botão depois de 300px
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // (Opcional) Rola suavemente para o topo ao clicar
    // Nota: O href="#inicio" e o scroll-behavior: smooth no CSS já fazem isso,
    // mas isso é uma garantia extra.
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o pulo instantâneo do href
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});