// ============================================================
// HyperTube Profile Menu
// Profil butonu -> Glassmorphism hesap menüsü
// ============================================================

let htProfileMenu = null;
let htProfileButton = null;
let htProfileOpen = false;


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

    if (button.dataset.htProfileReady === "true") {
        return;
    }

    htProfileButton = button;
    button.dataset.htProfileReady = "true";

    createHyperTubeProfileMenu();

    // YouTube'un kendi profil menüsünü açmasını engelle.
    button.addEventListener(
        "click",
        handleProfileClick,
        true
    );

    document.addEventListener("click", handleOutsideClick);
}


// ------------------------------------------------------------
// PROFİL TIKLAMA
// ------------------------------------------------------------

function handleProfileClick(event) {
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

            <!-- PROFİL -->
            <div class="ht-profile-header">

                <div class="ht-profile-avatar">
                    <img class="ht-profile-avatar-img" src="" alt="">
                </div>

                <div class="ht-profile-user">
                    <div class="ht-profile-name">
                        Hesap
                    </div>

                    <div class="ht-profile-email">
                        YouTube
                    </div>
                </div>

            </div>


            <!-- KANAL -->
            <button
                class="ht-profile-channel ht-profile-action"
                data-action="channel">
                Kanalınızı görüntüleyin
            </button>


            <!-- ANA SEÇENEKLER -->
            <div class="ht-profile-section">

                <button
                    class="ht-profile-row"
                    data-action="settings">

                    <span class="ht-profile-row-icon">⚙</span>
                    <span>Ayarlar</span>

                </button>


                <button
                    class="ht-profile-row"
                    data-action="studio">

                    <span class="ht-profile-row-icon">▶</span>
                    <span>YouTube Studio</span>

                </button>


                <button
                    class="ht-profile-row"
                    data-action="purchases">

                    <span class="ht-profile-row-icon">♡</span>
                    <span>Satın Alınanlar ve Üyelikler</span>

                </button>

            </div>


            <!-- HESAP BUTONLARI -->
            <div class="ht-profile-account-actions">

                <button
                    class="ht-profile-circle-action"
                    data-action="google">

                    <span class="ht-circle-icon">G</span>
                    <span>Google Hesabı</span>

                </button>


                <button
                    class="ht-profile-circle-action"
                    data-action="switch">

                    <span class="ht-circle-icon">⇄</span>
                    <span>Hesap Değiştir</span>

                </button>


                <button
                    class="ht-profile-circle-action"
                    data-action="logout">

                    <span class="ht-circle-icon">↪</span>
                    <span>Oturumu Kapat</span>

                </button>

            </div>


            <!-- DİĞER SEÇENEKLER -->
            <button
                class="ht-profile-other"
                id="ht-profile-other-button">

                <span>Diğer seçenekler</span>

                <span
                    class="ht-profile-arrow"
                    id="ht-profile-other-arrow">
                    ›
                </span>

            </button>


            <!-- GELİŞMİŞ SEÇENEKLER -->
            <div
                class="ht-profile-extra"
                id="ht-profile-extra">

                <button class="ht-profile-extra-row">
                    <span>YouTube'daki verileriniz</span>
                </button>

                <button class="ht-profile-extra-row">
                    <span>Görünüm: Cihaz teması</span>
                </button>

                <button class="ht-profile-extra-row">
                    <span>Görüntülenecek dil: Türkçe</span>
                </button>

                <button class="ht-profile-extra-row">
                    <span>Kısıtlı Mod: Kapalı</span>
                </button>

                <button class="ht-profile-extra-row">
                    <span>Konum: Türkiye</span>
                </button>

                <button class="ht-profile-extra-row">
                    <span>Klavye kısayolları</span>
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(menu);

    htProfileMenu = menu;

    setupProfileMenuEvents();

    updateProfileInformation();
}


// ------------------------------------------------------------
// PROFİL BİLGİLERİNİ YOUTUBE'DAN AL
// ------------------------------------------------------------

function updateProfileInformation() {

    if (!htProfileButton) return;

    const image =
        htProfileButton.querySelector("img");

    const name =
        document.querySelector(
            "#account-name"
        );

    const imageElement =
        document.querySelector(
            ".ht-profile-avatar-img"
        );

    const nameElement =
        document.querySelector(
            ".ht-profile-name"
        );

    if (image && imageElement) {
        imageElement.src = image.src;
    }

    if (name && nameElement) {
        nameElement.textContent =
            name.textContent.trim();
    }
}


