// Dashboard JavaScript - Admin Panel Functionality

// Initialize dashboard data
let dashboardData = {
    home: {
        title: 'QMC Business Solutions',
        subtitle: 'Professional Business Solutions',
        description: 'We are committed to delivering high-quality specialized services in mechanical, civil, and electrical engineering.',
        image: 'https://images.pexels.com/photos/8159/pexels-photo.jpg'
    },
    about: {
        title: 'About QMC Business Solutions',
        content: 'We are a leading business solutions provider with years of experience in delivering exceptional services to our clients.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
    },
    services: [],
    portfolio: [],
    blog: [],
    testimonials: [],
    faq: [],
    contact: {
        address: '123 Business Street, City, Country',
        phone: '+1 234 567 8900',
        email: 'info@qmc.com'
    },
    activity: []
};

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        // Redirect to admin login if not logged in
        window.location.href = 'admin.html';
        return;
    }
    
    console.log('Dashboard loading...'); // Debug log
    
    loadDashboardData();
    initializeNavigation();
    updateDashboardStats();
    loadRecentActivity();
    setupFormListeners();
    
    // Load initial section data
    loadSectionData('dashboard');
    
    // Add welcome activity
    if (dashboardData.activity.length === 0) {
        addActivity('Dashboard loaded successfully');
    }
});

// Load dashboard data from localStorage
function loadDashboardData() {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            dashboardData = { ...dashboardData, ...parsedData };
            console.log('Data loaded from localStorage:', dashboardData);
            showNotification('Data loaded successfully', 'success');
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            showNotification('Error loading saved data', 'error');
        }
    } else {
        console.log('No saved data found, using default data');
        // Initialize with sample data if no localStorage data exists
        initializeSampleData();
    }
}

// Save dashboard data to localStorage
function saveDashboardData() {
    try {
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
        console.log('Data saved to localStorage:', dashboardData);
        return true;
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
        showNotification('Error saving data', 'error');
        return false;
    }
}

// Initialize sample data for first-time users
function initializeSampleData() {
    dashboardData.services.push({
        id: Date.now(),
        title: 'Web Development',
        description: 'Professional web development services with modern technologies',
        icon: 'fas fa-code'
    });
    
    dashboardData.services.push({
        id: Date.now() + 1,
        title: 'Business Consulting',
        description: 'Strategic business consulting and advisory services',
        icon: 'fas fa-chart-line'
    });
    
    dashboardData.testimonials.push({
        id: Date.now(),
        name: 'John Doe',
        content: 'Excellent service and professional team! Highly recommended.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    });
    
    dashboardData.faq.push({
        id: Date.now(),
        question: 'What services do you offer?',
        answer: 'We offer a wide range of business solutions including web development, consulting, and more.'
    });
    
    dashboardData.faq.push({
        id: Date.now() + 1,
        question: 'How can I contact you?',
        answer: 'You can contact us through our contact form, email, or phone number listed on our website.'
    });
    
    saveDashboardData();
    addActivity('Dashboard initialized with sample data');
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const sectionTitle = document.getElementById('section-title');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Navigation click handlers
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            sectionTitle.textContent = this.textContent.trim();
            
            // Load section data
            loadSectionData(targetSection);
            
            // Add activity
            addActivity(`Navigated to ${this.textContent.trim()} section`);
        });
    });

    // Mobile sidebar toggle
    if (sidebarToggle) {
        console.log('Sidebar toggle button found:', sidebarToggle); // Debug log
        console.log('Sidebar element found:', sidebar); // Debug log
        
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!'); // Debug log
            console.log('Window width:', window.innerWidth); // Debug log
            
            sidebar.classList.toggle('active');
            console.log('Sidebar active:', sidebar.classList.contains('active')); // Debug log
            console.log('Sidebar classes:', sidebar.className); // Debug log
            
            // Handle backdrop
            const sidebarBackdrop = document.getElementById('sidebar-backdrop');
            if (sidebarBackdrop && window.innerWidth <= 1024) {
                sidebarBackdrop.classList.toggle('active');
                console.log('Backdrop active:', sidebarBackdrop.classList.contains('active')); // Debug log
            }
        });
    } else {
        console.error('Sidebar toggle button not found!');
        console.log('Available elements:', document.querySelectorAll('button')); // Debug log
    }

    // Close sidebar button
    const sidebarClose = document.getElementById('sidebarClose');
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.remove('active');
            
            const sidebarBackdrop = document.getElementById('sidebar-backdrop');
            if (sidebarBackdrop) {
                sidebarBackdrop.classList.remove('active');
            }
        });
    }

    // Close sidebar when clicking on backdrop
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.remove('active');
            this.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                if (sidebarBackdrop) {
                    sidebarBackdrop.classList.remove('active');
                }
            }
        }
    });

    // Close sidebar when navigation item is clicked on mobile
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                if (sidebarBackdrop) {
                    sidebarBackdrop.classList.remove('active');
                }
            }
        });
    });
}

