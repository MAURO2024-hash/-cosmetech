document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navMenu && navMenu.classList.contains("active") && !event.target.closest("nav")) {
      navMenu.classList.remove("active");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });

  // Add animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".service-card, .stat, .why-us-text, .cta-box");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  document.querySelectorAll(".service-card, .stat, .why-us-text, .cta-box").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
  
  // Form validation for contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
      let isValid = true;
      
      requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (input && !input.value.trim()) {
          input.style.borderColor = 'red';
          isValid = false;
        } else if (input) {
          input.style.borderColor = '#ddd';
        }
      });
      
      if (isValid) {
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a success message
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        this.reset();
      } else {
        alert('Veuillez remplir tous les champs obligatoires.');
      }
    });
  }
});