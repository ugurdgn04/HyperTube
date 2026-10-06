// Main Orchestrator

console.log("HyperTube Modular Architecture Loaded!");

function renderHyperTube() {
  initFilterModule();
  initDockModule();
}

// YouTube dinamik sayfa yapısını gözlemleme
const observer = new MutationObserver(() => {
  renderHyperTube();
});

observer.observe(document.body, { childList: true, subtree: true });