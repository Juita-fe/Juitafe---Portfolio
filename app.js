// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector("textarea").value;
  const btn = this.querySelector('button[type="submit"]');

  btn.textContent = "Sending...";
  btn.disabled = true;

  fetch("contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`,
  })
    .then((response) => {
      return response.text().then((text) => {
        return { status: response.status, text: text };
      });
    })
    .then((data) => {
      console.log("Status:", data.status);
      console.log("Response:", data.text);
      if (data.status === 200) {
        btn.textContent = "Message Sent!";
        btn.style.background = "var(--mint-mid)";
        this.reset();
        setTimeout(() => {
          btn.textContent = "Send Message";
          btn.disabled = false;
          btn.style.background = "";
        }, 3000);
      } else {
        btn.textContent = "Failed: " + data.text;
        btn.disabled = false;
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      btn.textContent = "Failed. Try Again.";
      btn.disabled = false;
    });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".service-card, section h2").forEach((el) => {
  observer.observe(el);
});
