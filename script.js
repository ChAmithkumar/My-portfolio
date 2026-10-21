
// =========================================
// AMITH PORTFOLIO — INTERACTIONS
// =========================================

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// Current year in the footer
const yearElement = document.querySelector("#currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form: prepare an email rather than falsely
// claiming that a message was delivered.


// Contact form: prepare a Gmail draft.
// The visitor must review and send the email themselves.

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const recipient = "amithkumarsai@gmail.com";

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const gmailDraft =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(recipient)}` +
      `&su=${subject}` +
      `&body=${body}`;

    const draftWindow = window.open(
      gmailDraft,
      "_blank",
      "noopener,noreferrer"
    );

    if (draftWindow) {
      formStatus.textContent =
        "Your Gmail draft is ready. Review it and press Send.";
    } else {
      formStatus.textContent =
        "Your browser blocked the new tab. Please email " +
        recipient + " directly instead.";
    }
  });
}

