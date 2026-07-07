window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content   = document.getElementById("content");

  // Verifica si ya se mostró el preloader antes
  const preloaderShown = localStorage.getItem("preloaderShown");

  if (!preloaderShown) {
    // Primera vez: mostrar preloader y luego ocultarlo
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        if (content) content.style.display = "block";
        // Guardamos en localStorage que ya se mostró
        localStorage.setItem("preloaderShown", "true");
      }, 1000);
    }, 2000);
  } else {
    // Si ya se mostró, ocultamos directamente el preloader
    preloader.style.display = "none";
    if (content) content.style.display = "block";
  }
});
