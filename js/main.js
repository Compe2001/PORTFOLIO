
//carrusel
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll("img");
    let currentIndex = 0;

    // Mostrar la primera imagen
    images[currentIndex].classList.add("active");

    setInterval(() => {
      // Ocultar la actual
      images[currentIndex].classList.remove("active");

      // Avanzar al siguiente índice
      currentIndex = (currentIndex + 1) % images.length;

      // Mostrar la nueva con fade
      images[currentIndex].classList.add("active");
    }, 5000); // cada 5 segundos
  });
});






const btn = document.getElementById("toggle-theme");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Opcional: guardar preferencia en localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Al cargar la página, aplicar preferencia guardada
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});


