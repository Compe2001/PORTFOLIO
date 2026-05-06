const videoTrack = document.querySelector(".video-carousel-track");
const prevVideoBtn = document.querySelector(".video-carousel-btn.prev");
const nextVideoBtn = document.querySelector(".video-carousel-btn.next");

let videoIndex = 0;

function updateVideoCarousel() {
  const cardWidth = document.querySelector(".video-card").offsetWidth + 20;
  videoTrack.style.transform = `translateX(-${videoIndex * cardWidth}px)`;
}

nextVideoBtn.addEventListener("click", () => {
  if (videoIndex < videoTrack.children.length - 1) {
    videoIndex++;
    updateVideoCarousel();
  }
});

prevVideoBtn.addEventListener("click", () => {
  if (videoIndex > 0) {
    videoIndex--;
    updateVideoCarousel();
  }
});
