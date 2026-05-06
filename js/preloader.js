window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  // Fade-out elegante
  preloader.style.opacity = "1";
  setTimeout(() => {
    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      content.style.display = "block";
    }, 1000);
  }, 500); // pequeño delay para que se vea el loader
});
