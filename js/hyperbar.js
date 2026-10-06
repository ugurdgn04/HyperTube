(function () {

  const searchset = 1;

  let hyperBar = null;
  let searchButton = null;
  let notificationButton = null;
  let profileButton = null;

  const FALLBACK_AVATAR = `
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5Z"></path>
    </svg>`;

  function initHyperBar() {
    if (!document.body) {
      setTimeout(initHyperBar, 100);
      return;
    }

    if (document.querySelector("#ht-hyperbar")) return;

    createHyperBar();
  }

  function createHyperBar() {
    hyperBar = document.createElement("div");
    hyperBar.id = "ht-hyperbar";

    hyperBar.innerHTML = `
      <div class="ht-hyperbar-item ht-search-item" id="ht-search-button">
        <div class="ht-hyperbar-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44 1.41-1.41-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"></path>
          </svg>
        </div>
        <div class="ht-hyperbar-content">
          <input id="ht-search-input" class="ht-search-input" type="text" placeholder="Ara" autocomplete="off" spellcheck="false">
        </div>
      </div>

      <div class="ht-hyperbar-item ht-notification-item" id="ht-notification-button">
        <div class="ht-hyperbar-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-5-1.5-2V10a5.5 5.5 0 0 0-4.5-5.4V4a1 1 0 0 0-2 0v.6A5.5 5.5 0 0 0 6.5 10v5L5 17v1h14v-1Z"></path>
          </svg>
        </div>
        <div class="ht-hyperbar-content">
          <div class="ht-notification-text">Bildirimler</div>
        </div>
      </div>

      <div class="ht-hyperbar-item ht-profile-item" id="ht-profile-button">
        <div class="ht-profile-avatar-small" id="ht-profile-avatar-small"></div>
        <div class="ht-hyperbar-content">
          <div class="ht-profile-text">Profil</div>
        </div>
      </div>
    `;

    document.body.appendChild(hyperBar);

    searchButton = document.querySelector("#ht-search-button");
    notificationButton = document.querySelector("#ht-notification-button");
    profileButton = document.querySelector("#ht-profile-button");

    setupSearch();
    setupNotification();
    setupProfile();
    copyProfileImage();
    applySearchPosition();

    // Profil resmi geç yüklenebilir; düzenli olarak kontrol et.
    setInterval(copyProfileImage, 1000);
  }

  function getProfileAvatarUrl() {
    // profile.js içindeki ortak fonksiyonu kullan.
    if (typeof getNativeAvatarUrl === "function") {
      const url = getNativeAvatarUrl();
      if (url) return url;
    }

    const img = document.querySelector("#avatar-btn img");
    return window.__HT_PROFILE_AVATAR_URL ||
      img?.currentSrc ||
      img?.src ||
      "";
  }

  function copyProfileImage() {
    const target = document.querySelector("#ht-profile-avatar-small");
    if (!target) return;

    const src = getProfileAvatarUrl();

    if (!src) {
      // Resim henüz yoksa şimdilik bir kişi ikonu göster.
      if (!target.querySelector("svg") && !target.querySelector("img")) {
        target.innerHTML = FALLBACK_AVATAR;
      }
      return;
    }

    const currentImg = target.querySelector("img");

    if (!currentImg || currentImg.getAttribute("src") !== src) {
      target.innerHTML = "";

      const image = document.createElement("img");
      image.src = src;
      image.alt = "";
      image.draggable = false;
      image.referrerPolicy = "no-referrer";
      target.appendChild(image);
    }

    const menuImage = document.querySelector(".ht-profile-avatar-img");
    if (menuImage && menuImage.getAttribute("src") !== src) {
      menuImage.src = src;
    }
  }

  function applySearchPosition() {
    if (!hyperBar) return;

    hyperBar.classList.toggle("search-center", searchset === 1);
    hyperBar.classList.toggle("search-right", searchset === 2);
  }

  function setupSearch() {
    if (!searchButton) return;

    const input = searchButton.querySelector("#ht-search-input");

    searchButton.addEventListener("click", event => {
      event.stopPropagation();
      expandButton(searchButton);
      setTimeout(() => input?.focus(), 120);
    });

    input.addEventListener("click", event => event.stopPropagation());

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const value = input.value.trim();
        if (!value) return;
        window.location.href = "/results?search_query=" + encodeURIComponent(value);
      }

      if (event.key === "Escape") collapseButton(searchButton);
    });

    input.addEventListener("input", () => {
      searchButton.style.width = Math.min(220 + input.value.length * 7, 500) + "px";
    });
  }

  function setupNotification() {
    if (!notificationButton) return;

    notificationButton.addEventListener("click", event => {
      event.stopPropagation();
      expandButton(notificationButton);
    });
  }

  function setupProfile() {
    if (!profileButton) return;

    profileButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      const menu = document.querySelector(".ht-profile-menu");

      if (menu?.classList.contains("open")) {
        if (typeof closeHyperTubeProfileMenu === "function") {
          closeHyperTubeProfileMenu();
        } else {
          menu.classList.remove("open");
          document.body.classList.remove("ht-profile-open");
        }
        return;
      }

      if (typeof createHyperTubeProfileMenu === "function" && !menu) {
        createHyperTubeProfileMenu();
      }

      copyProfileImage();

      if (typeof openHyperTubeProfileMenu === "function") {
        openHyperTubeProfileMenu();
      }

      copyProfileImage();
    });
  }

  function expandButton(button) {
    document.querySelectorAll(".ht-hyperbar-item.expanded").forEach(other => {
      if (other !== button) collapseButton(other);
    });

    button.classList.add("expanded");
    hyperBar.classList.add("has-expanded");
  }

  function collapseButton(button) {
    if (!button) return;

    button.classList.remove("expanded");
    button.style.width = "";

    const input = button.querySelector("#ht-search-input");
    if (input) input.value = "";

    if (!document.querySelector(".ht-hyperbar-item.expanded")) {
      hyperBar?.classList.remove("has-expanded");
    }
  }

  document.addEventListener("click", event => {
    if (!hyperBar) return;
    if (hyperBar.contains(event.target)) return;

    const profileMenu = document.querySelector(".ht-profile-menu");
    if (profileMenu?.contains(event.target)) return;

    document.querySelectorAll(".ht-hyperbar-item.expanded").forEach(collapseButton);

    if (typeof closeHyperTubeProfileMenu === "function") {
      closeHyperTubeProfileMenu();
    } else {
      profileMenu?.classList.remove("open");
      document.body.classList.remove("ht-profile-open");
    }
  }, true);

  initHyperBar();

})();