// Use window object for global state
window.emailjsInitialized = false;

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

async function initializeEmailJS() {
  try {
    // 1. Load SDK
    await loadScript(
      "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
    );

    // 2. Initialize with error handling
    await emailjs.init("NYouc0d-sb0HnKhTo");
    window.emailjsInitialized = true;
    console.log("EmailJS initialized successfully");
    return true;
  } catch (error) {
    console.error("EmailJS initialization failed:", error);
    return false;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  // Initialize EmailJS and wait for completion
  const emailjsReady = await initializeEmailJS();

  if (!emailjsReady) {
    console.error("EmailJS failed to initialize");
    // Optionally show user-facing error message
    return;
  }

  // Load other scripts
  try {
    await loadScript("js/modal.js");
    await loadScript("js/email-service.js");
    console.log("All scripts loaded successfully");
  } catch (error) {
    console.error("Failed to load scripts:", error);
  }
});
