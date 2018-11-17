
var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 8000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

// var express = require('express');
// var app = express();
// var server = app.listen(8000);
// app.use(express.static('public'));
// var io = require('socket.io')(server);

io.sockets.on('connection',
  function (socket){
      console.log('New connection ' + socket.id);
  }
);

console.log('Node server running');
