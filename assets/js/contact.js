// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const form = this;
//   const loading = form.querySelector(".loading");
//   const sent = form.querySelector(".sent-message");
//   const error = form.querySelector(".error-message");

//   loading.style.display = "block";
//   sent.style.display = "none";
//   error.innerHTML = "";

//   fetch("${BASE_URL}/api/contact/submit/", {
//     method: "POST",
//     body: new FormData(form),
//   })
//   .then(res => res.json())
//   .then(data => {
//     loading.style.display = "none";

//     if (data.status === "success") {
//       sent.style.display = "block";
//       form.reset();
//     } else {
//       error.innerHTML = "Failed to submit. Please try again.";
//     }
//   })
//   .catch(() => {
//     loading.style.display = "none";
//     error.innerHTML = "Server error. Please try later.";
//   });
// });

// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const form = this;
//   const formData = new FormData(form);

//   fetch("${BASE_URL}/contact/submit-enquiry/", {
//     method: "POST",
//     body: formData,
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const form = this;
//   const loading = form.querySelector(".loading");
//   const sent = form.querySelector(".sent-message");
//   const error = form.querySelector(".error-message");

//   // Reset states
//   loading.style.display = "block";
//   sent.style.display = "none";
//   error.innerHTML = "";

//   const formData = new FormData(form);

//   fetch("${BASE_URL}/contact/submit-enquiry/", {
//     method: "POST",
//     body: formData,
//   })
//     .then(response => response.json())
//     .then(data => {
//       loading.style.display = "none";

//       if (data.status === "success") {
//         sent.style.display = "block";
//         form.reset(); // clear form fields
//         setTimeout(() => {
//           sent.style.display = "none";
//         }, 5000);

//       } else {
//         error.innerHTML = "Something went wrong. Please try again.";
//       }
//     })
//     .catch(err => {
//       loading.style.display = "none";
//       error.innerHTML = "Server error. Please try again later.";
//       console.error(err);
//     });
// });
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

