let lastSubmissionTime = 0; // Rate limiting tracker

function handleFormSubmit(e) {
  e.preventDefault();

  // 1. Rate limiting check
  const now = Date.now();
  if (now - lastSubmissionTime < 30000) {
    // 30 seconds
    alert("Please wait 30 seconds between requests");
    return;
  }
  // Debug check
  console.log("Current initialization state:", window.emailjsInitialized);
  // 2. Check EmailJS initialization
  if (!window.emailjsInitialized) {
    alert("Email service is not ready yet. Please try again in a moment.");
    return;
  }

  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector("button");
  const email = emailInput.value.trim();
  // Add this after getting the emailInput element
  emailInput.addEventListener("input", () => {
    const error = form.querySelector(".error-message");
    if (error) error.remove();
  });

  // 3. Validate email (single validation block)
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    // Show error under input field
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = "Please enter a valid email address";
    errorElement.style.color = "red";
    errorElement.style.marginTop = "5px";

    // Remove existing errors
    const existingError = form.querySelector(".error-message");
    if (existingError) existingError.remove();

    form.appendChild(errorElement);
    return;
  }

  // 4. Update UI and set submission time
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  lastSubmissionTime = now;

  // 5. Send email
  emailjs
    .send("service_ersz7tq", "template_mu39fv4", {
      certificate_name: document.getElementById("certificate-name").value,
      requester_email: email,
      recipient_email: "junukasimaus22@gmail.com",
    })
    .then(() => {
      document.getElementById("success-modal").style.display = "block";
      setTimeout(() => {
        if (window.modal) window.modal.style.display = "none";
        document.getElementById("success-modal").style.display = "none";
        form.reset();
      }, 3000);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Error: " + (error.text || "Failed to send. Please try again."));
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Request Certificate";
    });
}

// Event listener setup
const form = document.getElementById("certificate-request-form");
if (form) {
  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("keypress", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });
}
