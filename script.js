const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png'];
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
const timerElement = document.getElementById('timer');

let cards = [];
let flippedCards = [];
let matches = 0;
let timer = 0;
let interval;

// Inicializa el juego
function initGame() {
  gameBoard.innerHTML = '';
  flippedCards = [];
  matches = 0;
  timer = 0;
  timerElement.textContent = 'Tiempo: 0 segundos';
  clearInterval(interval);

  // Duplica y mezcla las imágenes
  cards = [...images, ...images].sort(() => Math.random() - 0.5);

  // Crea las cartas con el dorso hacia arriba
  cards.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const img = document.createElement('img');
    img.src = image;
    cardFront.appendChild(img);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);

    // Agrega el evento click
    card.addEventListener('click', () => flipCard(card));
  });

  // Inicia el temporizador
  interval = setInterval(() => {
    timer++;
    timerElement.textContent = `Tiempo: ${timer} segundos`;
  }, 1000);
}

// Voltea la carta
function flipCard(card) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Verifica si las cartas coinciden
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    matches++;
    flippedCards = [];
    if (matches === images.length) {
      clearInterval(interval);
      setTimeout(() => alert(`¡Felicidades! Completaste el juego en ${timer} segundos.`), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Reinicia el juego
restartButton.addEventListener('click', initGame);

// Inicia el juego al cargar la página
initGame();