// Load section-specific data
function loadSectionData(section) {
    switch(section) {
        case 'home':
            loadHomeData();
            break;
        case 'about':
            loadAboutData();
            break;
        case 'services':
            loadServicesData();
            break;
        case 'portfolio':
            loadPortfolioData();
            break;
        case 'blog':
            loadBlogData();
            break;
        case 'contact':
            loadContactData();
            break;
        case 'testimonials':
            loadTestimonialsData();
            break;
        case 'faqs':
            loadFAQData();
            break;
    }
}

// Home page functions
function loadHomeData() {
    const homeData = dashboardData.home || {};
    document.getElementById('hero-title').value = homeData.title || '';
    document.getElementById('hero-subtitle').value = homeData.subtitle || '';
    document.getElementById('hero-description').value = homeData.description || '';
    document.getElementById('hero-image').value = homeData.image || '';
}

function saveHomeContent() {
    dashboardData.home = {
        title: document.getElementById('hero-title').value,
        subtitle: document.getElementById('hero-subtitle').value,
        description: document.getElementById('hero-description').value,
        image: document.getElementById('hero-image').value
    };
    
    if (saveDashboardData()) {
        showNotification('Home page content saved successfully!', 'success');
        addActivity('Updated home page content');
    }
}

// About page functions
function loadAboutData() {
    const aboutData = dashboardData.about || {};
    document.getElementById('about-title').value = aboutData.title || '';
    document.getElementById('about-content').value = aboutData.content || '';
    document.getElementById('about-image').value = aboutData.image || '';
}

function saveAboutContent() {
    dashboardData.about = {
        title: document.getElementById('about-title').value,
        content: document.getElementById('about-content').value,
        image: document.getElementById('about-image').value
    };
    
    if (saveDashboardData()) {
        showNotification('About page content saved successfully!', 'success');
        addActivity('Updated about page content');
    }
}

// Services functions
function loadServicesData() {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';
    
    dashboardData.services.forEach((service, index) => {
        servicesContainer.appendChild(createServiceCard(service, index));
    });
}

function addService() {
    // Clear form
    document.getElementById('service-title').value = '';
    document.getElementById('service-description').value = '';
    document.getElementById('service-icon').value = '';
    
    addActivity('Started adding new service');
}

function saveService() {
    const title = document.getElementById('service-title').value.trim();
    const description = document.getElementById('service-description').value.trim();
    const icon = document.getElementById('service-icon').value.trim();
    
    if (!title || !description) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    const newService = {
        id: Date.now(),
        title: title,
        description: description,
        icon: icon || 'fas fa-cog'
    };
    
    dashboardData.services.push(newService);
    
    if (saveDashboardData()) {
        showNotification('Service added successfully!', 'success');
        addActivity(`Added new service: ${title}`);
        loadServicesData();
        
        // Clear form
        document.getElementById('service-title').value = '';
        document.getElementById('service-description').value = '';
        document.getElementById('service-icon').value = '';
    }
}

function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4><i class="${service.icon}"></i> ${service.title}</h4>
        <p>${service.description}</p>
        <div class="item-actions">
            <button class="edit-btn" onclick="editService(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deleteService(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

