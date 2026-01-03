// document.addEventListener("DOMContentLoaded", () => {
//   fetch("assets/data/content.json")
//     .then(res => {
//       if (!res.ok) throw new Error("JSON not found");
//       return res.json();
//     })
//     .then(data => {
//       const container = document.getElementById("services-container");
//       container.innerHTML = "";

//       if (!data.services || !Array.isArray(data.services)) {
//         console.error("Invalid services data");
//         return;
//       }

//       data.services.forEach(service => {
//         const card = `
//           <div class="col-md-6 d-flex align-items-stretch mb-4">
//             <div class="card">
//               <div class="card-img">
//                 <img 
//                   src="${service.image}" 
//                   alt="${service.title}" 
//                   class="img-fluid"
//                 >
//               </div>
//               <div class="card-body">
//                 <h5 class="card-title">
//                   <a href="${service.url}">${service.title}</a>
//                 </h5>
//                 ${service.date ? `<p class="fst-italic text-center">${service.date}</p>` : ""}
//                 <p class="card-text">${service.description}</p>
//               </div>
//             </div>
//           </div>
//         `;
//         container.insertAdjacentHTML("beforeend", card);
//       });
//     })
//     .catch(err => console.error("Error loading services:", err));
// });
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("services-container");

  fetch(`${window.APP_CONFIG.API_BASE_URL}/api/services/`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(service => {
        // container.innerHTML += `
        //   <div class="col-lg-6 col-md-12 mb-5">
        //     <div class="service-template">

        //       <!-- Image -->
        //       <div class="service-image">
        //         <img src="${BASE_URL}${service.image}" alt="Service Title" alt="${service.title}">
        //       </div>

        //       <!-- Floating Card -->
        //       <div class="service-card">
        //         <h3 class="service-title green">
        //           ${service.title}
        //         </h3>

        //         <p class="service-meta">
        //           ${service.data}
        //         </p>

        //         <p class="service-description">
        //           ${service.description.substring(0, 140)}
        //         </p>
        //       </div>

        //     </div>
        //   </div>

        // `;

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
