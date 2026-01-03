// const params = new URLSearchParams(window.location.search);
// const courseId = params.get("id");

// console.log("FETCH STARTED");

// fetch("assets/data/content.json")
//   .then(res => {
//     if (!res.ok) throw new Error("JSON not found");
//     return res.json();
//   })
//   .then(data => {

//     const course = data.course.find(c => c.id == courseId);

//     if (!course) {
//       document.querySelector(".container").innerHTML =
//         "<h3>Course not found</h3>";
//       return;
//     }

//     document.getElementById("course-image").src = course.image;
//     document.getElementById("course-image").alt = course.title;
//     document.getElementById("course-title").innerText = course.title;
//     document.getElementById("course-description").innerText = course.description;
//     document.getElementById("course-category").innerText = course.category;
//     const pointsList = document.getElementById("course-points");
//     pointsList.innerHTML = ""; 

//     if (course.points && course.points.length > 0) {
//       course.points.forEach(point => {
//         const li = document.createElement("li");
//         li.innerHTML = `
//           <i class="bi bi-check-circle-fill"></i>
//           <span>${point}</span>
//         `;
//         pointsList.appendChild(li);
//       });
//     }

//   })
//   .catch(err => console.error("Course details error:", err));
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

if (!courseId) {
  document.querySelector(".container").innerHTML =
    "<h3>Invalid course</h3>";
  throw new Error("No course ID");
}

fetch(`${window.APP_CONFIG.API_BASE_URL}/api/course/${courseId}/`)
  .then(res => {
    if (!res.ok) throw new Error("Course not found");
    return res.json();
  })
  .then(course => {

    document.getElementById("course-image").src = course.image;
    document.getElementById("course-image").alt = course.title;
    document.getElementById("course-title").innerText = course.title;
    document.getElementById("course-description").innerText = course.description;
    document.getElementById("course-category").innerText = course.category;

    document.getElementById("enquirySubject").value = course.title

    document.getElementById("course-image").src =
    `${BASE_URL}${course.image}`;


    const pointsList = document.getElementById("course-points");
    pointsList.innerHTML = "";

    if (course.points?.length) {
      course.points.forEach(point => {
        const li = document.createElement("li");
        li.innerHTML = `
          <i class="bi bi-check-circle-fill"></i>
          <span>${point}</span>
        `;
        pointsList.appendChild(li);
      });
    }
  })
  .catch(err => {
    console.error(err);
    document.querySelector(".container").innerHTML =
      "<h3>Course not found</h3>";
  });

