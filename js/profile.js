// ============================================================
// HyperTube Profile Menu
// Profil butonu -> Glassmorphism hesap menüsü
// ============================================================

let htProfileMenu = null;
let htProfileButton = null;
let htProfileOpen = false;
let htBypassClick = false;

// ------------------------------------------------------------
// YARDIMCI FONKSİYONLAR
// ------------------------------------------------------------

function waitFor(check, timeout = 1500, interval = 50) {
  return new Promise(resolve => {
    const start = Date.now();
    (function tick() {
      const result = check();
      if (result) return resolve(result);
      if (Date.now() - start > timeout) return resolve(null);
      setTimeout(tick, interval);
    })();
  });
}

function getNativeAvatarUrl() {
  const img = document.querySelector("#avatar-btn img");
  const src = img ? (img.currentSrc || img.src || "") : "";

  if (src && src.startsWith("http")) {
    window.__HT_PROFILE_AVATAR_URL = src;
    try { localStorage.setItem("ht_avatar_url", src); } catch (e) {}
    return src;
  }

  return window.__HT_PROFILE_AVATAR_URL ||
    localStorage.getItem("ht_avatar_url") ||
    "";
}

function getVisibleNativeMenu() {
  const menus = document.querySelectorAll(
    "ytd-popup-container ytd-multi-page-menu-renderer"
  );

  for (const menu of menus) {
    const isAccount =
      menu.querySelector("ytd-active-account-header-renderer") ||
      (menu.getAttribute("menu-style") || "").includes("account");

    if (isAccount && menu.offsetWidth > 0 && menu.offsetHeight > 0) {
      return menu;
    }
  }
  return null;
}

// ------------------------------------------------------------
// BAŞLAT
// ------------------------------------------------------------

function initProfileModule() {
  findProfileButton();
}

// ------------------------------------------------------------
// YOUTUBE PROFİL BUTONUNU BUL
// ------------------------------------------------------------

function findProfileButton() {
  const button = document.querySelector("#avatar-btn");

  if (!button) {
    setTimeout(findProfileButton, 500);
    return;
  }

  if (button.dataset.htProfileReady === "true") return;

  htProfileButton = button;
  button.dataset.htProfileReady = "true";

  createHyperTubeProfileMenu();

  // YouTube'un kendi profil menüsünü doğrudan açmasını engelle.
  button.addEventListener("click", handleProfileClick, true);
  document.addEventListener("click", handleOutsideClick);
}

// ------------------------------------------------------------
// PROFİL TIKLAMA
// ------------------------------------------------------------

function handleProfileClick(event) {
  // Biz kendimiz YouTube menüsünü açarken engelleme.
  if (htBypassClick) return;

  event.preventDefault();
  event.stopPropagation();

  if (htProfileOpen) {
    closeHyperTubeProfileMenu();
  } else {
    openHyperTubeProfileMenu();
  }
}

// ------------------------------------------------------------
// MENÜ OLUŞTUR
// ------------------------------------------------------------

function createHyperTubeProfileMenu() {
  if (document.querySelector(".ht-profile-menu")) {
    htProfileMenu = document.querySelector(".ht-profile-menu");
    return;
  }

  const menu = document.createElement("div");
  menu.className = "ht-profile-menu";

  menu.innerHTML = `
    <div class="ht-profile-inner">

      <div class="ht-profile-header">
        <div class="ht-profile-avatar">
          <img class="ht-profile-avatar-img" src="" alt="" referrerpolicy="no-referrer">
        </div>
        <div class="ht-profile-user">
          <div class="ht-profile-name">Hesap</div>
          <div class="ht-profile-email">YouTube</div>
        </div>
      </div>

      <button class="ht-profile-channel ht-profile-action" data-action="channel">
        Kanalınızı görüntüleyin
      </button>

      <div class="ht-profile-section">
        <button class="ht-profile-row" data-action="settings">
          <span class="ht-profile-row-icon">⚙</span>
          <span>Ayarlar</span>
        </button>
        <button class="ht-profile-row" data-action="studio">
          <span class="ht-profile-row-icon">▶</span>
          <span>YouTube Studio</span>
        </button>
        <button class="ht-profile-row" data-action="purchases">
          <span class="ht-profile-row-icon">♡</span>
          <span>Satın Alınanlar ve Üyelikler</span>
        </button>
      </div>

      <div class="ht-profile-account-actions">
        <button class="ht-profile-circle-action" data-action="google">
          <span class="ht-circle-icon">G</span>
          <span>Google Hesabı</span>
        </button>
        <button class="ht-profile-circle-action" data-action="switch">
          <span class="ht-circle-icon">⇄</span>
          <span>Hesap Değiştir</span>
        </button>
        <button class="ht-profile-circle-action" data-action="logout">
          <span class="ht-circle-icon">↪</span>
          <span>Oturumu Kapat</span>
        </button>
      </div>

      <button class="ht-profile-other" id="ht-profile-other-button">
        <span>Diğer seçenekler</span>
        <span class="ht-profile-arrow" id="ht-profile-other-arrow">›</span>
      </button>

      <div class="ht-profile-extra" id="ht-profile-extra"></div>

    </div>
  `;

  document.body.appendChild(menu);
  htProfileMenu = menu;

  setupProfileMenuEvents();
  updateProfileInformation();
}

