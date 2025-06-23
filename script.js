document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('toggle-theme');
    const html = document.documentElement;
    
    // Set initial theme based on preference or system setting
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Project Slider
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.project-dots .dot');
    const prevBtn = document.querySelector('.project-prev');
    const nextBtn = document.querySelector('.project-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // Button navigation
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideInterval();
    });
    
    // Auto-rotation
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Pause on hover
    const slider = document.querySelector('.project-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlideInterval);

    // Contact Form Handling
    const contactForm = document.getElementById('project-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (contactForm) {
        // Toggle required fields based on contact method
        const emailField = contactForm.querySelector('#email');
        const phoneField = contactForm.querySelector('#phone');
        const contactMethods = contactForm.querySelectorAll('input[name="contactMethod"]');
        
        contactMethods.forEach(method => {
            method.addEventListener('change', function() {
                if (this.value === 'email') {
                    emailField.required = true;
                    phoneField.required = false;
                } else {
                    emailField.required = false;
                    phoneField.required = true;
                }
            });
        });
        
    // Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('project-form');
    const emailField = document.getElementById('email-field');
    const phoneField = document.getElementById('phone-field');
    const contactEmail = document.getElementById('contact-email');
    const contactWhatsapp = document.getElementById('contact-whatsapp');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    const errorMessageText = document.getElementById('error-message-text');
    const closeButtons = document.querySelectorAll('.close-message');

    // Toggle contact method fields
    function toggleContactFields() {
        if (contactEmail.checked) {
            emailField.style.display = 'block';
            phoneField.style.display = 'none';
            document.getElementById('email').required = true;
            document.getElementById('phone').required = false;
        } else {
            emailField.style.display = 'none';
            phoneField.style.display = 'block';
            document.getElementById('email').required = false;
            document.getElementById('phone').required = true;
        }
    }

    // Initialize fields
    toggleContactFields();

    // Add event listeners for radio buttons
    contactEmail.addEventListener('change', toggleContactFields);
    contactWhatsapp.addEventListener('change', toggleContactFields);

    // Close message buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            successMessage.classList.remove('active');
            errorMessage.classList.remove('active');
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.querySelector('.button-text').textContent;
            const formData = new FormData(this);
            const contactMethod = formData.get('contactMethod');
            
            // Get form values
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const project = formData.get('project');
            
            // Validate contact method
            if (contactMethod === 'email' && !email) {
                showError('nxuthokozane@outlook.com');
                return;
            }
            
            if (contactMethod === 'whatsapp' && !phone) {
                showError('+27762485764');
                return;
            }
            
            // Show sending state
            submitBtn.disabled = true;
            submitBtn.querySelector('.button-text').textContent = 'Sending...';
            
            // Prepare message
            const message = `New message from ${name}:\n\n${project}\n\nPreferred contact: ${contactMethod === 'email' ? email : 'WhatsApp: ' + phone}`;
            
            if (contactMethod === 'email') {
                // Send via email using FormSubmit
                const emailUrl = 'https://formsubmit.co/ajax/nxuthokozane@outlook.com';
                
                fetch(emailUrl, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: 'New Project Inquiry - Your Portfolio'
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok');
                })
                .then(data => {
                    showSuccess();
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    showError('Failed to send message. Please try again later.');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.button-text').textContent = originalText;
                });
                
            } else {
                // Send via WhatsApp
                const whatsappUrl = `https://wa.me/+27762485764?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                
                showSuccess();
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('.button-text').textContent = originalText;
            }
        });
    }

    function showSuccess() {
        successMessage.classList.add('active');
        errorMessage.classList.remove('active');
    }

    function showError(message) {
        errorMessageText.textContent = message;
        errorMessage.classList.add('active');
        successMessage.classList.remove('active');
    }
});
}

    // Stats Bars Animation
    const statBars = document.querySelectorAll('.stat-progress');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width; // Force animation
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statBars.forEach(bar => statsObserver.observe(bar));

    // Scroll Animations
    const animateElements = document.querySelectorAll('.animate-from-left, .animate-from-right, .animate-card');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(el => animationObserver.observe(el));

    // Initialize
    function init() {
        showSlide(0);
        startSlideInterval();
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }

    init();
});