// ============================================================
// HyperTube HyperBar
// ============================================================

(function () {

    // --------------------------------------------------------
    // AYAR
    // --------------------------------------------------------

    // 1 = Arama ortada
    // 2 = Arama sağda
    const searchset = 1;


    let hyperbar = null;
    let expandedItem = null;


    // --------------------------------------------------------
    // BAŞLAT
    // --------------------------------------------------------

    function initHyperBar() {

        if (!document.body) {
            setTimeout(initHyperBar, 100);
            return;
        }

        if (document.querySelector("#ht-hyperbar")) {
            return;
        }

        createHyperBar();
    }


    // --------------------------------------------------------
    // HYPERBAR OLUŞTUR
    // --------------------------------------------------------

    function createHyperBar() {

        hyperbar = document.createElement("div");

        hyperbar.id = "ht-hyperbar";

        hyperbar.className =
            searchset === 2
                ? "search-right"
                : "search-center";


        // ----------------------------------------------------
        // PROFİL
        // ----------------------------------------------------

        const profile =
            createItem(
                "profile",
                "Profil",
                "●"
            );


        // ----------------------------------------------------
        // BİLDİRİMLER
        // ----------------------------------------------------

        const notifications =
            createItem(
                "notification",
                "Bildirimler",
                "●"
            );


        // ----------------------------------------------------
        // ARAMA
        // ----------------------------------------------------

        const search =
            createSearchItem();


        // ----------------------------------------------------
        // SIRALAMA
        // ----------------------------------------------------

        if (searchset === 1) {

            profile.style.order = "1";
            search.style.order = "2";
            notifications.style.order = "3";

        } else {

            profile.style.order = "1";
            notifications.style.order = "2";
            search.style.order = "3";

        }


        hyperbar.appendChild(profile);
        hyperbar.appendChild(search);
        hyperbar.appendChild(notifications);


        document.body.appendChild(hyperbar);


        setupEvents(
            profile,
            notifications,
            search
        );
    }


    // --------------------------------------------------------
    // NORMAL BUTON
    // --------------------------------------------------------

    function createItem(type, title, icon) {

        const item =
            document.createElement("div");

        item.className =
            "ht-hyperbar-item ht-" +
            type +
            "-item";

        item.dataset.type = type;

        item.innerHTML = `
            <div class="ht-hyperbar-icon">
                ${icon}
            </div>

            <div class="ht-hyperbar-content">
                <div class="ht-context-inner">
                    <span class="ht-context-title">
                        ${title}
                    </span>
                </div>
            </div>
        `;

        return item;
    }


    // --------------------------------------------------------
    // ARAMA BUTONU
    // --------------------------------------------------------

    function createSearchItem() {

        const item =
            document.createElement("div");

        item.className =
            "ht-hyperbar-item ht-search-item";

        item.dataset.type = "search";

        item.innerHTML = `
            <div class="ht-hyperbar-icon">
                ⌕
            </div>

            <div class="ht-hyperbar-content">
                <input
                    class="ht-search-input"
                    type="text"
                    placeholder="Ara"
                    autocomplete="off"
                    spellcheck="false"
                >
            </div>
        `;

        return item;
    }


    // --------------------------------------------------------
    // EVENTLER
    // --------------------------------------------------------

    function setupEvents(
        profile,
        notifications,
        search
    ) {

        profile.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (
                    expandedItem === profile
                ) {
                    collapseItem();
                    return;
                }

                expandItem(profile);

            }
        );


        notifications.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (
                    expandedItem === notifications
                ) {
                    collapseItem();
                    return;
                }

                expandItem(notifications);

            }
        );


        search.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                if (
                    expandedItem === search
                ) {
                    return;
                }

                expandItem(search);

                const input =
                    search.querySelector(
                        ".ht-search-input"
                    );

                if (input) {

                    setTimeout(() => {
                        input.focus();
                    }, 200);

                }

            }
        );


        const input =
            search.querySelector(
                ".ht-search-input"
            );


        if (input) {

            input.addEventListener(
                "click",
                event => {
                    event.stopPropagation();
                }
            );


            input.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {

                        const value =
                            input.value.trim();

                        if (!value) {
                            return;
                        }

                        window.location.href =
                            "/results?search_query=" +
                            encodeURIComponent(value);

                    }


                    if (
                        event.key === "Escape"
                    ) {

                        input.value = "";

                        collapseItem();

                    }

                }
            );

        }


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !hyperbar ||
                    !hyperbar.contains(
                        event.target
                    )
                ) {

                    collapseItem();

                }

            }
        );
    }


    // --------------------------------------------------------
    // BUTON BÜYÜT
    // --------------------------------------------------------

    function expandItem(item) {

        if (
            expandedItem &&
            expandedItem !== item
        ) {

            collapseItem();

        }


        expandedItem = item;

        hyperbar.classList.add(
            "has-expanded"
        );

        item.classList.add(
            "expanded"
        );


        if (
            item.dataset.type ===
            "search"
        ) {

            item.classList.add(
                "search-expanded"
            );

        }


        if (
            item.dataset.type ===
            "profile"
        ) {

            openProfileContext(item);

        }


        if (
            item.dataset.type ===
            "notification"
        ) {

            openNotificationContext(item);

        }
    }


    // --------------------------------------------------------
    // BUTON KÜÇÜLT
    // --------------------------------------------------------

    function collapseItem() {

        if (!expandedItem) {
            return;
        }


        expandedItem.classList.remove(
            "expanded"
        );

        expandedItem.classList.remove(
            "search-expanded"
        );


        hyperbar.classList.remove(
            "has-expanded"
        );


        expandedItem =
            null;
    }


    // --------------------------------------------------------
    // PROFİL CONTEXT
    // --------------------------------------------------------

    function openProfileContext(item) {

        const content =
            item.querySelector(
                ".ht-hyperbar-content"
            );

        if (!content) {
            return;
        }


        let avatarSrc = "";
        let name = "Profil";


        if (
            typeof htProfileButton !==
            "undefined" &&
            htProfileButton
        ) {

            const image =
                htProfileButton.querySelector(
                    "img"
                );

            if (image) {
                avatarSrc =
                    image.src;
            }

        }


        const nameElement =
            document.querySelector(
                ".ht-profile-name"
            );


        if (
            nameElement &&
            nameElement.textContent.trim()
        ) {

            name =
                nameElement.textContent.trim();

        }


        content.innerHTML = `
            <div class="ht-profile-context">

                <div class="ht-profile-context-avatar">

                    ${
                        avatarSrc
                            ? `<img src="${avatarSrc}">`
                            : ""
                    }

                </div>

                <div class="ht-profile-context-name">
                    ${escapeHTML(name)}
                </div>

            </div>
        `;


        content
            .querySelector(
                ".ht-profile-context"
            )
            ?.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    if (
                        typeof openHyperTubeProfileMenu ===
                        "function"
                    ) {

                        collapseItem();

                        openHyperTubeProfileMenu();

                    }

                }
            );
    }


    // --------------------------------------------------------
    // BİLDİRİM CONTEXT
    // --------------------------------------------------------

    function openNotificationContext(item) {

        const content =
            item.querySelector(
                ".ht-hyperbar-content"
            );

        if (!content) {
            return;
        }


        content.innerHTML = `
            <div class="ht-notification-list">

                <span class="ht-notification-text">
                    Bildirimler
                </span>

            </div>
        `;
    }


    // --------------------------------------------------------
    // HTML GÜVENLİĞİ
    // --------------------------------------------------------

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    // --------------------------------------------------------
    // BAŞLAT
    // --------------------------------------------------------

    initHyperBar();

})();