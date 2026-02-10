document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("services-container");

  fetch(`${window.APP_CONFIG.API_BASE_URL}/api/services/`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(service => {
        container.innerHTML += `
          <div class="col-md-6 d-flex align-items-stretch">
            <div class="card">

              <div class="card-img">
                <img
                  src="${window.APP_CONFIG.API_BASE_URL}${service.image}"
                  alt="${service.title}"
                />
              </div>

              <div class="card-body">
                <h5 class="card-title">
                  <a href="service-details.html?id=${service.id}">
                    ${service.title}
                  </a>
                </h5>

                <p class="fst-italic text-center">
                  ${service.date}
                </p>

                <p class="card-text">
                  ${service.description}
                </p>
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


