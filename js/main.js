/* =================================================================== 
 * Premium Landing Page - JavaScript
 * Smooth animations, interactions, and visual enhancements
 * ===================================================================*/

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollNavigation();
    initializeSmoothScroll();
});

// Smooth scroll to sections
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Navigation highlight on scroll
function initializeScrollNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    const targetHeight = target.offsetHeight;
                    
                    if (scrollPosition >= targetPosition && scrollPosition < targetPosition + targetHeight) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.trust-card, .work-card, .process-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add active state to nav links
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--color-accent);
        border-bottom: 2px solid var(--color-accent);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-visual');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mouse follow effect for gradient orbs
document.addEventListener('mousemove', function(e) {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const offset = (index + 1) * 10;
        orb.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
    });
});

// Log initialization
console.log('%cPremium Landing Page Initialized', 'color: #ffd700; font-size: 14px; font-weight: bold');
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            // 3 second loading animation delay
            setTimeout(function() {
                const preloaderEl = document.querySelector('#preloader');
                if (preloaderEl) {
                    preloaderEl.classList.add('loaded');
                }
                tl.play();
            }, 3000);
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Lightbox Gallery
    * ------------------------------------------------------ */
    let currentImageIndex = 0;
    const galleryImages = [
        { 
            src: 'images/photography.jpg', 
            description: 'Professional photography session capturing stunning visual moments with cinematic lighting and composition.',
            date: 'March 2025',
            location: 'Los Angeles, CA'
        },
        { 
            src: 'images/bunju.jpg', 
            description: 'Urban documentary capturing authentic street stories and cultural moments in vibrant city atmosphere.',
            date: 'February 2025',
            location: 'Downtown LA'
        },
        { 
            src: 'images/flowers.jpg', 
            description: 'Nature-inspired visual storytelling with detailed macro cinematography and artistic color grading.',
            date: 'January 2025',
            location: 'Malibu, CA'
        },
        { 
            src: 'images/mkapa.jpg', 
            description: 'Commercial production showcasing brand aesthetic with professional lighting and dynamic camera movement.',
            date: 'December 2024',
            location: 'Beverly Hills, CA'
        },
        { 
            src: 'images/mkapa2.jpg', 
            description: 'Event coverage with multiple camera setup capturing energy and emotions of live performances.',
            date: 'November 2024',
            location: 'Staples Center, LA'
        },
        { 
            src: 'images/seanshow.jpg', 
            description: 'Music video production featuring choreography, visual effects, and cinematic post-production.',
            date: 'October 2024',
            location: 'Hollywood, CA'
        },
        { 
            src: 'images/selfie.jpg', 
            description: 'Portrait photography showcasing personality and character through professional lighting techniques.',
            date: 'September 2024',
            location: 'Studio, LA'
        },
        { 
            src: 'images/August%202025.jpg', 
            description: 'Documentary-style footage capturing candid moments and authentic storytelling with natural lighting.',
            date: 'August 2024',
            location: 'Venice Beach, CA'
        }
    ];

    window.openLightbox = function() {
        currentImageIndex = 0;
        const lightbox = document.getElementById('lightboxGallery');
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightboxGallery');
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyboard);
    };

    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    };

    window.prevImage = function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    };

    window.updateLightboxImage = function() {
        const image = galleryImages[currentImageIndex];
        document.getElementById('lightboxImage').src = image.src;
        document.getElementById('lightboxDescription').textContent = image.description;
        document.getElementById('dateValue').textContent = image.date;
        document.getElementById('locationValue').textContent = image.location;
        
        // Update thumbnail highlights
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    };

    function handleKeyboard(e) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    }


   /* Enhanced Cinematic Gallery Cards - 3D Mouse Tracking
    * ------------------------------------------------------ */
    function ssDynamic3DGalleryCards() {
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (!galleryItems.length) return;

        // 3D mouse tracking effect
        galleryItems.forEach((item) => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate 3D rotation based on mouse position
                const rotationX = ((y - rect.height / 2) / rect.height) * 10;
                const rotationY = ((x - rect.width / 2) / rect.width) * 10;
                
                // Apply cinematic 3D rotation with perspective
                item.style.transform = `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.04)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
            });

            // Subtle parallax effect on scroll
            window.addEventListener('scroll', () => {
                const rect = item.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const elementOffset = scrolled + rect.top;
                const distance = window.pageYOffset - elementOffset + rect.height / 2;
                
                // Parallax movement on background
                const parallax = distance * 0.05;
                const bgImages = item.querySelectorAll('img');
                bgImages.forEach(img => {
                    img.style.backgroundPosition = `center calc(50% + ${parallax}px)`;
                });
            });
        });
    }

    // Enhanced scroll reveal animations for cards
    function ssEnhancedCardAnimations() {
        const cards = document.querySelectorAll('.occasion-card');
        
        if (!cards.length || !window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.style.animation = `slideInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards`;
                    card.style.animationDelay = `${index * 0.1}s`;
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
    }

   /* Enhanced Cinematic Events Cards - Premium Interactions
    * ------------------------------------------------------ */
    function ssCinematicEventsCards() {
        
        const cards = document.querySelectorAll('.occasion-card');
        
        if (!cards.length) return;

        // Enhanced mouse tracking for cinematic effect
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on mouse position
                const rotationX = ((y - rect.height / 2) / rect.height) * 8;
                const rotationY = ((x - rect.width / 2) / rect.width) * 8;
                
                // Apply premium 3D rotation effect
                card.style.transform = `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.03)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            // Parallax effect on scroll
            window.addEventListener('scroll', () => {
                const rect = card.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const elementOffset = scrolled + rect.top;
                const distance = window.pageYOffset - elementOffset + rect.height / 2;
                
                // Subtle parallax movement
                const parallax = distance * 0.05;
                card.style.backgroundPosition = `center calc(50% + ${parallax}px)`;
            });
        });
    }


   /* Interactive World Map - Projects by Location
    * ------------------------------------------------------ */
    
    // Project data with global locations
    const projectsData = [
        {
            id: 1,
            title: 'Tokyo Corporate Summit',
            description: 'High-energy corporate event coverage showcasing innovation and leadership.',
            location: 'Tokyo, Japan',
            coordinates: [35.6762, 139.6503],
            year: 2024,
            type: 'corporate',
            image: '🏢',
            budget: '$45K',
            quality: '4K',
            duration: '2 days'
        },
        {
            id: 2,
            title: 'New York Music Festival',
            description: 'Live festival production capturing the energy of world-class musicians.',
            location: 'New York, USA',
            coordinates: [40.7128, -74.0060],
            year: 2024,
            type: 'music',
            image: '🎵',
            budget: '$65K',
            quality: '8K',
            duration: '3 days'
        },
        {
            id: 3,
            title: 'London Documentary',
            description: 'Cinematic documentary exploring urban culture and heritage.',
            location: 'London, UK',
            coordinates: [51.5074, -0.1278],
            year: 2023,
            type: 'documentary',
            image: '📽️',
            budget: '$85K',
            quality: '4K',
            duration: '4 weeks'
        },
        {
            id: 4,
            title: 'Sydney Commercial',
            description: 'Premium commercial production for international brand campaign.',
            location: 'Sydney, Australia',
            coordinates: [-33.8688, 151.2093],
            year: 2024,
            type: 'commercial',
            image: '📺',
            budget: '$95K',
            quality: '8K',
            duration: '2 weeks'
        },
        {
            id: 5,
            title: 'Dubai Event Production',
            description: 'Luxury event coverage for exclusive gala and brand activation.',
            location: 'Dubai, UAE',
            coordinates: [25.2048, 55.2708],
            year: 2024,
            type: 'event',
            image: '✨',
            budget: '$125K',
            quality: '6K',
            duration: '3 days'
        },
        {
            id: 6,
            title: 'Berlin Tech Conference',
            description: 'International technology summit with keynote speakers and panels.',
            location: 'Berlin, Germany',
            coordinates: [52.5200, 13.4050],
            year: 2023,
            type: 'corporate',
            image: '💼',
            budget: '$55K',
            quality: '4K',
            duration: '2 days'
        },
        {
            id: 7,
            title: 'Los Angeles Music Video',
            description: 'Cinematic music video production with high-end visual effects.',
            location: 'Los Angeles, USA',
            coordinates: [34.0522, -118.2437],
            year: 2024,
            type: 'music',
            image: '🎬',
            budget: '$75K',
            quality: '8K',
            duration: '3 weeks'
        },
        {
            id: 8,
            title: 'Paris Fashion Event',
            description: 'Haute couture event coverage showcasing luxury and elegance.',
            location: 'Paris, France',
            coordinates: [48.8566, 2.3522],
            year: 2023,
            type: 'event',
            image: '👗',
            budget: '$105K',
            quality: '6K',
            duration: '2 days'
        },
        {
            id: 9,
            title: 'Singapore Documentary',
            description: 'Urban documentary exploring modern Asian metropolis.',
            location: 'Singapore',
            coordinates: [1.3521, 103.8198],
            year: 2024,
            type: 'documentary',
            image: '🏙️',
            budget: '$70K',
            quality: '4K',
            duration: '3 weeks'
        },
        {
            id: 10,
            title: 'Shanghai Commercial',
            description: 'Brand commercial for luxury automotive manufacturer.',
            location: 'Shanghai, China',
            coordinates: [31.2304, 121.4737],
            year: 2024,
            type: 'commercial',
            image: '🚗',
            budget: '$90K',
            quality: '8K',
            duration: '2 weeks'
        }
    ];

    // Initialize interactive world map
    function ssInteractiveWorldMap() {
        
        const mapContainer = document.getElementById('projectsMap');
        if (!mapContainer) return;

        // Initialize Leaflet map
        const map = L.map('projectsMap', {
            center: [20, 0],
            zoom: 2.5,
            minZoom: 2,
            maxZoom: 6,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: true
        });

        // Add dark tile layer (CartoDB Voyager Dark)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: false,
            maxZoom: 19
        }).addTo(map);

        // Create marker cluster group
        const markerClusterGroup = L.markerClusterGroup({
            maxClusterRadius: 80,
            disableClusteringAtZoom: 4,
            iconCreateFunction: function(cluster) {
                const childCount = cluster.getChildCount();
                const color = '#ffd700';
                const size = childCount > 5 ? 45 : 40;
                return L.divIcon({
                    html: `<div style="background: linear-gradient(135deg, ${color}40 0%, ${color}20 100%); border: 2px solid ${color}; border-radius: 50%; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);">${childCount}</div>`,
                    iconSize: [size, size],
                    className: 'cluster-icon'
                });
            }
        });

        // Define marker icons for different project types
        const markerIcons = {
            documentary: { color: '#ff6b6b', icon: '📹' },
            commercial: { color: '#7db3ff', icon: '📺' },
            music: { color: '#ff92c4', icon: '🎵' },
            corporate: { color: '#79ffb6', icon: '💼' },
            event: { color: '#d6a0ff', icon: '✨' }
        };

        // Create markers for each project
        const markers = {};
        projectsData.forEach((project) => {
            const iconConfig = markerIcons[project.type] || markerIcons.corporate;
            
            const markerIcon = L.divIcon({
                html: `<div class="project-marker marker-${project.type}" title="${project.title}">${iconConfig.icon}</div>`,
                iconSize: [40, 40],
                className: 'custom-marker'
            });

            const marker = L.marker(project.coordinates, { icon: markerIcon });
            marker.projectData = project;
            markerClusterGroup.addLayer(marker);

            // Marker hover tooltip
            marker.on('mouseover', function(e) {
                showProjectTooltip(e.latlng, project);
            });

            marker.on('mouseout', function() {
                hideProjectTooltip();
            });

            // Marker click - open modal
            marker.on('click', function() {
                openProjectModal(project);
            });

            markers[project.id] = marker;
        });

        map.addLayer(markerClusterGroup);

        // Tooltip management
        let currentTooltip = null;
        let tooltipListener = null;

        function showProjectTooltip(latLng, project) {
            // Remove previous tooltip if exists
            if (currentTooltip) {
                currentTooltip.remove();
                if (tooltipListener) {
                    document.removeEventListener('mousemove', tooltipListener);
                }
            }

            const tooltipContainer = document.createElement('div');
            tooltipContainer.className = 'project-tooltip';
            tooltipContainer.innerHTML = `
                <div class="tooltip-title">${project.title}</div>
                <div class="tooltip-type">${project.type}</div>
                <div class="tooltip-location">📍 ${project.location}</div>
                <div class="tooltip-year">Year: ${project.year}</div>
            `;

            document.body.appendChild(tooltipContainer);
            currentTooltip = tooltipContainer;

            // Position tooltip following mouse
            tooltipListener = function(e) {
                tooltipContainer.style.position = 'fixed';
                tooltipContainer.style.left = (e.pageX + 15) + 'px';
                tooltipContainer.style.top = (e.pageY + 15) + 'px';
            };
            document.addEventListener('mousemove', tooltipListener);
        }

        function hideProjectTooltip() {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
                if (tooltipListener) {
                    document.removeEventListener('mousemove', tooltipListener);
                    tooltipListener = null;
                }
            }
        }

        // Modal management
        function openProjectModal(project) {
            const modal = document.getElementById('projectModal');
            
            // Populate modal content using existing IDs
            document.getElementById('modalImage').textContent = project.image;
            document.getElementById('modalYear').textContent = project.year;
            document.getElementById('modalLocation').textContent = project.location;
            document.getElementById('modalType').textContent = project.type;
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalBudget').textContent = project.budget;
            document.getElementById('modalQuality').textContent = project.quality;
            document.getElementById('modalDuration').textContent = project.duration;

            modal.classList.add('active');
        }

        // Modal close functionality
        const modal = document.getElementById('projectModal');
        const closeBtn = document.querySelector('.project-modal-close');
        
        closeBtn?.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        modal?.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Legend filtering
        const legendItems = document.querySelectorAll('.legend-item');
        legendItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const projectType = this.dataset.type;
                
                // Toggle active state
                this.classList.toggle('active');

                // Filter markers
                const activeTypes = Array.from(legendItems)
                    .filter(li => li.classList.contains('active'))
                    .map(li => li.dataset.type);

                markerClusterGroup.eachLayer(function(marker) {
                    const show = activeTypes.length === 0 || activeTypes.includes(marker.projectData.type);
                    marker.setOpacity(show ? 1 : 0.2);
                });
            });
        });
    }

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
        ssDynamic3DGalleryCards();
        ssCinematicEventsCards();
        ssEnhancedCardAnimations();
        ssInteractiveWorldMap();

    })();

})(document.documentElement);