// ------------------------------------------------------------
// PROFİL BİLGİLERİNİ GÜNCELLE
// ------------------------------------------------------------

function updateProfileInformation() {
  const imageElement = document.querySelector(".ht-profile-avatar-img");
  const nameElement = document.querySelector(".ht-profile-name");
  const emailElement = document.querySelector(".ht-profile-email");

  const src = getNativeAvatarUrl();
  if (imageElement && src && imageElement.getAttribute("src") !== src) {
    imageElement.src = src;
  }

  const name = localStorage.getItem("ht_account_name");
  const email = localStorage.getItem("ht_account_email");

  if (nameElement && name) nameElement.textContent = name;
  if (emailElement && email) emailElement.textContent = email;
}

// YouTube'un gerçek menüsü açılınca isim/e-posta bilgisini kaydet.
function readNativeAccountInfo(menu) {
  if (!menu) return;

  const name = menu.querySelector("#account-name")?.textContent.trim();
  const email = menu.querySelector("#email")?.textContent.trim();

  if (name) localStorage.setItem("ht_account_name", name);
  if (email) localStorage.setItem("ht_account_email", email);

  updateProfileInformation();
}

// ------------------------------------------------------------
// MENÜ EVENTLERİ
// ------------------------------------------------------------

function setupProfileMenuEvents() {
  const otherButton = document.querySelector("#ht-profile-other-button");

  if (otherButton) {
    otherButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      // Önce bizim menüyü kapat, sonra YouTube'un eski menüsünü aç.
      closeHyperTubeProfileMenu();
      setTimeout(openNativeAccountMenu, 100);
    });
  }

  document
    .querySelectorAll(
      ".ht-profile-action, .ht-profile-row, .ht-profile-circle-action"
    )
    .forEach(button => {
      button.addEventListener("click", () => {
        executeProfileAction(button.dataset.action);
      });
    });
}

// ------------------------------------------------------------
// PROFİL İŞLEMLERİ
// ------------------------------------------------------------

async function executeProfileAction(action) {
  closeHyperTubeProfileMenu();

  switch (action) {
    case "channel":
      openUserChannel();
      break;

    case "settings":
      window.location.href = "/account";
      break;

    case "studio":
      window.open("https://studio.youtube.com/", "_blank");
      break;

    case "purchases":
      window.location.href = "/paid_memberships";
      break;

    case "google":
      window.open("https://myaccount.google.com/", "_blank");
      break;

    case "switch":
      localStorage.removeItem("ht_channel_url");
      await openNativeAccountMenu();
      clickNativeMenuItem(["Hesap değiştir", "Switch account"]);
      break;

    case "logout":
      document.body.classList.add("ht-hide-native-popup");
      await openNativeAccountMenu();
      await clickNativeMenuItem(["Oturumu kapat", "Sign out"]);
      setTimeout(() => {
        document.body.classList.remove("ht-hide-native-popup");
      }, 1500);
      break;
  }
}

// ============================================================
// KULLANICININ GERÇEK KANAL ADRESİNİ BUL
// ============================================================

