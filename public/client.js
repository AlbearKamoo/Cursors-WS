const socket = io();
const CIRCLE_RADIUS = 4;

socket.on('new-client', function(message) {
  console.log(message);
  redrawCursors()
});

socket.on('draw-circle', function() {
  redrawCursors();
});

const canvas = document.getElementById('main-canvas');
initializeCanvas();

function initializeCanvas() {
  const ctx = canvas.getContext('2d');
  const dpi = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = 1;

  canvas.width = scale * width * dpi;
  canvas.height = scale * height * dpi;

  canvas.style.width = `${scale * width}px`;
  canvas.style.height = `${scale * height}px`;

  ctx.imageSmoothingEnabled = false;

  ctx.scale(scale * dpi, scale * dpi);
}

function redrawCursors() {
  drawCircle({ color: "blue"});
}

function drawCircle(cursorOptions) {
  const ctx = canvas.getContext('2d');
  var randomX = Math.floor(Math.random() * 500);
  var randomY = Math.floor(Math.random() * 500);
  console.log('Random X', randomX);
  console.log('Random Y', randomY);
  var color = cursorOptions.color;

  ctx.beginPath();
  ctx.arc(randomX, randomY, CIRCLE_RADIUS, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
}
