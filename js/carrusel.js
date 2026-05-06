document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".logo-carousel");

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll("img");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    let currentIndex = 0;

    // Mostrar primera imagen
    images[currentIndex].classList.add("active");

    function showImage(index) {
      images.forEach(img => img.classList.remove("active"));
      images[index].classList.add("active");
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
  });
});
