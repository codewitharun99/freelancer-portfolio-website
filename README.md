# Alex Johnson - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript featuring dark/light mode toggle, smooth animations, and EmailJS integration.

## 🚀 Features

- 🌙☀️ **Dark/Light Mode Toggle** - Seamless theme switching with persistent preferences
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ✨ **Smooth Animations** - Scroll-triggered animations and micro-interactions
- 📧 **Contact Form** - Integrated with EmailJS for direct email functionality
- 🎯 **Interactive Sections** - Hero, About, Projects, Blog, FAQ, Testimonials, Contact
- 🔍 **Project Filtering** - Filter projects by category (All, Web Apps, Mobile, APIs)
- 💬 **Testimonials Slider** - Auto-rotating testimonials with manual navigation
- ❓ **FAQ Accordion** - One-question-at-a-time expandable FAQ section
- 🚀 **Performance Optimized** - Lazy loading, debounced scroll handlers, image preloading

## 📋 Sections

1. **Hero** - Eye-catching introduction with typing animation and floating elements
2. **About** - Personal story, experience timeline, and animated skill bars
3. **Projects** - Filterable project showcase with hover effects and status indicators
4. **Blog** - Latest blog posts with categories and read time estimates
5. **Testimonials** - Client feedback with rotating slider and navigation
6. **FAQ** - Frequently asked questions with smooth accordion animation
7. **Contact** - Professional contact form with validation and EmailJS integration
8. **Footer** - Social links, navigation, and additional information

## 🛠️ Setup Instructions

### 1. Basic Setup

1. Clone or download this repository
2. Open `index.html` in your browser or serve with a local server
3. Customize the content in `index.html` to match your information

### 2. EmailJS Integration (Optional)

To enable the contact form functionality:

1. **Create an EmailJS Account**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Sign up for a free account

2. **Set Up Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Add your email service (Gmail, Outlook, etc.)
   - Note your **Service ID**

3. **Create Email Template**
   - Go to "Email Templates"
   - Create a new template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{budget}}` - Project budget
     - `{{message}}` - Message content
   - Note your **Template ID**

4. **Get Your User ID**
   - Go to "Account" → "General"
   - Copy your **User ID** (Public Key)

5. **Update Configuration**
   - Open `script.js`
   - Find the `emailjsConfig` object in the `ContactForm` class
   - Replace the placeholder values:

```javascript
this.emailjsConfig = {
    serviceID: 'YOUR_SERVICE_ID',      // Replace with your Service ID
    templateID: 'YOUR_TEMPLATE_ID',    // Replace with your Template ID
    userID: 'YOUR_USER_ID'             // Replace with your User ID
};
```

### 3. Customization

#### Personal Information
- Update name, title, and description in the hero section
- Replace the profile image URL with your own photo
- Update contact information (email, phone, location)
- Modify social media links in the footer

#### Projects
- Replace project images with your own work
- Update project descriptions, technologies, and links
- Add or remove projects as needed
- Modify project categories in the filter

#### Blog Posts
- Update blog post content, images, and links
- Modify categories and publication dates
- Add or remove blog posts as needed

#### Testimonials
- Replace testimonial content with real client feedback
- Update client names, roles, and avatar images
- Add or remove testimonials as needed

#### FAQ
- Customize questions and answers based on your services
- Add or remove FAQ items as needed

#### Styling
- Modify CSS variables in `:root` for color scheme changes
- Update fonts by changing the Google Fonts import
- Adjust spacing, sizing, and animations as desired

## 📁 File Structure

```
portfolio/        
│
├── assets/
│   ├── img/
│   │   ├── blog/
│   │   ├── profile/
│   │   └── projects/
│   ├── css/
│   │   └── style.css    # All CSS styles
│   └── js/
│       └── script.js    # All JavaScript functionality
├── index.html           # Main HTML file
└── README.md            # This file

```

## 🎨 Key Features Explained

### Theme Toggle
- Automatic dark/light mode switching
- Persistent theme preference in localStorage
- Smooth transitions between themes

### Typing Animation
- Dynamic text rotation in hero section
- Customizable typing speed and texts
- Realistic cursor blinking effect

### Scroll Animations
- Elements animate into view on scroll
- Skill bars animate with percentage values
- Optimized with Intersection Observer API

### Project Filtering
- Filter projects by category
- Smooth show/hide animations
- Active state management

### Testimonials Slider
- Auto-rotating testimonials
- Manual navigation with dots and arrows
- Pause on hover functionality

### Contact Form
- Real-time validation
- EmailJS integration for sending emails
- Success/error notifications
- Loading states

### Back to Top Button
- Appears after scrolling down
- Smooth scroll to top
- Hover animations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Technologies Used

- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - ES6+ features and modern APIs
- **EmailJS** - Contact form email functionality
- **Font Awesome** - Icons and social media symbols
- **Google Fonts** - Inter font family
- **Pexels** - Stock photos for demo content

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## ⚡ Performance Features

- Image preloading for critical assets
- Debounced scroll handlers
- Throttled animation updates
- Optimized CSS animations
- Lazy loading implementation

## 🚀 Deployment

You can deploy this website to any static hosting service:

- **GitHub Pages** - Free hosting for GitHub repositories
- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **Surge.sh** - Simple command-line deployment

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

If you have any questions or need help customizing the website, feel free to reach out!

---

**Built with ❤️ by Alex Johnson**

*This portfolio template is designed to showcase your skills and projects in a professional and modern way. Customize it to make it your own!*