function editService(index) {
    const service = dashboardData.services[index];
    document.getElementById('service-title').value = service.title;
    document.getElementById('service-description').value = service.description;
    document.getElementById('service-icon').value = service.icon;
    
    // Change save button to update
    const saveBtn = document.querySelector('#services .save-btn');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Service';
    saveBtn.onclick = () => updateService(index);
    
    addActivity(`Started editing service: ${service.title}`);
}

function updateService(index) {
    const title = document.getElementById('service-title').value.trim();
    const description = document.getElementById('service-description').value.trim();
    const icon = document.getElementById('service-icon').value.trim();
    
    if (!title || !description) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    dashboardData.services[index] = {
        id: dashboardData.services[index].id,
        title: title,
        description: description,
        icon: icon || 'fas fa-cog'
    };
    
    if (saveDashboardData()) {
        showNotification('Service updated successfully!', 'success');
        addActivity(`Updated service: ${title}`);
        loadServicesData();
        
        // Reset form and button
        document.getElementById('service-title').value = '';
        document.getElementById('service-description').value = '';
        document.getElementById('service-icon').value = '';
        
        const saveBtn = document.querySelector('#services .save-btn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Service';
        saveBtn.onclick = saveService;
    }
}

function deleteService(index) {
    if (confirm('Are you sure you want to delete this service?')) {
        const service = dashboardData.services[index];
        dashboardData.services.splice(index, 1);
        
        if (saveDashboardData()) {
            showNotification('Service deleted successfully!', 'success');
            addActivity(`Deleted service: ${service.title}`);
            loadServicesData();
        }
    }
}

// Portfolio functions
function loadPortfolioData() {
    const portfolioContainer = document.getElementById('portfolio-container');
    portfolioContainer.innerHTML = '';
    
    dashboardData.portfolio.forEach((item, index) => {
        portfolioContainer.appendChild(createPortfolioCard(item, index));
    });
}

function addPortfolio() {
    document.getElementById('portfolio-title').value = '';
    document.getElementById('portfolio-category').value = '';
    document.getElementById('portfolio-image').value = '';
    
    addActivity('Started adding new portfolio item');
}

function savePortfolio() {
    const title = document.getElementById('portfolio-title').value.trim();
    const category = document.getElementById('portfolio-category').value.trim();
    const image = document.getElementById('portfolio-image').value.trim();
    
    if (!title || !category) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    const newPortfolio = {
        id: Date.now(),
        title: title,
        category: category,
        image: image || 'https://via.placeholder.com/400x300'
    };
    
    dashboardData.portfolio.push(newPortfolio);
    
    if (saveDashboardData()) {
        showNotification('Portfolio item added successfully!', 'success');
        addActivity(`Added new portfolio item: ${title}`);
        loadPortfolioData();
        
        document.getElementById('portfolio-title').value = '';
        document.getElementById('portfolio-category').value = '';
        document.getElementById('portfolio-image').value = '';
    }
}

function createPortfolioCard(item, index) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4>${item.title}</h4>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Image:</strong> ${item.image}</p>
        <div class="item-actions">
            <button class="edit-btn" onclick="editPortfolio(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deletePortfolio(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

function editPortfolio(index) {
    const item = dashboardData.portfolio[index];
    document.getElementById('portfolio-title').value = item.title;
    document.getElementById('portfolio-category').value = item.category;
    document.getElementById('portfolio-image').value = item.image;
    
    const saveBtn = document.querySelector('#portfolio .save-btn');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Portfolio';
    saveBtn.onclick = () => updatePortfolio(index);
    
    addActivity(`Started editing portfolio item: ${item.title}`);
}

function updatePortfolio(index) {
    const title = document.getElementById('portfolio-title').value.trim();
    const category = document.getElementById('portfolio-category').value.trim();
    const image = document.getElementById('portfolio-image').value.trim();
    
    if (!title || !category) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    dashboardData.portfolio[index] = {
        id: dashboardData.portfolio[index].id,
        title: title,
        category: category,
        image: image || 'https://via.placeholder.com/400x300'
    };
    
    if (saveDashboardData()) {
        showNotification('Portfolio item updated successfully!', 'success');
        addActivity(`Updated portfolio item: ${title}`);
        loadPortfolioData();
        
        document.getElementById('portfolio-title').value = '';
        document.getElementById('portfolio-category').value = '';
        document.getElementById('portfolio-image').value = '';
        
        const saveBtn = document.querySelector('#portfolio .save-btn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Portfolio';
        saveBtn.onclick = savePortfolio;
    }
}

function deletePortfolio(index) {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
        const item = dashboardData.portfolio[index];
        dashboardData.portfolio.splice(index, 1);
        
        if (saveDashboardData()) {
            showNotification('Portfolio item deleted successfully!', 'success');
            addActivity(`Deleted portfolio item: ${item.title}`);
            loadPortfolioData();
        }
    }
}

// Blog functions
function loadBlogData() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';
    
    dashboardData.blog.forEach((post, index) => {
        blogContainer.appendChild(createBlogCard(post, index));
    });
}

