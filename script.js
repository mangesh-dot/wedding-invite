const openingScreen = document.querySelector(".opening-screen");
const openButton = document.getElementById("openButton");
const petalLayer = document.querySelector(".petal-layer");
const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = musicButton.querySelector(".music-label");

let isOpened = false;
let startY = 0;

async function openInvitation() {
    if (isOpened) return;

    isOpened = true;

    // Lock scrolling
    document.body.classList.add("locked");

    // Disable open button
    openButton.disabled = true;

    // Start background music
    // try {
    //     await music.play();

    //     musicLabel.textContent = "Music On";
    //     musicButton.setAttribute("aria-label", "Pause background music");

    // } catch (error) {
    //     console.log("Music could not start. Visitor can press the music button.");
    // }

    // Start curtain and text animations
    openingScreen.classList.add("open");

    // Create falling petals
    createPetals(16);

    // Unlock scrolling after curtains finish
    setTimeout(() => {
        openingScreen.remove();
        document.body.classList.remove("locked");
    }, 2500);
}

openButton.addEventListener("click", openInvitation);

openingScreen.addEventListener("touchstart", (event) => {
  startY = event.changedTouches[0].clientY;
}, { passive: true });

openingScreen.addEventListener("touchend", (event) => {
  const endY = event.changedTouches[0].clientY;
  if (startY - endY > 55) openInvitation();
}, { passive: true });

openingScreen.addEventListener("wheel", (event) => {
  if (event.deltaY > 15) openInvitation();
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (!isOpened && (event.key === "Enter" || event.key === "ArrowUp" || event.key === " ")) {
    event.preventDefault();
    openInvitation();
  }
});

// Countdown: counts down to the start of the wedding date in the visitor's local timezone.
const weddingDate = new Date(2026, 11, 12, 0, 0, 0);
const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();
  if (remaining <= 0) {
    Object.values(countdownFields).forEach((field) => field.textContent = "00");
    document.getElementById("countdown").setAttribute("aria-label", "The wedding day has arrived");
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  countdownFields.days.textContent = String(days).padStart(2, "0");
  countdownFields.hours.textContent = String(hours).padStart(2, "0");
  countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
  countdownFields.seconds.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

// Decorative petals appear after the invitation opens.
function createPetals(amount = 8) {
  for (let i = 0; i < amount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
    petal.style.animationDuration = `${7 + Math.random() * 6}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;
    petalLayer.appendChild(petal);
    window.setTimeout(() => petal.remove(), 15000);
  }
}
window.setInterval(() => {
  if (isOpened && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) createPetals(3);
}, 4500);

// Music is optional. Add your own licensed MP3 at audio/wedding-music.mp3.
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Music on";
      musicButton.setAttribute("aria-label", "Pause background music");
    } catch (error) {
      musicLabel.textContent = "Add music file";
      console.info("Add audio/wedding-music.mp3 to enable background music.");
    }
  } else {
    music.pause();
    musicLabel.textContent = "Music off";
    musicButton.setAttribute("aria-label", "Play background music");
  }
});

// WhatsApp RSVP with a specific phone number
const phoneNumber = "919760676398"; // Replace with your number (country code + number)
const invitationMessage = "Yes, I accept the wedding invitation!";

document.getElementById("rsvpButton").href =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(invitationMessage)}`;
