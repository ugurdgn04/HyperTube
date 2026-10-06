(function () {

    const searchset = 1;

    let hyperBar = null;
    let searchButton = null;
    let notificationButton = null;
    let profileButton = null;


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


    function createHyperBar() {

        hyperBar = document.createElement("div");
        hyperBar.id = "ht-hyperbar";

        /*
         * Profil her zaman en sağda.
         */
        hyperBar.innerHTML = `

            <div
                class="ht-bar-button ht-search-button"
                id="ht-search-button"
            >
                <div class="ht-bar-icon">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44
                            1.41-1.41-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0
                            2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
                        />
                    </svg>
                </div>

                <div class="ht-bar-content">
                    <input
                        id="ht-search-input"
                        type="text"
                        placeholder="Ara"
                        autocomplete="off"
                        spellcheck="false"
                    >
                </div>
            </div>


            <div
                class="ht-bar-button ht-notification-button"
                id="ht-notification-button"
            >
                <div class="ht-bar-icon">

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5
                            2.5 0 0 0 12 22Zm7-5-1.5-2V10a5.5 5.5
                            0 0 0-4.5-5.4V4a1 1 0 0 0-2 0v.6A5.5
                            5.5 0 0 0 6.5 10v5L5 17v1h14v-1Z"
                        />
                    </svg>

                </div>

                <div class="ht-bar-content">
                    <div class="ht-notification-content">
                        Bildirimler
                    </div>
                </div>
            </div>


            <div
                class="ht-bar-button ht-profile-button"
                id="ht-profile-button"
            >
                <div
                    class="ht-profile-avatar-small"
                    id="ht-profile-avatar-small"
                >
                </div>

                <div class="ht-bar-content">
                    <div class="ht-profile-content">
                        Profil
                    </div>
                </div>
            </div>

        `;


        document.body.appendChild(hyperBar);


        searchButton =
            document.querySelector(
                "#ht-search-button"
            );

        notificationButton =
            document.querySelector(
                "#ht-notification-button"
            );

        profileButton =
            document.querySelector(
                "#ht-profile-button"
            );


        copyProfileImage();

        setupSearch();

        setupNotification();

        setupProfile();

        applySearchPosition();
    }


    /*
     * YouTube'un gerçek profil fotoğrafını
     * HyperBar'daki küçük yuvarlağa kopyala.
     */
    function copyProfileImage() {

        const target =
            document.querySelector(
                "#ht-profile-avatar-small"
            );

        if (!target) {
            return;
        }


        const youtubeAvatar =
            document.querySelector(
                "#avatar-btn img"
            );


        if (
            youtubeAvatar &&
            youtubeAvatar.src
        ) {

            target.innerHTML = "";

            const image =
                document.createElement("img");

            image.src =
                youtubeAvatar.src;

            image.alt = "";

            target.appendChild(image);

            return;
        }


        setTimeout(
            copyProfileImage,
            500
        );
    }


    /*
     * Aramanın konumu.
     *
     * 1 = orta
     * 2 = sağ taraf
     */
    function applySearchPosition() {

        if (!hyperBar) {
            return;
        }


        if (searchset === 1) {

            hyperBar.classList.add(
                "ht-search-center"
            );

        } else {

            hyperBar.classList.add(
                "ht-search-right"
            );

        }
    }


    /*
     * Arama
     */
    function setupSearch() {

        if (!searchButton) {
            return;
        }


        const input =
            searchButton.querySelector(
                "#ht-search-input"
            );


        searchButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                expandButton(
                    searchButton
                );

                setTimeout(
                    function () {

                        input.focus();

                    },
                    150
                );
            }
        );


        input.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );


        input.addEventListener(
            "keydown",
            function (event) {

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
                        encodeURIComponent(
                            value
                        );
                }


                if (
                    event.key === "Escape"
                ) {

                    input.value = "";

                    collapseButton(
                        searchButton
                    );
                }
            }
        );


        input.addEventListener(
            "input",
            function () {

                /*
                 * Yazdıkça büyüme.
                 * CSS max-width sınırına ulaştığında
                 * daha fazla büyümez.
                 */

                const length =
                    input.value.length;

                const size =
                    Math.min(
                        220 + length * 7,
                        480
                    );

                searchButton.style.width =
                    size + "px";
            }
        );
    }


    /*
     * Bildirim
     */
    function setupNotification() {

        if (!notificationButton) {
            return;
        }


        notificationButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                expandButton(
                    notificationButton
                );

            }
        );
    }


    /*
     * Profil
     *
     * Burada yeni profil menüsü oluşturmuyoruz.
     * Mevcut profile.js'deki menüyü açıyoruz.
     */
    function setupProfile() {

        if (!profileButton) {
            return;
        }


        profileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                /*
                 * Mevcut profile.js fonksiyonu.
                 */
                if (
                    typeof openHyperTubeProfileMenu ===
                    "function"
                ) {

                    openHyperTubeProfileMenu();

                }

            }
        );
    }


    /*
     * Buton büyütme
     */
    function expandButton(button) {

        /*
         * Önce diğer HyperBar butonlarını küçült.
         */
        document
            .querySelectorAll(
                ".ht-bar-button.ht-expanded"
            )
            .forEach(
                function (other) {

                    if (
                        other !== button
                    ) {

                        collapseButton(
                            other
                        );
                    }
                }
            );


        button.classList.add(
            "ht-expanded"
        );


        hyperBar.classList.add(
            "ht-has-expanded"
        );


        /*
         * Profil açıldığında mevcut profile.js
         * menüsünü aç.
         */
        if (
            button === profileButton
        ) {

            if (
                typeof openHyperTubeProfileMenu ===
                "function"
            ) {

                openHyperTubeProfileMenu();

            }
        }
    }


    /*
     * Buton küçültme
     */
    function collapseButton(button) {

        if (!button) {
            return;
        }


        button.classList.remove(
            "ht-expanded"
        );


        button.style.width = "";


        if (
            button === searchButton
        ) {

            const input =
                button.querySelector(
                    "#ht-search-input"
                );

            if (input) {
                input.value = "";
            }
        }


        /*
         * Profil kapanıyorsa
         * mevcut profile.js menüsünü kapat.
         */
        if (
            button === profileButton
        ) {

            if (
                typeof closeHyperTubeProfileMenu ===
                "function"
            ) {

                closeHyperTubeProfileMenu();

            }
        }


        const expanded =
            document.querySelector(
                ".ht-bar-button.ht-expanded"
            );


        if (!expanded) {

            hyperBar.classList.remove(
                "ht-has-expanded"
            );

        }
    }


    /*
     * HyperBar dışına basılırsa kapat.
     */
    document.addEventListener(
        "click",
        function (event) {

            if (
                !hyperBar ||
                hyperBar.contains(
                    event.target
                )
            ) {
                return;
            }


            document
                .querySelectorAll(
                    ".ht-bar-button.ht-expanded"
                )
                .forEach(
                    collapseButton
                );


            /*
             * Profil menüsü de kapanacak.
             */
            if (
                typeof closeHyperTubeProfileMenu ===
                "function"
            ) {

                closeHyperTubeProfileMenu();

            }
        }
    );


    /*
     * YouTube avatarı sonradan yüklenirse
     * tekrar kontrol et.
     */
    const observer =
        new MutationObserver(
            function () {

                copyProfileImage();

            }
        );


    observer.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );


    initHyperBar();

})();