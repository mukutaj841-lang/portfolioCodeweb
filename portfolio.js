// ============================================
// SCROLL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections with fade-in class
    const fadeElements = document.querySelectorAll('.section-fade');
    fadeElements.forEach(el => observer.observe(el));

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.geometric-shapes .shape');
        
        if (hero) {
            // Subtle parallax for hero content without pushing it below the fold
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                const viewportHeight = window.innerHeight;
                const limitedScroll = Math.min(scrolled, viewportHeight);
                const parallaxValue = limitedScroll * 0.22;
                heroContent.style.transform = `translate3d(0, ${-parallaxValue}px, 0)`;
                const newOpacity = 1 - (limitedScroll / viewportHeight) * 0.4;
                heroContent.style.opacity = Math.max(0.6, newOpacity);
            }
        }
        
        // Parallax for geometric shapes
        shapes.forEach((shape, index) => {
            if (scrolled < window.innerHeight) {
                const speed = (index + 1) * 0.1;
                const yPos = -(scrolled * speed);
                shape.style.transform += ` translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ============================================
    // COPY EMAIL FUNCTIONALITY
    // ============================================
    
    const copyButton = document.getElementById('copyEmail');
    const emailText = 'mukutaj841@gmail.com';
    
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(emailText).then(function() {
                // Visual feedback
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.style.background = '#1a1a1a';
                copyButton.style.color = '#F5F3F0';
                
                setTimeout(function() {
                    copyButton.textContent = originalText;
                    copyButton.style.background = '';
                    copyButton.style.color = '';
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy:', err);
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR CTA BUTTON
    // ============================================
    
    const ctaButton = document.querySelector('.btn-cta-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.querySelector('.services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ============================================
    // ENHANCED HOVER EFFECTS FOR SERVICE CARDS
    // ============================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ============================================
    // TEXT ANIMATION ON LOAD
    // ============================================
    
    const titleLines = document.querySelectorAll('.title-line, .title-highlight');
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });

    // ============================================
    // CURSOR FOLLOW EFFECT (Optional enhancement)
    // ============================================
    
    // Uncomment to enable cursor follow effect
    /*
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    */

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll listener
    const optimizedScroll = debounce(updateParallax, 10);
    window.addEventListener('scroll', optimizedScroll, { passive: true });
});

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate geometric shapes on load
    const shapes = document.querySelectorAll('.geometric-shapes .shape');
    shapes.forEach((shape, index) => {
        setTimeout(() => {
            shape.style.opacity = '0.15';
        }, index * 200);
    });

    // ============================================
    // PROJECT FILTERING (for produit.html)
    // ============================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

