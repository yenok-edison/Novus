// document.addEventListener("DOMContentLoaded", () => {
//   fetch("assets/data/content.json")
//     .then(res => {
//       if (!res.ok) throw new Error("JSON not found");
//       return res.json();
//     })
//     .then(data => {
//       const container = document.getElementById("team-container");
//       container.innerHTML = "";

//       data.ourteam.forEach((member, index) => {
//         const isReverse = index % 2 !== 0 ? "reverse" : "";

//         const teamHTML = `
//           <div class="team-row ${isReverse}" data-aos="fade-up">
//             <div class="team-img">
//               <img src="${member.image}" alt="${member.name}">
//             </div>
//             <div class="team-content">
//               <h3>${member.name}</h3>
//               <span>${member.designation}</span>
//               <p>${member.description}</p>
//             </div>
//           </div>
//         `;

//         container.insertAdjacentHTML("beforeend", teamHTML);
//       });
//     })
//     .catch(err => console.error("Team load error:", err));
// });
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${window.APP_CONFIG.API_BASE_URL}/api/members/`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load team");
      return res.json();
    })
    .then(members => {
      const container = document.getElementById("team-container");
      container.innerHTML = "";

      members.forEach((member, index) => {
        const isReverse = index % 2 !== 0 ? "reverse" : "";

        const teamHTML = `
          <div class="team-row ${isReverse}" data-aos="fade-up">
            <div class="team-img">
              <img
                src="${window.APP_CONFIG.API_BASE_URL}${member.image}"
                alt="${member.name}"
                loading="lazy"
              >
            </div>

            <div class="team-content">
              <h3>${member.name}</h3>
              <p>${member.description}</p>
            </div>
          </div>
        `;

        container.insertAdjacentHTML("beforeend", teamHTML);
      });
    })
    .catch(err => console.error("Team load error:", err));
});