async function openUserChannel() {
  const savedChannelUrl = localStorage.getItem("ht_channel_url");

  if (savedChannelUrl) {
    window.location.href = savedChannelUrl;
    return;
  }

  // Menü ekranda göz kırpmasın.
  document.body.classList.add("ht-hide-native-popup");

  const menu = await openNativeAccountMenu();
  let channelUrl = menu ? findRealChannelUrl(menu) : null;

  if (!channelUrl && menu) {
    const match = menu.textContent.match(/@([a-zA-Z0-9._-]{3,30})/);
    if (match) channelUrl = "https://www.youtube.com/@" + match[1];
  }

  closeNativeAccountMenu();

  setTimeout(() => {
    document.body.classList.remove("ht-hide-native-popup");
  }, 400);

  if (channelUrl) {
    localStorage.setItem("ht_channel_url", channelUrl);
    window.location.href = channelUrl;
  } else {
    console.warn("HyperTube: Kullanıcının kanal adresi bulunamadı.");
  }
}

function findRealChannelUrl(menu) {
  const links = menu.querySelectorAll("a[href]");

  for (const link of links) {
    const text = (link.innerText || "").trim().toLocaleLowerCase("tr");

    if (
      text.includes("kanalınızı görüntüle") ||
      text.includes("view your channel")
    ) {
      return link.href;
    }
  }

  for (const link of links) {
    if (/youtube\.com\/(@|channel\/|c\/|user\/)/.test(link.href)) {
      return link.href;
    }
  }

  return null;
}

// ------------------------------------------------------------
// GERÇEK YOUTUBE HESAP MENÜSÜNÜ AÇ / KAPAT
// ------------------------------------------------------------

async function openNativeAccountMenu() {
  let menu = getVisibleNativeMenu();
  if (menu) return menu;

  const button = document.querySelector("#avatar-btn");
  if (!button) return null;

  // Bizim engelleyici dinleyicimiz bu tıklamayı engellemesin.
  htBypassClick = true;
  try {
    button.click();
  } finally {
    htBypassClick = false;
  }

  menu = await waitFor(getVisibleNativeMenu, 2000);
  if (menu) readNativeAccountInfo(menu);

  return menu;
}

function closeNativeAccountMenu() {
  if (!getVisibleNativeMenu()) return;

  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      which: 27,
      bubbles: true
    })
  );

  setTimeout(() => {
    if (getVisibleNativeMenu()) document.body.click();
  }, 150);
}

// ------------------------------------------------------------
// YOUTUBE MENÜSÜNDEN GERÇEK BUTONU BUL VE TIKLA
// ------------------------------------------------------------

async function clickNativeMenuItem(labels) {
  const wanted = labels.map(label => label.toLocaleLowerCase("tr"));

  const item = await waitFor(() => {
    const items = document.querySelectorAll(
      "ytd-popup-container ytd-compact-link-renderer"
    );

    for (const el of items) {
      const text = (el.innerText || "").trim().toLocaleLowerCase("tr");
      if (text && wanted.some(label => text.includes(label))) return el;
    }
    return null;
  }, 2000);

  if (!item) return false;

  (item.querySelector("a") || item).click();
  return true;
}

// ------------------------------------------------------------
// MENÜYÜ AÇ
// ------------------------------------------------------------

function openHyperTubeProfileMenu() {
  if (!htProfileMenu) {
    createHyperTubeProfileMenu();
    if (!htProfileMenu) return;
  }

  updateProfileInformation();

  htProfileOpen = true;
  htProfileMenu.classList.add("open");
  document.body.classList.add("ht-profile-open");
}

// ------------------------------------------------------------
// MENÜYÜ KAPAT
// ------------------------------------------------------------

function closeHyperTubeProfileMenu() {
  if (!htProfileMenu) return;

  htProfileOpen = false;
  htProfileMenu.classList.remove("open");
  document.body.classList.remove("ht-profile-open");
}

// ------------------------------------------------------------
// DIŞARI TIKLAMA
// ------------------------------------------------------------

function handleOutsideClick(event) {
  if (!htProfileOpen) return;

  if (
    htProfileMenu &&
    !htProfileMenu.contains(event.target) &&
    !(htProfileButton && htProfileButton.contains(event.target))
  ) {
    closeHyperTubeProfileMenu();
  }
}

// ------------------------------------------------------------
// BAŞLAT
// ------------------------------------------------------------

initProfileModule();