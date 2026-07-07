// 1. Estados de control
let searchData = {};
let isLoading = true; // Para saber si ya cargó

// 2. Carga asíncrona con async/await (más legible)
async function loadData() {
  try {
    const response = await fetch("../data/searchdata.json");
    searchData = await response.json();
    isLoading = false;
    console.log("Datos listos para buscar");
    // Opcional: activar el input/botón aquí si estaban deshabilitados
  } catch (error) {
    console.error("Error crítico cargando el JSON:", error);
    isLoading = false; // Para que no se quede bloqueado
    document.getElementById("searchResults").innerHTML = 
      "<p style='color:red'>Error al cargar los datos de búsqueda</p>";
  }
}
loadData();

// 3. Función auxiliar para ejecutar la acción (con validación de seguridad)
function ejecutarAccion(target) {
  if (target.startsWith("#")) {
    const elemento = document.querySelector(target);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`El elemento "${target}" no existe en el DOM`);
      alert(`El destino "${target}" no se encontró en la página.`);
    }
  } else {
    // Abrir en nueva pestaña (cuidado con bloqueadores de popups)
    window.open(target, "_blank");
  }
}

// 4. Función de búsqueda mejorada
function handleSearch() {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = ""; // Limpiar siempre

  // Validar si aún está cargando
  if (isLoading) {
    resultsContainer.innerHTML = "<p>Cargando datos, espera un momento...</p>";
    return;
  }

  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  if (input === "") {
    resultsContainer.innerHTML = "<p>Escribe algo para buscar</p>";
    return;
  }

  // Convertir el objeto en un array de [clave, valor] para iterar seguro
  const entries = Object.entries(searchData);
  let found = false;

  // PRIMERO: Buscar por coincidencia exacta o que EMPIECE por el input (más natural)
  for (const [key, target] of entries) {
    const lowerKey = key.toLowerCase();
    // Ej: si escribe "ho", que coincida con "home" y "hotel"
    if (lowerKey === input || lowerKey.startsWith(input)) {
      found = true;
      ejecutarAccion(target);
      break; // Tomamos la primera que coincida (puedes ordenar prioridades)
    }
  }

  // SEGUNDO: Si no encontró, mostrar sugerencias (como ya tenías, pero mejorado)
  if (!found) {
    // Buscar claves que CONTENGAN el input (para sugerencias amplias)
    const suggestions = entries
      .filter(([key]) => key.toLowerCase().includes(input))
      .map(([key]) => key);

    if (suggestions.length > 0) {
      resultsContainer.innerHTML = "<p>🔍 ¿Quizás quisiste decir?:</p>";
      suggestions.forEach(s => {
        const btn = document.createElement("button");
        btn.textContent = s;
        btn.onclick = () => {
          const target = searchData[s];
          if (target) ejecutarAccion(target);
        };
        resultsContainer.appendChild(btn);
      });
    } else {
      resultsContainer.innerHTML = "<p>😕 No se encontraron resultados para tu búsqueda</p>";
    }
  }
}