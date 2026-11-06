console.log("Nagpur Real Estate app loaded");

function initApp() {
    console.log("Initializing Nagpur Real Estate frontend...");
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            alert('Property exploration feature coming soon!');
        });
    }
}

window.addEventListener('load', initApp);