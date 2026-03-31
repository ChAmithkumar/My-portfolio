function sendMessage() {
  alert("Message sent successfully!");
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// Scroll animation (fade in)
window.addEventListener("scroll", () => {
  document.querySelectorAll(".glass, .project-card").forEach(el => {
    let position = el.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});