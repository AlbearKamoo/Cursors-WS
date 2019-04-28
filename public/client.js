const socket = io();
const CIRCLE_RADIUS = 4;

const cursorColors = ["red", "blue", "purple", "yellow"];
const cursors = {};
let clientId = null;

socket.on('new-client', function(message) {
  console.log(message);
});

socket.on('start-connection', function(newId) {
  clientId = newId;
  document.addEventListener('mousemove', updateCursor);
})

socket.on('update-cursor', function(cursorOptions) {
  console.log(cursorOptions);
  if (!cursors.hasOwnProperty(cursorOptions.id)) {
    let newColorIndex = (Object.keys(cursors).length) % cursorColors.length;
    cursors[cursorOptions.id] = cursorOptions;
    cursors[cursorOptions.id].color = cursorColors[newColorIndex];
  };
  Object.assign(cursors[cursorOptions.id], cursorOptions);
  redrawCursors();
})

const canvas = document.getElementById('main-canvas');

function updateCursor(event) {
  socket.emit('update-cursor', {id: clientId, x: event.clientX, y: event.clientY });
}

function redrawCursors() {
  Object.keys(cursors).forEach(function(cursorId) {
    let cursorOptions = cursors[cursorId];
    drawCircle(cursorOptions);
  });
}

function drawCircle(cursorOptions) {
  const ctx = canvas.getContext('2d');

  var color = cursorOptions.color;
  var x = cursorOptions.x;
  var y = cursorOptions.y;

  ctx.beginPath();
  ctx.arc(x, y, CIRCLE_RADIUS, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();

  console.log('DRAW CIRCLE', x, y);
}