function addBlog() {
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-content').value = '';
    document.getElementById('blog-image').value = '';
    
    addActivity('Started adding new blog post');
}

function saveBlog() {
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    const image = document.getElementById('blog-image').value.trim();
    
    if (!title || !content) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    const newBlog = {
        id: Date.now(),
        title: title,
        content: content,
        image: image || 'https://via.placeholder.com/800x400',
        date: new Date().toISOString()
    };
    
    dashboardData.blog.push(newBlog);
    
    if (saveDashboardData()) {
        showNotification('Blog post added successfully!', 'success');
        addActivity(`Added new blog post: ${title}`);
        loadBlogData();
        
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-content').value = '';
        document.getElementById('blog-image').value = '';
    }
}

function createBlogCard(post, index) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4>${post.title}</h4>
        <p><strong>Content:</strong> ${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
        <p><strong>Date:</strong> ${new Date(post.date).toLocaleDateString()}</p>
        <div class="item-actions">
            <button class="edit-btn" onclick="editBlog(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deleteBlog(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

function editBlog(index) {
    const post = dashboardData.blog[index];
    document.getElementById('blog-title').value = post.title;
    document.getElementById('blog-content').value = post.content;
    document.getElementById('blog-image').value = post.image;
    
    const saveBtn = document.querySelector('#blog .save-btn');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Blog Post';
    saveBtn.onclick = () => updateBlog(index);
    
    addActivity(`Started editing blog post: ${post.title}`);
}

function updateBlog(index) {
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();
    const image = document.getElementById('blog-image').value.trim();
    
    if (!title || !content) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    dashboardData.blog[index] = {
        id: dashboardData.blog[index].id,
        title: title,
        content: content,
        image: image || 'https://via.placeholder.com/800x400',
        date: dashboardData.blog[index].date
    };
    
    if (saveDashboardData()) {
        showNotification('Blog post updated successfully!', 'success');
        addActivity(`Updated blog post: ${title}`);
        loadBlogData();
        
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-content').value = '';
        document.getElementById('blog-image').value = '';
        
        const saveBtn = document.querySelector('#blog .save-btn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Blog Post';
        saveBtn.onclick = saveBlog;
    }
}

function deleteBlog(index) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        const post = dashboardData.blog[index];
        dashboardData.blog.splice(index, 1);
        
        if (saveDashboardData()) {
            showNotification('Blog post deleted successfully!', 'success');
            addActivity(`Deleted blog post: ${post.title}`);
            loadBlogData();
        }
    }
}

// Contact functions
function loadContactData() {
    const contactData = dashboardData.contact || {};
    document.getElementById('contact-address').value = contactData.address || '';
    document.getElementById('contact-phone').value = contactData.phone || '';
    document.getElementById('contact-email').value = contactData.email || '';
}

function saveContactContent() {
    dashboardData.contact = {
        address: document.getElementById('contact-address').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value
    };
    
    if (saveDashboardData()) {
        showNotification('Contact information saved successfully!', 'success');
        addActivity('Updated contact information');
    }
}

// Testimonials functions
function loadTestimonialsData() {
    const testimonialsContainer = document.getElementById('testimonials-container');
    testimonialsContainer.innerHTML = '';
    
    dashboardData.testimonials.forEach((testimonial, index) => {
        testimonialsContainer.appendChild(createTestimonialCard(testimonial, index));
    });
}

