document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("services-container");

  fetch(`${window.APP_CONFIG.API_BASE_URL}/api/services/`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(service => {
        container.innerHTML += `
          <div class="col-lg-6 col-md-6">
            <div class="service-item h-100 shadow-sm rounded-4 overflow-hidden">

              <img
                src="${window.APP_CONFIG.API_BASE_URL}${service.image}"
                class="img-fluid w-100"
                alt="${service.title}"
              >

              <div class="p-4 d-flex flex-column h-100">
                <h4 class="fw-semibold mb-2">${service.title}</h4>

                <p class="text-muted small flex-grow-1">
                  ${service.description}
                </p>

                <a
                  href="service-details.html?id=${service.id}"
                  class="btn btn-outline-primary btn-sm mt-auto"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        "<p class='text-danger'>Unable to load services</p>";
    });
});
