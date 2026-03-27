(function () {
    const root = document.documentElement;
    root.classList.add('js');

    document.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(() => {
            document.body.classList.add('is-loaded');
        });

        const wordScrollItems = Array.from(document.querySelectorAll('[data-word-scroll]'));
        const revealItems = Array.from(document.querySelectorAll('[data-reveal], [data-word-scroll]'));

        const splitWords = (element) => {
            if (element.dataset.wordSplit === 'true') return;
            const text = element.textContent.trim();
            if (!text) return;

            element.dataset.wordSplit = 'true';
            element.setAttribute('aria-label', text);
            element.textContent = '';

            text.split(/\s+/).forEach((word, index) => {
                const wordWrap = document.createElement('span');
                wordWrap.className = 'word';

                const inner = document.createElement('span');
                inner.textContent = word;
                inner.style.setProperty('--word-delay', `${index * 42}ms`);

                wordWrap.appendChild(inner);
                element.appendChild(wordWrap);
            });
        };

        wordScrollItems.forEach(splitWords);

        revealItems.forEach((item, index) => {
            if (!item.style.getPropertyValue('--delay') && item.dataset.revealDelay) {
                item.style.setProperty('--delay', `${Number(item.dataset.revealDelay) * 90}ms`);
            } else if (!item.style.getPropertyValue('--delay')) {
                item.style.setProperty('--delay', `${index * 80}ms`);
            }
        });

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.18,
                rootMargin: '0px 0px -8% 0px'
            });

            revealItems.forEach((item) => revealObserver.observe(item));
        } else {
            revealItems.forEach((item) => item.classList.add('is-visible'));
        }

        const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
        const sections = Array.from(document.querySelectorAll('main section[id]'));

        const setActive = (id) => {
            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${id}`;
                link.classList.toggle('is-active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        if ('IntersectionObserver' in window && sections.length) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            }, {
                threshold: 0.45,
                rootMargin: '-20% 0px -45% 0px'
            });

            sections.forEach((section) => sectionObserver.observe(section));
        }

        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    });
})();