// ------------------------------------------------------------
// MENÜ EVENTLERİ
// ------------------------------------------------------------

function setupProfileMenuEvents() {

    // --------------------------------------------------------
    // DİĞER SEÇENEKLER
    // Artık kendi menümüzü genişletmiyoruz.
    // YouTube'un gerçek eski hesap menüsünü açıyoruz.
    // --------------------------------------------------------

    const otherButton =
        document.querySelector(
            "#ht-profile-other-button"
        );


    if (otherButton) {

        otherButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                /*
                 * Önce HyperTube menüsünü kapat.
                 */
                closeHyperTubeProfileMenu();


                /*
                 * Ardından gerçek YouTube hesap menüsünü aç.
                 */
                setTimeout(() => {

                    openNativeAccountMenu();

                }, 100);

            }
        );
    }


    // --------------------------------------------------------
    // NORMAL PROFİL BUTONLARI
    // --------------------------------------------------------

    document
        .querySelectorAll(
            ".ht-profile-action, " +
            ".ht-profile-row, " +
            ".ht-profile-circle-action"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    executeProfileAction(action);

                }
            );

        });
}


// ------------------------------------------------------------
// PROFİL İŞLEMLERİ
// ------------------------------------------------------------

function executeProfileAction(action) {

    switch (action) {

        case "channel":
            openUserChannel();
            break;


        case "settings":
            window.location.href = "/account";
            break;


        case "studio":
            window.open(
                "https://studio.youtube.com/",
                "_blank"
            );
            break;


        case "purchases":
            window.location.href = "/paid_memberships";
            break;


        case "google":
            window.open(
                "https://myaccount.google.com/",
                "_blank"
            );
            break;


        case "switch":
            openNativeAccountMenu();

            setTimeout(() => {
                clickNativeMenuItem([
                    "Hesap değiştir",
                    "Switch account"
                ]);
            }, 150);

            break;


        case "logout":
            openNativeAccountMenu();

            setTimeout(() => {
                clickNativeMenuItem([
                    "Oturumu kapat",
                    "Sign out"
                ]);
            }, 150);

            break;

    }
}


// ============================================================
// KULLANICININ GERÇEK KANAL ADRESİNİ BUL
// ============================================================

function openUserChannel() {

    /*
     * Daha önce bulduysak tekrar YouTube menüsünü açmaya gerek yok.
     */
    const savedChannelUrl =
        localStorage.getItem("ht_channel_url");

    if (savedChannelUrl) {
        window.location.href = savedChannelUrl;
        return;
    }


    /*
     * YouTube'un gerçek hesap menüsünü kısa süreliğine aç.
     * Oradaki "Kanalınızı görüntüleyin" bağlantısından
     * gerçek kanal URL'sini alacağız.
     */
    openNativeAccountMenu();


    setTimeout(() => {

        const channelUrl =
            findRealChannelUrl();


        /*
         * Bulabildiysek kaydet.
         */
        if (channelUrl) {

            localStorage.setItem(
                "ht_channel_url",
                channelUrl
            );

            closeNativeAccountMenu();

            window.location.href =
                channelUrl;

            return;
        }


        /*
         * URL bulunamadıysa kullanıcı adını
         * YouTube DOM'undan bulmayı dene.
         */
        const username =
            findYouTubeUsername();


        if (username) {

            const generatedUrl =
                "https://www.youtube.com/@" +
                username;

            localStorage.setItem(
                "ht_channel_url",
                generatedUrl
            );

            closeNativeAccountMenu();

            window.location.href =
                generatedUrl;

            return;
        }


        /*
         * Hiçbir şey bulunamazsa native menüyü açık bırakma.
         */
        closeNativeAccountMenu();

        console.warn(
            "HyperTube: Kullanıcının kanal adresi bulunamadı."
        );

    }, 150);

}


// ============================================================
// GERÇEK KANAL LINKİNİ YOUTUBE MENÜSÜNDEN BUL
// ============================================================

function findRealChannelUrl() {

    const links =
        document.querySelectorAll(
            'ytd-multi-page-menu-renderer a[href]'
        );


    for (const link of links) {

        const text =
            link.innerText
                ?.trim()
                .toLowerCase() || "";


        if (
            text.includes("kanalınızı görüntüleyin") ||
            text.includes("kanalınızı görüntüle") ||
            text.includes("view your channel")
        ) {

            const href =
                link.href;

            if (
                href &&
                href.includes("youtube.com")
            ) {

                return href;
            }
        }
    }


    return null;
}


