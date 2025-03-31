// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  if (navToggle && navList) {
    // Toggle menu when hamburger is clicked
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navList.classList.toggle("nav__list--open");
      navToggle.classList.toggle("is-active");
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll(".nav__link, .contact-btn");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("nav__list--open");
        navToggle.classList.remove("is-active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav")) {
        navList.classList.remove("nav__list--open");
        navToggle.classList.remove("is-active");
      }
    });
  }

  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
    observer.observe(element);
  });

  // Form validation for contact form
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value;
      const email = contactForm.querySelector('[name="email"]').value;
      const message = contactForm.querySelector('[name="message"]').value;

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Here you would typically send the form data to a server
      console.log("Form submitted:", { name, email, message });
      alert("Thank you for your message! This is a demo - no data was sent.");
      contactForm.reset();
    });
  }

  // Image modal for Spores page
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal__img");
  const galleryImages = document.querySelectorAll(".gallery__img");

  if (modal && modalImg && galleryImages.length > 0) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        modal.classList.add("modal--open");
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("modal--open");
      }
    });
  }
});

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Lazy loading for images
const lazyImages = document.querySelectorAll("img[data-src]");
if (lazyImages.length > 0) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}
