(function () {
    const originalCreate = window.createHyperTubeProfileMenu;
    const originalOpen = window.openHyperTubeProfileMenu;

    window.openHyperTubeProfileMenu = function () {
        if (!document.querySelector('.ht-profile-menu') && typeof originalCreate === 'function') {
            originalCreate();
        }

        const menu = document.querySelector('.ht-profile-menu');
        if (!menu) return;

        const src = window.__HT_PROFILE_AVATAR_URL ||
            document.querySelector('#avatar-btn img')?.currentSrc ||
            document.querySelector('#avatar-btn img')?.src || '';

        const image = menu.querySelector('.ht-profile-avatar-img');
        if (image && src) image.src = src;

        if (typeof originalOpen === 'function') {
            originalOpen();
        } else {
            menu.classList.add('open');
            document.body.classList.add('ht-profile-open');
        }

        if (image && src) image.src = src;
    };
})();
