// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init();

  // Refresh AOS when internal anchor links are clicked
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        AOS.refreshHard(); // Forces animation recalculation
      }, 300); // Allow time for scroll to settle
    });
  });

  // Add email copy functionality
  const emailLink = document.getElementById("email-link");

  if (emailLink) {
    emailLink.addEventListener("click", function () {
      const email = "kasimjunu@gmail.com";
      navigator.clipboard
        .writeText(email)
        .then(() => {
          alert("Email copied to clipboard!");
        })
        .catch((err) => {
          console.error("Clipboard error:", err);
          alert("Failed to copy email: " + err);
        });
    });
  }
});
