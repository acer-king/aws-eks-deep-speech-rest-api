const io = require('socket.io');
const WebSocket = require('ws');
const {
  createStream,
  processAudioStream,
  resetAudioStream,
} = require('./audio.js');

function initSocket(server) {

  const socket = io(server, {});

  socket.on('connection', function (socket) {
    console.log('\n *** client connected *** \n');

    createStream();
    socket.on('stream-data', function (data) {
      processAudioStream(data, (results) => {
        console.log(results, "data")
        socket.emit('recognize', results);
      });
    });

    socket.on('stream-reset', function () {
      resetAudioStream();
    });

    socket.once('disconnect', () => {
      console.log('\n *** client disconnected *** \n');
    });
  });
}

module.exports = {
  initSocket,
};