function addTestimonial() {
    document.getElementById('testimonial-name').value = '';
    document.getElementById('testimonial-content').value = '';
    document.getElementById('testimonial-image').value = '';
    
    addActivity('Started adding new testimonial');
}

function saveTestimonial() {
    const name = document.getElementById('testimonial-name').value.trim();
    const content = document.getElementById('testimonial-content').value.trim();
    const image = document.getElementById('testimonial-image').value.trim();
    
    if (!name || !content) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    const newTestimonial = {
        id: Date.now(),
        name: name,
        content: content,
        image: image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    dashboardData.testimonials.push(newTestimonial);
    
    if (saveDashboardData()) {
        showNotification('Testimonial added successfully!', 'success');
        addActivity(`Added new testimonial from ${name}`);
        loadTestimonialsData();
        
        document.getElementById('testimonial-name').value = '';
        document.getElementById('testimonial-content').value = '';
        document.getElementById('testimonial-image').value = '';
    }
}

function createTestimonialCard(testimonial, index) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4>${testimonial.name}</h4>
        <p>${testimonial.content}</p>
        <p><strong>Image:</strong> ${testimonial.image}</p>
        <div class="item-actions">
            <button class="edit-btn" onclick="editTestimonial(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deleteTestimonial(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

function editTestimonial(index) {
    const testimonial = dashboardData.testimonials[index];
    document.getElementById('testimonial-name').value = testimonial.name;
    document.getElementById('testimonial-content').value = testimonial.content;
    document.getElementById('testimonial-image').value = testimonial.image;
    
    const saveBtn = document.querySelector('#testimonials .save-btn');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Testimonial';
    saveBtn.onclick = () => updateTestimonial(index);
    
    addActivity(`Started editing testimonial from ${testimonial.name}`);
}

function updateTestimonial(index) {
    const name = document.getElementById('testimonial-name').value.trim();
    const content = document.getElementById('testimonial-content').value.trim();
    const image = document.getElementById('testimonial-image').value.trim();
    
    if (!name || !content) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    dashboardData.testimonials[index] = {
        id: dashboardData.testimonials[index].id,
        name: name,
        content: content,
        image: image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    if (saveDashboardData()) {
        showNotification('Testimonial updated successfully!', 'success');
        addActivity(`Updated testimonial from ${name}`);
        loadTestimonialsData();
        
        document.getElementById('testimonial-name').value = '';
        document.getElementById('testimonial-content').value = '';
        document.getElementById('testimonial-image').value = '';
        
        const saveBtn = document.querySelector('#testimonials .save-btn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Testimonial';
        saveBtn.onclick = saveTestimonial;
    }
}

function deleteTestimonial(index) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        const testimonial = dashboardData.testimonials[index];
        dashboardData.testimonials.splice(index, 1);
        
        if (saveDashboardData()) {
            showNotification('Testimonial deleted successfully!', 'success');
            addActivity(`Deleted testimonial from ${testimonial.name}`);
            loadTestimonialsData();
        }
    }
}

// FAQ functions
function loadFAQData() {
    const faqContainer = document.getElementById('faq-container');
    faqContainer.innerHTML = '';
    
    dashboardData.faq.forEach((faq, index) => {
        faqContainer.appendChild(createFAQCard(faq, index));
    });
}

function addFAQ() {
    document.getElementById('faq-question').value = '';
    document.getElementById('faq-answer').value = '';
    
    addActivity('Started adding new FAQ');
}

function saveFAQ() {
    const question = document.getElementById('faq-question').value.trim();
    const answer = document.getElementById('faq-answer').value.trim();
    
    if (!question || !answer) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    const newFAQ = {
        id: Date.now(),
        question: question,
        answer: answer
    };
    
    dashboardData.faq.push(newFAQ);
    
    if (saveDashboardData()) {
        showNotification('FAQ added successfully!', 'success');
        addActivity(`Added new FAQ: ${question}`);
        loadFAQData();
        
        document.getElementById('faq-question').value = '';
        document.getElementById('faq-answer').value = '';
    }
}

function createFAQCard(faq, index) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4>Q: ${faq.question}</h4>
        <p><strong>A:</strong> ${faq.answer}</p>
        <div class="item-actions">
            <button class="edit-btn" onclick="editFAQ(${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="deleteFAQ(${index})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

function editFAQ(index) {
    const faq = dashboardData.faq[index];
    document.getElementById('faq-question').value = faq.question;
    document.getElementById('faq-answer').value = faq.answer;
    
    const saveBtn = document.querySelector('#faqs .save-btn');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Update FAQ';
    saveBtn.onclick = () => updateFAQ(index);
    
    addActivity(`Started editing FAQ: ${faq.question}`);
}

function updateFAQ(index) {
    const question = document.getElementById('faq-question').value.trim();
    const answer = document.getElementById('faq-answer').value.trim();
    
    if (!question || !answer) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    dashboardData.faq[index] = {
        id: dashboardData.faq[index].id,
        question: question,
        answer: answer
    };
    
    if (saveDashboardData()) {
        showNotification('FAQ updated successfully!', 'success');
        addActivity(`Updated FAQ: ${question}`);
        loadFAQData();
        
        document.getElementById('faq-question').value = '';
        document.getElementById('faq-answer').value = '';
        
        const saveBtn = document.querySelector('#faqs .save-btn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save FAQ';
        saveBtn.onclick = saveFAQ;
    }
}

function deleteFAQ(index) {
    if (confirm('Are you sure you want to delete this FAQ?')) {
        const faq = dashboardData.faq[index];
        dashboardData.faq.splice(index, 1);
        
        if (saveDashboardData()) {
            showNotification('FAQ deleted successfully!', 'success');
            addActivity(`Deleted FAQ: ${faq.question}`);
            loadFAQData();
        }
    }
}

// Dashboard stats
function updateDashboardStats() {
    document.getElementById('pages-count').textContent = '8'; // Fixed pages
    document.getElementById('services-count').textContent = dashboardData.services.length;
    document.getElementById('blog-count').textContent = dashboardData.blog.length;
    document.getElementById('testimonials-count').textContent = dashboardData.testimonials.length;
}

// Activity tracking
function addActivity(text) {
    const activity = {
        id: Date.now(),
        text: text,
        timestamp: new Date().toISOString()
    };
    
    dashboardData.activity.unshift(activity);
    
    // Keep only last 50 activities
    if (dashboardData.activity.length > 50) {
        dashboardData.activity = dashboardData.activity.slice(0, 50);
    }
    
    saveDashboardData();
    loadRecentActivity();
}

function loadRecentActivity() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    
    dashboardData.activity.slice(0, 10).forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <i class="fas fa-circle"></i>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${new Date(activity.timestamp).toLocaleString()}</div>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Live preview functions
function openLivePreview() {
    const modal = document.getElementById('preview-modal');
    modal.style.display = 'block';
    addActivity('Opened live preview');
}

function closeLivePreview() {
    const modal = document.getElementById('preview-modal');
    modal.style.display = 'none';
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear login state
        localStorage.removeItem('adminLoggedIn');
        addActivity('User logged out');
        showNotification('Logged out successfully', 'success');
        
        // Redirect to admin login page after a short delay
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    }
}

// Toast notification system
function showNotification(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form listeners for better UX
function setupFormListeners() {
    // Auto-save functionality for text areas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            // Add visual feedback that content has changed
            this.style.borderColor = '#f59e0b';
        });
    });
    
    // Reset border color on focus
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2563eb';
        });
    });
}

// Data export/import functionality (Bonus feature)
function exportDashboardData() {
    const dataStr = JSON.stringify(dashboardData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard-data.json';
    link.click();
    URL.revokeObjectURL(url);
    
    addActivity('Exported dashboard data');
    showNotification('Data exported successfully!', 'success');
}

function importDashboardData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    dashboardData = { ...dashboardData, ...importedData };
                    saveDashboardData();
                    loadDashboardData();
                    updateDashboardStats();
                    loadRecentActivity();
                    
                    addActivity('Imported dashboard data');
                    showNotification('Data imported successfully!', 'success');
                } catch (error) {
                    showNotification('Error importing data. Please check file format.', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('preview-modal');
    if (event.target === modal) {
        closeLivePreview();
    }
} 