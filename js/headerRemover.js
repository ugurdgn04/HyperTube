// ============================================================
// HyperTube - YouTube Üst Barını Tamamen Kaldır
// ============================================================

(function () {

    const HEADER_SELECTORS = [
        "#masthead-container",
        "ytd-masthead",
        "#masthead",
        "#container.ytd-masthead"
    ];

    function removeYouTubeHeader() {
        HEADER_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.remove();
            });
        });
    }

    // İlk kontrol
    removeYouTubeHeader();

    // YouTube SPA olduğu için sayfa değişimlerinde
    // header yeniden oluşturulursa tekrar kaldır.
    const observer = new MutationObserver(() => {
        removeYouTubeHeader();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();