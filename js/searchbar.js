let searchData = {};

fetch("/data/searchdata.json")
  .then(response => response.json())
  .then(data => {
    searchData = data;
  })
  .catch(error => console.error("Error cargando JSON:", error));

function handleSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  let found = false;

  for (const key in searchData) {
    if (input.includes(key.toLowerCase())) {
      found = true;
      const target = searchData[key];
      if (target.startsWith("#")) {
        document.querySelector(target).scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(target, "_blank");
      }
      break;
    }
  }

  if (!found) {
    const suggestions = Object.keys(searchData).filter(word =>
      word.toLowerCase().includes(input)
    );

    if (suggestions.length > 0) {
      resultsContainer.innerHTML = "<p>¿Quizás quisiste decir?:</p>";
      suggestions.forEach(s => {
        const btn = document.createElement("button");
        btn.textContent = s;
        btn.onclick = () => {
          const target = searchData[s];
          if (target.startsWith("#")) {
            document.querySelector(target).scrollIntoView({ behavior: "smooth" });
          } else {
            window.open(target, "_blank");
          }
        };
        resultsContainer.appendChild(btn);
      });
    } else {
      resultsContainer.innerHTML = "<p>No se encontraron resultados</p>";
    }
  }
}
