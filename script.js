document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function() {
            if (burger) burger.classList.remove('active');
            if (nav) nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (burger) burger.classList.remove('active');
                if (nav) nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Initialize main gallery swiper
    const gallerySwiperEl = document.querySelector('.gallery-swiper');
    if (gallerySwiperEl) {
        const gallerySwiper = new Swiper(gallerySwiperEl, {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        
        // Add zoomable class to gallery images
        gallerySwiperEl.querySelectorAll('.swiper-slide img').forEach(img => {
            img.classList.add('zoomable-image');
            img.style.cursor = 'pointer';
        });
    }
    
    // Initialize room swipers
    document.querySelectorAll('.room-swiper, .room-card .swiper, .econom-room__gallery').forEach(el => {
        new Swiper(el, {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        
        // Add zoomable class to room images
        el.querySelectorAll('.swiper-slide img').forEach(img => {
            img.classList.add('zoomable-image');
            img.style.cursor = 'pointer';
        });
    });
    
    // Room tabs functionality
    const tabButtons = document.querySelectorAll('.tabs__btn');
    const tabPanes = document.querySelectorAll('.tabs__pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding pane
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Initialize hero swiper
    const heroSwiperEl = document.querySelector('.hero__background');
    if (heroSwiperEl) {
        new Swiper(heroSwiperEl, {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 2000
        });
    }
    
    // Image modal functionality
    const modal = document.getElementById("imageModal");
    if (modal) {
    let modalSwiper;
    const modalSwiperWrapper = document.querySelector('.image-modal-swiper .swiper-wrapper');
    const closeModal = document.querySelector(".close-image-modal");
    
    // Add click handler for all zoomable images
    document.querySelectorAll('.zoomable-image').forEach(img => {
        img.addEventListener('click', function() {
            // Get all images from the current swiper
            const swiperContainer = this.closest('.swiper');
            if (!swiperContainer) return;
            
            const slides = swiperContainer.querySelectorAll('.swiper-slide');
            const images = Array.from(slides).map(slide => {
                const img = slide.querySelector('img');
                return {
                    src: img.src,
                    alt: img.alt || ''
                };
            });
            
            // Find the index of the current slide (not image)
            const currentSlide = this.closest('.swiper-slide');
            const currentIndex = Array.from(slides).indexOf(currentSlide);
            
            // Fill the modal swiper
            if (modalSwiperWrapper) {
                modalSwiperWrapper.innerHTML = '';
                images.forEach(image => {
                    modalSwiperWrapper.innerHTML += `
                        <div class="swiper-slide">
                            <img src="${image.src}" alt="${image.alt}" class="image-modal-img">
                        </div>
                    `;
                });
            }
            
            // Show the modal
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            
            // Initialize or update Swiper
            if (modalSwiper) {
                modalSwiper.destroy(); // Destroy existing swiper
            }
            
            modalSwiper = new Swiper('.image-modal-swiper', {
                initialSlide: currentIndex >= 0 ? currentIndex : 0,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                keyboard: {
                    enabled: true,
                },
                loop: true,
            });
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = "none";
            document.body.style.overflow = "";
        });
    }
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    });
    
    // Close with ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'var(--white)';
                header.style.boxShadow = 'var(--shadow)';
            }
        });
    }
});

function handleResize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    if (window.innerWidth <= 576) {
        document.querySelectorAll('.swiper').forEach(swiper => {
            swiper.style.width = '100%';
        });
    }
}

window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);
setTimeout(handleResize, 500);