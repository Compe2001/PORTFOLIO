window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content   = document.getElementById("content");

  // Espera a que la animación de texto termine (~2.2s) antes del fade-out
  
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      if (content) content.style.display = "block";
    }, 1000); // coincide con transition del CSS
  }, 2000);
});
