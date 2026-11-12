
const openingScreen = document.querySelector(".opening-screen");
const openButton = document.getElementById("openButton");

let isOpened = false;
let startY = 0;

// Function to open curtains
function openInvitation() {

    if (isOpened) return;

    isOpened = true;

    openingScreen.classList.add("open");

    // Remove opening screen after animation
    setTimeout(() => {
        openingScreen.style.display = "none";
    }, 1800);
}

// Button click
openButton.addEventListener("click", openInvitation);

// Detect swipe
openingScreen.addEventListener("touchstart", function(event) {

    startY = event.touches[0].clientY;

});

openingScreen.addEventListener("touchend", function(event) {

    let endY = event.changedTouches[0].clientY;

    // Check upward swipe
    if (startY - endY > 60) {
        openInvitation();
    }

});
