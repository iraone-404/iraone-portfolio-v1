document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Icon
  lucide.createIcons();

  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const navbar = document.querySelector(".navbar");

  // 1. Smooth Scroll Interactivity
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // -70 agar tidak tertutup navbar
          behavior: "smooth",
        });
      }
    });
  });

  // 2. Active Link Highlighting (Intersection Observer)
  // Strategi: Mendeteksi section mana yang paling banyak terlihat di layar
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Fokus pada area tengah layar
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 3. Navbar Style Change on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      navbar.style.background = "var(--white-glass)";
      navbar.style.boxShadow = "none";
    }
  });
});