// ============================================================
// KULLANICI ADINI DOM'DAN BULMAYA ÇALIŞ
// ============================================================

function findYouTubeUsername() {

    /*
     * Öncelik:
     * Profil/account alanlarında @handle arıyoruz.
     */

    const possibleElements =
        document.querySelectorAll(
            '[id*="account"], ' +
            '[class*="account"], ' +
            'ytd-active-account-header-renderer, ' +
            'yt-formatted-string'
        );


    for (const element of possibleElements) {

        const text =
            element.textContent
                ?.trim() || "";


        /*
         * @kullaniciadi formatı
         */
        const match =
            text.match(
                /@([a-zA-Z0-9._-]{3,30})/
            );


        if (match) {

            return match[1];
        }
    }


    /*
     * Eğer avatar/profile linkinin kendisinde
     * @handle varsa onu da dene.
     */

    if (htProfileButton) {

        const parentLink =
            htProfileButton.closest("a");


        if (parentLink) {

            const href =
                parentLink.href || "";


            const match =
                href.match(
                    /youtube\.com\/@([^/?#]+)/i
                );


            if (match) {

                return match[1];
            }
        }
    }


    return null;
}


// ============================================================
// YOUTUBE'NUN GERÇEK HESAP MENÜSÜNÜ KAPAT
// ============================================================

function closeNativeAccountMenu() {

    const nativeMenu =
        document.querySelector(
            'ytd-multi-page-menu-renderer[menu-style="multi-page-menu-style-type-account"]'
        );


    if (!nativeMenu) return;


    /*
     * YouTube menüsünün kendi geri/kapatma mekanizmasını
     * kullanmayı deniyoruz.
     */

    const closeButton =
        nativeMenu.querySelector(
            "#back-button, #close-button"
        );


    if (closeButton) {

        closeButton.click();
        return;
    }


    /*
     * Bulamazsak Escape gönder.
     */

    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "Escape",
            code: "Escape",
            bubbles: true
        })
    );
}

// ------------------------------------------------------------
// GERÇEK YOUTUBE HESAP MENÜSÜNÜ KULLAN
// ------------------------------------------------------------

function openNativeAccountMenu() {

    if (!htProfileButton) return;

    // Bizim capture listener'ımızı geçici olarak kaldır.
    htProfileButton.removeEventListener(
        "click",
        handleProfileClick,
        true
    );

    htProfileButton.click();

    setTimeout(() => {

        htProfileButton.addEventListener(
            "click",
            handleProfileClick,
            true
        );

    }, 100);
}


// ------------------------------------------------------------
// YOUTUBE MENÜSÜNDEN GERÇEK BUTONU BUL
// ------------------------------------------------------------

function clickNativeMenuItem(labels) {

    const items =
        document.querySelectorAll(
            "ytd-compact-link-renderer"
        );

    for (const item of items) {

        const text =
            item.innerText
                ?.trim()
                .toLowerCase();

        if (!text) continue;

        for (const label of labels) {

            if (
                text.includes(
                    label.toLowerCase()
                )
            ) {

                item.click();

                return;
            }

        }

    }
}


// ------------------------------------------------------------
// MENÜYÜ AÇ
// ------------------------------------------------------------

function openHyperTubeProfileMenu() {

    if (!htProfileMenu) return;

    updateProfileInformation();

    htProfileOpen = true;

    htProfileMenu.classList.add("open");

    document.body.classList.add(
        "ht-profile-open"
    );
}


// ------------------------------------------------------------
// MENÜYÜ KAPAT
// ------------------------------------------------------------

function closeHyperTubeProfileMenu() {

    if (!htProfileMenu) return;

    htProfileOpen = false;

    htProfileMenu.classList.remove("open");

    document.body.classList.remove(
        "ht-profile-open"
    );
}


// ------------------------------------------------------------
// DIŞARI TIKLAMA
// ------------------------------------------------------------

function handleOutsideClick(event) {

    if (!htProfileOpen) return;

    if (
        htProfileMenu &&
        !htProfileMenu.contains(event.target) &&
        !htProfileButton.contains(event.target)
    ) {

        closeHyperTubeProfileMenu();

    }

}


// ------------------------------------------------------------
// BAŞLAT
// ------------------------------------------------------------

initProfileModule();