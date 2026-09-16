/**
 * HealthAI - Global Application Script
 * 
 * Handles responsive mobile navigation drawer, header scroll effects,
 * active link highlighting, and smooth interaction controls.
 */

document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  // --- 1. Sticky Header Scroll Effect ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 2. Mobile Hamburger Navigation Menu ---
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("active");
      hamburgerBtn.classList.toggle("active");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach(link => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- 3. Active Link State on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // --- 4. Back to Top Smooth Scroll ---
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- 5. Console Greeting for College Evaluation / Viva ---
  console.log(
    "%c HealthAI - AI-Based Health Information Chatbot %c\n" +
    "Educational Prototype built for College Project Evaluation.\n" +
    "Stack: Semantic HTML5, CSS3 Custom Properties, Modular ES6 JS.\n" +
    "Zero external build dependencies required.",
    "background: #0284c7; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
    "color: #059669; font-weight: bold;"
  );
});
