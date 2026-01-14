function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.className = "toast-notification"; // reset
  toast.classList.add("show", type === "success" ? "toast-success" : "toast-error");
  toast.innerText = message;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const loading = form.querySelector(".loading");
  const btn = form.querySelector("button[type='submit']");

  loading.style.display = "block";
  btn.disabled = true;

  const formData = new FormData(form);

  fetch(`${window.APP_CONFIG.API_BASE_URL}/contact/submit-enquiry/`, {
  // fetch("${BASE_URL}/contact/submit-enquiry/", {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      btn.disabled = false;

      if (data.status === "success") {
        showToast(
          "Thank you for reaching out. Our team will contact you shortly.",
          "success"
        );
        form.reset();
      } else {
        showToast(
          "We couldn’t send your message. Please try again.",
          "error"
        );
      }
    })
    .catch(() => {
      loading.style.display = "none";
      btn.disabled = false;
      showToast(
        "Server error. Please check your connection.",
        "error"
      );
    });
});

