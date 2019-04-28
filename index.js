const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  console.log('Connection to client established');
  io.emit('new-client');

  socket.emit('start-connection', generateId());
  socket.on('update-cursor', function(cursorOptions) {
    socket.broadcast.emit('update-cursor', cursorOptions);
  })
});

http.listen(4000, function() {
  console.log('listening on port 4000');
});

function generateId() {
  return Math.floor(Math.random() * 100000);
}
