(function() {
  const container = document.createElement('div');
  container.id = 'bg-shapes';
  document.body.prepend(container);

  const svgNS = "http://www.w3.org/2000/svg";

  // --- 1. Cintas fluidas (curvas que se ondulan con el ratón) ---
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  container.appendChild(svg);

  // Función para crear una cinta con múltiples curvas Bezier
  function createFluidPath(d, id) {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("id", id);
    path.classList.add("fluid-line");
    return path;
  }

  // Cuatro trayectorias base (ondas suaves)
  const fluidPaths = [
    "M-100,200 C150,100 250,300 400,200 C550,100 700,350 900,200 C1000,150 1100,250 1200,200",
    "M-50,500 C200,400 300,600 500,500 C650,420 800,650 1000,500 C1100,450 1150,550 1250,500",
    "M100,800 C250,700 350,900 550,800 C700,720 850,950 1050,800 C1150,750 1200,850 1300,800",
    "M-80,350 C100,250 200,450 350,350 C500,250 650,500 850,350 C1000,250 1100,400 1200,350"
  ];

  fluidPaths.forEach((d, i) => {
    svg.appendChild(createFluidPath(d, `fluid-${i}`));
  });

  // --- 2. Partículas luminosas (destellos) ---
  const particles = [];
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'glow-particle';
    const size = Math.random() * 50 + 30; // 30px a 80px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.top = Math.random() * 90 + 5 + '%';
    particle.style.left = Math.random() * 90 + 5 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    container.appendChild(particle);

    particles.push({
      element: particle,
      speed: Math.random() * 0.04 + 0.02,
      origX: parseFloat(particle.style.left),
      origY: parseFloat(particle.style.top)
    });
  }

  // --- Movimiento parallax + ondulación de cintas ---
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });
  document.addEventListener('touchmove', e => {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
  });

  function animate() {
    mouseX += (targetX - mouseX) * 0.06;
    mouseY += (targetY - mouseY) * 0.06;

    // Ondular las cintas moviendo puntos de control (simulado con transform)
    const fluidLines = document.querySelectorAll('.fluid-line');
    fluidLines.forEach((line, i) => {
      const factor = 0.01 + i * 0.005;
      const dx = (mouseX - window.innerWidth/2) * factor;
      const dy = (mouseY - window.innerHeight/2) * factor * 0.5;
      line.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    // Mover partículas
    particles.forEach(p => {
      const rect = p.element.getBoundingClientRect();
      const centerX = rect.left + rect.width/2;
      const centerY = rect.top + rect.height/2;
      const deltaX = (mouseX - centerX) * p.speed;
      const deltaY = (mouseY - centerY) * p.speed;
      const maxMove = 40;
      const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX));
      const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY));
      p.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
})();