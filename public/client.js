var socket = io();

socket.on('new-client', function(message) {
  console.log(message);
})
