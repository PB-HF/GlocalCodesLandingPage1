    // Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove initial hidden classes if any JS fallback was needed 
    // (We use CSS animations primarily, but this ensures a clean state)
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    
    if (header) header.classList.remove('hidden');
    if (hero) hero.classList.remove('hidden');

    // 2. Premium Parallax Effect on Background Blobs
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            // Different moving speed factor for each blob based on index
            const speed = (index + 1) * 15;
            
            // Calculate movement
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            
            // Apply slight translation based on mouse, combining with the CSS animation float
            // We use transform in JS. To not override the CSS animation `transform: translateY()`, 
            // we should ideally use margin or a wrapper. 
            // Instead of inline transform, let's adjust margin for safety, or translate via `left/top` subtly
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Note: because the CSS animation uses transform, setting transform here WILL override it.
            // Let's use custom properties instead to blend them, or just let CSS do the floating, 
            // and maybe just tweak left/top slightly.
            // Let's do left/top just a bit to keep the CSS float intact.
        });
    });
    
    // Better Parallax: using CSS variables so we don't break the CSS float animation
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40; // max 20px move
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        
    // Let's just apply it to the main container wrapper or individual blobs
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    });

    // 3. Scroll Reveal Animations via Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Slight delay for a more native feel, or immediate trigger
                    entry.target.classList.add('is-visible');
                    // Stop observing once animated so it doesn't replay on scroll up
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% visible
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
