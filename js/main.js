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
