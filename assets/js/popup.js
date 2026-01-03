// document.addEventListener("DOMContentLoaded", () => {
//   const forms = document.querySelectorAll(".ajax-contact-form");

//   forms.forEach((form) => {
//     form.addEventListener("submit", function (e) {
//       e.preventDefault();

//       fetch("${BASE_URL}/api/contact/submit/", {
//         method: "POST",
//         body: new FormData(form),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.status === "success") {
//             alert("Message sent!");
//             form.reset();
//           } else {
//             alert("Something went wrong");
//           }
//         })
//         .catch(() => {
//           alert("Server error");
//         });
//     });
//   });
// });
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".ajax-contact-form");
  const toast = document.getElementById("toast");

  const showToast = (message, type = "success") => {
    toast.className = `toast-notification toast-${type} show`;
    toast.innerText = message;

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  };

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      fetch(`${window.APP_CONFIG.API_BASE_URL}/api/contact/submit-enquiry/`, {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            showToast("Your enquiry has been sent successfully");

            // Close Bootstrap modal
            const modalEl = document.getElementById("enquiryModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // Reset form
            form.reset();
          } else {
            showToast("Something went wrong. Please try again.", "error");
          }
        })
        .catch(() => {
          showToast("Server error. Please try later.", "error");
        });
    });
  });
});

