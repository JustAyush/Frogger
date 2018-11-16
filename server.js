
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


var players = [];

class Player {
  constructor(id){
    this.id =  id;
    this.x =  getRandom(100, 400);
    this.y =  getRandom(100, 400);
    this.r =  20;
    this.pressingUp =  false;
    this.pressingDown = false;
    this.pressingLeft = false;
    this.pressingRight =  false;
  }

  updatePos(){
    if(this.pressingUp)
      this.y -= 10;
    else if(this.pressingDown)
      this.y += 10;
    else if(this.pressingLeft)
      this.x -= 10;
    else if(this.pressingRight)
      this.x += 10;
  }
}

io.sockets.on('connection',

  function (socket){
      console.log('New connection ' + socket.id);

    var p = new Player(socket.id);
    players.push(p);

    socket.on('keyPress', function(data){
      for(let i=(players.length-1); i>=0; i--){
        if(players[i].id == socket.id){
          if(data.inputId === 'left')
              players[i].pressingLeft = data.state;
          else if(data.inputId === 'right')
              players[i].pressingRight = data.state;
          else if(data.inputId === 'up')
              players[i].pressingUp = data.state;
          else if(data.inputId === 'down')
              players[i].pressingDown = data.state;

          players[i].updatePos();

        }
      }
    });

    socket.on('disconnect', function(){
      for(let i=(players.length-1); i>=0; i--){
        if(players[i].id == socket.id)
          players.splice(i, 1);
      }
    });


  }
);

setInterval(heartbeat, 1000/25);
function heartbeat(){
  io.sockets.emit('newPositions', players);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

console.log('Node server running');
