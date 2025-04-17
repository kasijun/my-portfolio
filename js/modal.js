// Make modal global
window.modal = document.getElementById("certificate-modal");

if (modal) {
  const closeBtn = modal.querySelector(".close-modal");
  const blurredCertificate = document.querySelector(".blurred-certificate");

  document.querySelectorAll(".certificate-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get certificate details
      const titleElement = this.closest(".timeline-header").querySelector(
        ".job-title, .degree-title"
      );
      const previewImage = this.dataset.preview;

      if (titleElement) {
        // Update modal content
        document.getElementById(
          "modal-title"
        ).textContent = `${titleElement.textContent} Certificate`;
        document.getElementById("certificate-name").value =
          titleElement.textContent;

        // Update preview image if exists
        if (blurredCertificate && previewImage) {
          blurredCertificate.src = previewImage;
          blurredCertificate.alt = `${titleElement.textContent} Preview`;
        }
      }

      // Show modal
      modal.style.display = "block";
    });
  });

  // Close modal handlers
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}
