// ALAB Monitoring Mobile - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 ALAB Mobile Monitoring loaded');
    
    // Mobile Header Navigation
    const drawer = document.getElementById('alabMhDrawer');
    const openBtn = document.getElementById('alabMhOpen');
    const closeBtn = document.getElementById('alabMhClose');
    const backdrop = document.getElementById('alabMhBackdrop');
    const panel = drawer.querySelector('.alab-mh__panel');

    let scrollY = 0;

    function trapTab(container, e){
        if(e.key !== 'Tab') return;
        const f = container.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
        if(!f.length) return;
        const first = f[0], last = f[f.length-1];
        if(e.shiftKey && document.activeElement === first){ 
            e.preventDefault(); 
            last.focus(); 
        } else if(!e.shiftKey && document.activeElement === last){ 
            e.preventDefault(); 
            first.focus(); 
        }
    }

    function openDrawer(){
        scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        document.body.classList.add('alab-no-scroll');
        document.body.style.top = `-${scrollY}px`;

        drawer.classList.add('alab--open');
        drawer.setAttribute('aria-hidden','false');
        openBtn.setAttribute('aria-expanded','true');

        panel.focus();
    }

    function closeDrawer(){
        drawer.classList.remove('alab--open');
        drawer.setAttribute('aria-hidden','true');
        openBtn.setAttribute('aria-expanded','false');

        document.body.classList.remove('alab-no-scroll');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);

        openBtn.focus();
    }

    // Events
    openBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    
    drawer.addEventListener('keydown', e => {
        if(e.key === 'Escape') closeDrawer();
        trapTab(drawer, e);
    });
    
    panel.setAttribute('tabindex','-1');

    // Accordion in drawer
    drawer.querySelectorAll('.alab-mh__acc').forEach(acc=>{
        const trigger = acc.querySelector('.alab-mh__acc-trigger');
        const panel = acc.querySelector('.alab-mh__acc-panel');
        trigger.addEventListener('click', ()=>{
            const isOpen = acc.classList.toggle('alab--open');
            trigger.setAttribute('aria-expanded', isOpen);
            panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';
        });
    });

    // Close on any link click
    drawer.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', closeDrawer);
    });

    // Initialize Swiper with 3D Coverflow Effect
    const functionsSwiper = new Swiper('.mobile-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 15
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25
            }
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Bottom Navigation Active State
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                bottomNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll for bottom navigation
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Modal Function
    window.showContactModal = function() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal-mobile';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>Monitoring anfragen</h2>
                <form class="contact-form" id="mobileContactForm">
                    <input type="text" name="name" placeholder="Name" required>
                    <input type="email" name="email" placeholder="E-Mail" required>
                    <input type="tel" name="phone" placeholder="Telefon">
                    <input type="text" name="power" placeholder="Anlagenleistung (kWp)">
                    <textarea name="message" placeholder="Ihre Nachricht" rows="4"></textarea>
                    <button type="submit" class="btn-submit">Anfrage senden</button>
                </form>
                <div class="success-message" style="display: none;">
                    <div class="success-icon">✓</div>
                    <h3>Erfolgreich gesendet!</h3>
                    <p>Wir melden uns innerhalb von 24h bei Ihnen.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .contact-modal-mobile {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: flex;
                align-items: flex-end;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                padding: 30px 20px;
                border-radius: 20px 20px 0 0;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #999;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: grid;
                place-items: center;
            }
            
            .modal-content h2 {
                margin-bottom: 20px;
                color: #0f2533;
                font-size: 22px;
                font-weight: 800;
            }
            
            .contact-form {
                display: grid;
                gap: 12px;
            }
            
            .contact-form input,
            .contact-form textarea {
                padding: 12px 14px;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                font-family: 'Montserrat', sans-serif;
                font-size: 14px;
            }
            
            .contact-form input:focus,
            .contact-form textarea:focus {
                outline: none;
                border-color: #d4af37;
            }
            
            .btn-submit {
                background: linear-gradient(135deg, #d4af37 0%, #c49d2f 100%);
                color: white;
                border: none;
                padding: 14px 28px;
                border-radius: 10px;
                font-weight: 700;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
            }
            
            .btn-submit:disabled {
                opacity: 0.6;
            }
            
            .success-message {
                text-align: center;
                padding: 40px 20px;
            }
            
            .success-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #d4af37 0%, #c49d2f 100%);
                color: white;
                font-size: 32px;
                font-weight: 700;
                border-radius: 50%;
                display: grid;
                place-items: center;
                margin: 0 auto 20px;
                animation: scaleIn 0.5s ease;
            }
            
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            
            .success-message h3 {
                color: #0f2533;
                font-size: 20px;
                margin-bottom: 10px;
            }
            
            .success-message p {
                color: #6b7280;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.modal-backdrop').addEventListener('click', () => {
            modal.remove();
        });
        
        // Form submission with Make.com webhook
        const form = modal.querySelector('#mobileContactForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        timestamp: new Date().toISOString(),
                        source: 'ALAB Mobile Website'
                    })
                });
                
                // Show success message
                form.style.display = 'none';
                modal.querySelector('.success-message').style.display = 'block';
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    modal.remove();
                }, 3000);
                
            } catch (error) {
                console.error('Error:', error);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Anfrage senden';
                alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            }
        });
    }

    // Add touch feedback for interactive elements
    const touchElements = document.querySelectorAll('button, .platform-chip, .flow-node, .package-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    console.log('✅ Mobile features initialized!');
});
