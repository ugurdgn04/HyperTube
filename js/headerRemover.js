(function () {
    const REMOVE_SELECTORS = [
        "#masthead-container",
        "ytd-masthead",
        "#masthead",
        "#container.ytd-masthead",
        "#frosted-glass"
    ];

    function preserveProfileButton() {
        const button = document.querySelector("#avatar-btn");
        if (!button || button.dataset.htPreserved === "true") return;

        const image = button.querySelector("img");
        const src = image?.currentSrc || image?.src || "";
        if (src) window.__HT_PROFILE_AVATAR_URL = src;

        button.dataset.htPreserved = "true";
        button.style.position = "fixed";
        button.style.left = "-10000px";
        button.style.top = "-10000px";
        button.style.width = "1px";
        button.style.height = "1px";
        button.style.opacity = "0";
        button.style.pointerEvents = "auto";
        button.style.zIndex = "-1";

        document.body.appendChild(button);
    }

    function rememberProfileAvatar() {
        const button = document.querySelector("#avatar-btn");
        const image = button?.querySelector("img");
        const src = image?.currentSrc || image?.src || "";
        if (src) window.__HT_PROFILE_AVATAR_URL = src;
    }

    function removeYouTubeHeader() {
        preserveProfileButton();
        rememberProfileAvatar();

        REMOVE_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.remove();
            });
        });
    }

    function start() {
        if (!document.body) {
            setTimeout(start, 100);
            return;
        }

        removeYouTubeHeader();

        const observer = new MutationObserver(() => {
            removeYouTubeHeader();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    start();
})();
