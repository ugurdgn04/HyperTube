// HyperTube Modular Floating Menu & Persistent Dock Controller

function initDockModule() {
  // YouTube menülerinden tamamen bağımsız direct render
  if (document.body) {
    setupFloatingMenu();
  } else {
    document.addEventListener("DOMContentLoaded", setupFloatingMenu);
  }
}

function setupFloatingMenu() {
  let floatingMenu = document.querySelector(".ht-floating-menu");
  if (floatingMenu) return;

  // 1. Ana Kapsayıcı
  floatingMenu = document.createElement("div");
  floatingMenu.className = "ht-floating-menu";

  // Trigger (Açma/Kapama) Butonu
  const trigger = document.createElement("div");
  trigger.className = "ht-floating-trigger";
  trigger.innerHTML = (typeof HT_ICONS !== "undefined" && HT_ICONS.menu) ? HT_ICONS.menu : "☰";
  trigger.title = "Menüyü Aç";

  // İçerik Alanı
  const contentWrapper = document.createElement("div");
  contentWrapper.className = "ht-menu-content-wrapper";

  // Toolbar (Üst Araç Çubuğu)
  const toolbar = document.createElement("div");
  toolbar.className = "ht-menu-toolbar";

  const dockBtn = document.createElement("button");
  dockBtn.className = "ht-tool-icon-btn ht-dock-toggle-btn";
  dockBtn.innerHTML = (typeof HT_ICONS !== "undefined" && HT_ICONS.dock) ? HT_ICONS.dock : "⛶";
  dockBtn.title = "Dock / Panel Modu";

  const closeBtn = document.createElement("button");
  closeBtn.className = "ht-tool-icon-btn";
  closeBtn.innerHTML = (typeof HT_ICONS !== "undefined" && HT_ICONS.close) ? HT_ICONS.close : "✕";
  closeBtn.title = "Kapat";

  toolbar.appendChild(dockBtn);
  toolbar.appendChild(closeBtn);

  // KENDİ MODÜLER BUTONLARIMIZIN EKLENECEĞİ ALAN
  const scrollArea = document.createElement("div");
  scrollArea.className = "ht-menu-scroll-area";
  scrollArea.id = "ht-buttons-container";

  // dockButtons.js ÜZERİNDEN RENDER
  renderDockButtons(scrollArea);

  // Yapıyı Birleştir
  contentWrapper.appendChild(toolbar);
  contentWrapper.appendChild(scrollArea);
  floatingMenu.appendChild(trigger);
  floatingMenu.appendChild(contentWrapper);
  document.body.appendChild(floatingMenu);

  // Kayıtlı Mod Kontrolü
  const savedMode = localStorage.getItem("ht_layout_mode");
  if (savedMode === "dock") {
    document.body.classList.add("ht-dock-mode");
  }

  // Tıklama Olayları
  trigger.addEventListener("click", () => floatingMenu.classList.add("open"));
  closeBtn.addEventListener("click", () => floatingMenu.classList.remove("open"));

  dockBtn.addEventListener("click", () => {
    const isDock = document.body.classList.toggle("ht-dock-mode");
    localStorage.setItem("ht_layout_mode", isDock ? "dock" : "panel");
    if (isDock) floatingMenu.classList.remove("open");
  });

  // Dışarıya tıklayınca kapatma (Panel modunda)
  document.addEventListener("click", (e) => {
    if (
      !document.body.classList.contains("ht-dock-mode") &&
      !floatingMenu.contains(e.target) &&
      floatingMenu.classList.contains("open")
    ) {
      floatingMenu.classList.remove("open");
    }
  });
}

// dockButtons.js'den gelen array'i dinamik olarak HTML'e döken fonksiyon
function renderDockButtons(container) {
  container.innerHTML = "";
  
  const buttonsList = (typeof getDockButtons === "function") ? getDockButtons() : [];

  buttonsList.forEach(btnConfig => {
    const btnElem = document.createElement("a");
    btnElem.className = "ht-dock-item";
    btnElem.href = btnConfig.url;
    btnElem.dataset.id = btnConfig.id;
    btnElem.title = btnConfig.title;

    btnElem.innerHTML = `
      <div class="ht-dock-icon">${btnConfig.svg}</div>
      <span class="ht-dock-label">${btnConfig.title}</span>
    `;

    container.appendChild(btnElem);
  });
}

// Çalıştır
initDockModule();