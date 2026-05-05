document.addEventListener("DOMContentLoaded", () => {
  // Carrusel
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll("img");
    let currentIndex = 0;

    images[currentIndex].classList.add("active");

    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 5000);
  });

  // Tema
  const btn = document.getElementById("toggle-theme");

  // Aplicar preferencia guardada
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    btn.textContent = "☀️";
  } else {
    btn.textContent = "🌙";
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      btn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      btn.textContent = "🌙";
    }
  });
});
