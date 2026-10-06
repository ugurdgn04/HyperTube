// Filter Bar Replacement Module

function initFilterModule() {
  const primaryContent = document.querySelector("#primary");
  if (primaryContent && !document.querySelector(".ht-filter-container")) {
    const filterContainer = document.createElement("div");
    filterContainer.className = "ht-filter-container";

    const filterBtn = document.createElement("button");
    filterBtn.className = "ht-filter-btn";
    filterBtn.innerHTML = `${HT_ICONS.filter} <span>Filtrele</span>`;
    
    filterBtn.addEventListener("click", () => {
      alert("Filtreleme menüsü yakında eklenecek!");
    });

    filterContainer.appendChild(filterBtn);
    primaryContent.prepend(filterContainer);
  }
}