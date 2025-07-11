# QMC Business Solutions - Admin Dashboard

A fully functional and responsive Admin Dashboard for managing business website content using HTML, CSS, and JavaScript with localStorage data persistence.

## 🎯 Features

### ✅ Core Requirements Implemented

1. **Responsive Sidebar Navigation**
   - Dashboard overview with statistics
   - Home Page content management
   - About Us content editing
   - Services management (Add/Edit/Delete)
   - Portfolio management (Add/Edit/Delete)
   - Blog management (Add/Edit/Delete)
   - Testimonials management (Add/Edit/Delete)
   - FAQs management (Add/Edit/Delete)
   - Contact information editing
   - Live Preview functionality
   - Logout functionality

2. **Editable Sections**
   - **Home Page**: Title, Subtitle, Description, Image URL
   - **About Us**: Company Description, Title, Image URL
   - **Services**: Add/Edit/Delete with title, description, and icon
   - **Portfolio**: Add/Edit/Delete with image, title, and category
   - **Blog**: Add/Edit/Delete with title, content, and image
   - **Testimonials**: Add/Edit/Delete with client name, message, and image
   - **FAQs**: Add/Edit/Delete question & answer pairs
   - **Contact**: Email, Phone, Address information

3. **Save Changes Functionality**
   - Every section has "Save Changes" buttons
   - Data automatically saved to localStorage
   - Toast notifications for save confirmations
   - Real-time data persistence

4. **Dynamic Content Loading**
   - JavaScript-based dynamic rendering
   - No page reloads when switching sections
   - Last active section remembered
   - Smooth transitions and animations

5. **Live Website Pages (Frontend)**
   - Separate HTML files for each page
   - JavaScript loads content from localStorage
   - Default content shown if no data exists
   - Fully responsive design

6. **Additional Requirements**
   - Modern UI design (white, blue, dark gray theme)
   - Google Fonts (Poppins) integration
   - Smooth animations and transitions
   - Fully responsive for mobile and desktop
   - All data persists after page reload

### 💡 Bonus Features Implemented

- **Live Preview**: Opens frontend pages in modal or new tab
- **Activity Tracking**: Recent activity log with timestamps
- **Data Export/Import**: Backup and restore functionality
- **Toast Notifications**: Professional notification system
- **Enhanced UX**: Form validation, visual feedback, hover effects
- **Mobile Responsive**: Works perfectly on all devices
- **Professional UI**: Modern design with gradients and shadows

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend or database required
- No frameworks needed

### Installation
1. Download or clone the project files
2. Open `dashboard.html` in your web browser
3. Start managing your website content!

### File Structure
```
WebsiteProject/
├── dashboard.html          # Admin Dashboard
├── index.html             # Home Page
├── about.html             # About Page
├── services.html          # Services Page
├── portfolio.html         # Portfolio Page
├── blog.html             # Blog Page
├── testimonials.html     # Testimonials Page
├── contact.html          # Contact Page
├── privacy.html          # Privacy/FAQs Page
├── css/
│   ├── dashboard.css     # Dashboard Styles
│   └── style.css         # Frontend Styles
├── js/
│   ├── dashboard.js      # Dashboard Functionality
│   └── main.js           # Frontend Content Loading
└── Images/               # Image Assets
```

## 📖 Usage Guide

### Accessing the Dashboard
1. Open `dashboard.html` in your browser
2. The dashboard will load with sample data if no previous data exists
3. Navigate through sections using the sidebar

### Managing Content

#### Home Page
- Edit hero title, subtitle, description, and image
- Click "Save Changes" to update

#### Services
- Click "Add Service" to create new service
- Fill in title, description, and icon (FontAwesome class)
- Click "Save Service" to add
- Use Edit/Delete buttons to manage existing services

#### Portfolio
- Add portfolio items with title, category, and image URL
- Edit or delete existing items
- All changes are saved automatically

#### Blog
- Create blog posts with title, content, and image
- Posts include automatic timestamps
- Full CRUD operations available

#### Testimonials
- Add client testimonials with name, message, and image
- Manage existing testimonials
- Professional presentation

#### FAQs
- Create question and answer pairs
- Easy management interface
- Perfect for customer support

#### Contact Information
- Update address, phone, and email
- Changes reflect immediately on contact page

### Live Preview
- Click "Live Preview" in the sidebar
- Opens current website in modal or new tab
- See changes in real-time

### Data Management
- All data is automatically saved to localStorage
- Data persists between sessions
- Export/Import functionality available
- Activity log tracks all changes

## 🎨 Design Features

### Modern UI Elements
- Clean, professional design
- Blue and dark gray color scheme
- Smooth animations and transitions
- Hover effects and visual feedback
- Toast notifications for user feedback

### Responsive Design
- Works on desktop, tablet, and mobile
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized for all screen sizes

### Typography
- Google Fonts (Poppins) integration
- Consistent font hierarchy
- Readable and professional appearance

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Dynamic functionality
- **localStorage**: Data persistence
- **FontAwesome**: Icons
- **Google Fonts**: Typography

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Fast loading times
- Efficient data storage
- Smooth animations
- Optimized for mobile

## 📱 Mobile Experience

The dashboard is fully optimized for mobile devices:
- Responsive sidebar navigation
- Touch-friendly buttons and forms
- Optimized layouts for small screens
- Smooth mobile interactions

## 🔒 Data Security

- All data stored locally in browser
- No external dependencies
- No data sent to external servers
- Export/Import for data backup

## 🚀 Future Enhancements

Potential improvements for future versions:
- User authentication system
- Multiple user roles
- Image upload functionality
- Rich text editor
- SEO optimization tools
- Analytics integration
- Backup to cloud storage

## 📞 Support

For questions or issues:
- Check the browser console for errors
- Ensure localStorage is enabled
- Try refreshing the page if data doesn't load
- Export your data regularly as backup

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using HTML, CSS, and JavaScript** 