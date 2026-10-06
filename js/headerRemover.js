// ============================================================
// HyperTube - YouTube Üst Header + Frosted Glass Remover
// ============================================================

(function () {

    const REMOVE_SELECTORS = [
        "#masthead-container",
        "ytd-masthead",
        "#masthead",
        "#container.ytd-masthead",
        "#frosted-glass"
    ];

    function removeYouTubeHeader() {
        REMOVE_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.remove();
            });
        });
    }

    // İlk çalıştırma
    removeYouTubeHeader();

    // YouTube SPA tekrar oluşturursa tekrar kaldır
    const observer = new MutationObserver(() => {
        removeYouTubeHeader();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();