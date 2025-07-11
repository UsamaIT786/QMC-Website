// Main JavaScript for Frontend Pages - Loads content from localStorage

// Load dashboard data from localStorage
function loadDashboardData() {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return null;
        }
    }
    return null;
}

// Load and populate home page content
function loadHomeContent() {
    const data = loadDashboardData();
    if (data && data.home) {
        const home = data.home;
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content h2');
        const heroDescription = document.querySelector('.hero-content p');
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroTitle && home.title) heroTitle.textContent = home.title;
        if (heroSubtitle && home.subtitle) heroSubtitle.textContent = home.subtitle;
        if (heroDescription && home.description) heroDescription.textContent = home.description;
        if (heroImage && home.image) heroImage.src = home.image;
    }
}

// Load and populate about page content
function loadAboutContent() {
    const data = loadDashboardData();
    if (data && data.about) {
        const about = data.about;
        
        const aboutTitle = document.querySelector('.about-content h2');
        const aboutText = document.querySelector('.about-content p');
        const aboutImage = document.querySelector('.about-image img');
        
        if (aboutTitle && about.title) aboutTitle.textContent = about.title;
        if (aboutText && about.content) aboutText.textContent = about.content;
        if (aboutImage && about.image) aboutImage.src = about.image;
    }
}

// Load and populate services content
function loadServicesContent() {
    const data = loadDashboardData();
    if (data && data.services && data.services.length > 0) {
        const servicesContainer = document.querySelector('.services-grid');
        if (servicesContainer) {
            servicesContainer.innerHTML = '';
            
            data.services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.innerHTML = `
                    <i class="${service.icon}"></i>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                `;
                servicesContainer.appendChild(serviceCard);
            });
        }
    }
}

// Load and populate portfolio content
function loadPortfolioContent() {
    const data = loadDashboardData();
    if (data && data.portfolio && data.portfolio.length > 0) {
        const portfolioContainer = document.querySelector('.portfolio-grid');
        if (portfolioContainer) {
            portfolioContainer.innerHTML = '';
            
            data.portfolio.forEach(item => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item';
                portfolioItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.category}</p>
                    </div>
                `;
                portfolioContainer.appendChild(portfolioItem);
            });
        }
    }
}

// Load and populate blog content
function loadBlogContent() {
    const data = loadDashboardData();
    if (data && data.blog && data.blog.length > 0) {
        const blogContainer = document.querySelector('.blog-grid');
        if (blogContainer) {
            blogContainer.innerHTML = '';
            
            data.blog.forEach(post => {
                const blogPost = document.createElement('article');
                blogPost.className = 'blog-post';
                blogPost.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <div class="blog-content">
                        <h3>${post.title}</h3>
                        <p>${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
                        <span class="blog-date">${new Date(post.date).toLocaleDateString()}</span>
                    </div>
                `;
                blogContainer.appendChild(blogPost);
            });
        }
    }
}

// Load and populate testimonials content
function loadTestimonialsContent() {
    const data = loadDashboardData();
    if (data && data.testimonials && data.testimonials.length > 0) {
        const testimonialsContainer = document.querySelector('.testimonials-grid');
        if (testimonialsContainer) {
            testimonialsContainer.innerHTML = '';
            
            data.testimonials.forEach(testimonial => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                testimonialCard.innerHTML = `
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <p>${testimonial.content}</p>
                    <h4>${testimonial.name}</h4>
                `;
                testimonialsContainer.appendChild(testimonialCard);
            });
        }
    }
}

// Load and populate FAQs content
function loadFAQsContent() {
    const data = loadDashboardData();
    if (data && data.faq && data.faq.length > 0) {
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            faqContainer.innerHTML = '';
            
            data.faq.forEach(faq => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.innerHTML = `
                    <h3>${faq.question}</h3>
                    <p>${faq.answer}</p>
                `;
                faqContainer.appendChild(faqItem);
            });
        }
    }
}

// Load and populate contact content
function loadContactContent() {
    const data = loadDashboardData();
    if (data && data.contact) {
        const contact = data.contact;
        
        const address = document.querySelector('.contact-info .address');
        const phone = document.querySelector('.contact-info .phone');
        const email = document.querySelector('.contact-info .email');
        
        if (address && contact.address) address.textContent = contact.address;
        if (phone && contact.phone) phone.textContent = contact.phone;
        if (email && contact.email) email.textContent = contact.email;
    }
}

// Initialize page content based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            loadHomeContent();
            loadServicesContent();
            break;
        case 'about.html':
            loadAboutContent();
            break;
        case 'services.html':
            loadServicesContent();
            break;
        case 'portfolio.html':
            loadPortfolioContent();
            break;
        case 'blog.html':
            loadBlogContent();
            break;
        case 'testimonials.html':
            loadTestimonialsContent();
            break;
        case 'contact.html':
            loadContactContent();
            break;
        case 'privacy.html':
            loadFAQsContent();
            break;
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('#mobileMenuToggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        console.log('Mobile menu elements found:', { mobileMenuToggle, navMenu }); // Debug log
        
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu clicked!'); // Debug log
            navMenu.classList.toggle('show');
            console.log('Nav menu show:', navMenu.classList.contains('show')); // Debug log
        });
    } else {
        console.error('Mobile menu elements not found:', { mobileMenuToggle, navMenu });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });
    
    // Close mobile menu when clicking on menu items
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    });
});

// Utility function to check if data exists
function hasData() {
    const data = loadDashboardData();
    return data && Object.keys(data).length > 0;
}

// Show default content if no data exists
function showDefaultContent() {
    if (!hasData()) {
        console.log('No dashboard data found, showing default content');
        // You can add default content here if needed
    }
} 