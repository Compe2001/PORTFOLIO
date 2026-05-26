/**
 * Carrusel de Imágenes - Producción Gráfica
 * Sistema de navegación con soporte para teclado y accesibilidad
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeCarousels();
});

function initializeCarousels() {
  // Obtener todos los carruseles en la página
  const carousels = document.querySelectorAll('.pg-carousel');
  
  carousels.forEach(carousel => {
    initializeCarousel(carousel);
  });
}

function initializeCarousel(carouselElement) {
  const track = carouselElement.querySelector('.pg-carousel-track');
  const slides = carouselElement.querySelectorAll('.pg-carousel-slide');
  const prevBtn = carouselElement.querySelector('.pg-carousel-prev');
  const nextBtn = carouselElement.querySelector('.pg-carousel-next');
  const dots = carouselElement.querySelectorAll('.pg-carousel-dot');
  
  if (!slides.length) return;
  
  let currentIndex = 0;
  let autoplayInterval = null;
  
  // Marcar el primer slide como activo
  slides[0].classList.add('active');
  if (dots[0]) dots[0].classList.add('active');
  
  /**
   * Mostrar un slide específico
   */
  function showSlide(index) {
    // Asegurar que el índice está dentro del rango
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }
    
    // Remover clase activa de todos los slides y dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.setAttribute('aria-selected', 'false');
    });
    
    // Agregar clase activa al slide y dot actual
    slides[currentIndex].classList.add('active');
    slides[currentIndex].setAttribute('aria-current', 'true');
    
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
      dots[currentIndex].setAttribute('aria-selected', 'true');
    }
  }
  
  /**
   * Ir al siguiente slide
   */
  function nextSlide() {
    showSlide(currentIndex + 1);
    resetAutoplay();
  }
  
  /**
   * Ir al slide anterior
   */
  function prevSlide() {
    showSlide(currentIndex - 1);
    resetAutoplay();
  }
  
  /**
   * Ir a un slide específico por índice
   */
  function goToSlide(index) {
    showSlide(index);
    resetAutoplay();
  }
  
  /**
   * Iniciar autoplay (opcional)
   */
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 segundos por slide
  }
  
  /**
   * Detener y reiniciar autoplay
   */
  function resetAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    // Descomentar la siguiente línea para autoplay automático:
    // startAutoplay();
  }
  
  /**
   * Event Listeners para botones
   */
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
    // Accesibilidad: tecla flecha izquierda
    prevBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        prevSlide();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
    // Accesibilidad: tecla flecha derecha
    nextBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
    });
  }
  
  /**
   * Event Listeners para dots
   */
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      goToSlide(index);
    });
    
    // Accesibilidad: navegación con teclado
    dot.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(index);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextDot = dots[index + 1] || dots[0];
        nextDot.focus();
        goToSlide((index + 1) % dots.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevDot = dots[index - 1] || dots[dots.length - 1];
        prevDot.focus();
        goToSlide((index - 1 + dots.length) % dots.length);
      }
    });
  });
  
  /**
   * Navegación por teclado en el carrusel
   */
  carouselElement.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  });
  
  // Hacer el carrusel focusable
  carouselElement.setAttribute('tabindex', '0');
  
  /**
   * Pausar autoplay al pasar el mouse
   */
  carouselElement.addEventListener('mouseenter', () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  });
  
  carouselElement.addEventListener('mouseleave', () => {
    // Descomentar para reanudar autoplay:
    // startAutoplay();
  });
  
  // Iniciar autoplay (opcional)
  // startAutoplay();
}

/**
 * Función para detectar swipe en dispositivos móviles
 */
function detectSwipe(element) {
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe a la izquierda - siguiente slide
      const nextBtn = element.querySelector('.pg-carousel-next');
      if (nextBtn) nextBtn.click();
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe a la derecha - slide anterior
      const prevBtn = element.querySelector('.pg-carousel-prev');
      if (prevBtn) prevBtn.click();
    }
  }
  
  element.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  element.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
}

// Aplicar detección de swipe a todos los carruseles
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.pg-carousel').forEach(carousel => {
    detectSwipe(carousel);
  });
});

/**
 * Preload de imágenes para mejor rendimiento
 */
function preloadImages() {
  const images = document.querySelectorAll('.pg-carousel-slide img');
  images.forEach(img => {
    const preloadImg = new Image();
    preloadImg.src = img.src;
  });
}

document.addEventListener('DOMContentLoaded', preloadImages);

/**
 * Lazy loading de imágenes que no estén visibles
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src; // Ya tiene src, esto es para asegurar carga
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}
