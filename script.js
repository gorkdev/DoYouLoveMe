const wrapper = document.querySelector("#wrapper");
const question = document.querySelector("#question");
const gif = document.querySelector("#gif");
const yesBtn = document.querySelector("#yes-btn");
const noBtn = document.querySelector("#no-btn");

// Romantik mesajlar dizisi
const loveMessages = [
  "Sen benim her şeyimsin! ❤️",
  "Seni çok seviyorum! 💖",
  "Sen benim hayatımın anlamısın! 💝",
  "Seninle geçen her an çok değerli! 💕",
  "İyi ki varsın aşkım! 💗",
];

// No butonunu hareket ettirme fonksiyonu
const moveButton = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const btnRect = noBtn.getBoundingClientRect();

  const randomX = Math.max(
    0,
    Math.floor(Math.random() * (windowWidth - btnRect.width))
  );
  const randomY = Math.max(
    0,
    Math.floor(Math.random() * (windowHeight - btnRect.height))
  );

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
};

// Evet butonuna tıklandığında
yesBtn.addEventListener("click", () => {
  // Rastgele bir aşk mesajı seç
  const randomMessage =
    loveMessages[Math.floor(Math.random() * loveMessages.length)];
  question.innerHTML = randomMessage;

  // Konfeti efekti
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Konfeti yağdır
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);

  // GIF'i değiştir
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
});

// Hayır butonuna hover olduğunda
noBtn.addEventListener("mouseover", moveButton);

// Sayfa yüklendiğinde script'i başlat
document.addEventListener("DOMContentLoaded", () => {
  // Konfeti kütüphanesini yükle
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
  document.head.appendChild(script);
});
