// Initialize navigation elements
let menuToggle, nav, headerNav;

document.addEventListener('DOMContentLoaded', () => {
  menuToggle = document.querySelector('.menu-toggle');
  nav = document.querySelector('nav');
  headerNav = document.querySelector('header nav');

  // Setup menu toggle functionality
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
});

// Function to update active section and navigation
function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('nav a');
  const progressDots = document.querySelectorAll('.progress-dot');
  let current = '';

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
      section.classList.add('visible');
      
      // Update progress dots
      progressDots.forEach(dot => dot.classList.remove('active'));
      if (progressDots[index]) {
        progressDots[index].classList.add('active');
      }
    }
  });

  // Update navigation items
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
}

// Function to update scroll progress bar
function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.nav-indicator').style.width = scrolled + '%';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateActiveSection();
  updateScrollProgress();
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Add smooth scrolling for progress dots
  document.querySelectorAll('.progress-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const sections = document.querySelectorAll('section');
      if (sections[index]) {
        window.scrollTo({
          top: sections[index].offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Update on scroll
window.addEventListener('scroll', () => {
  updateActiveSection();
  updateScrollProgress();
});
