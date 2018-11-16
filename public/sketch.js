
function setup(){

  socket = io.connect();
  createCanvas(windowWidth, windowHeight);

  socket.on('newPositions', function(data){
    background(0);
    for(let i=0; i<data.length; i++){
      rect(data[i].x, data[i].y, data[i].r, data[i].r);

    }
  });
}

function draw(){


}

function keyPressed(){
  if(keyCode === UP_ARROW)
    socket.emit('keyPress', {inputId:'up', state: true});
  else if(keyCode === DOWN_ARROW)
    socket.emit('keyPress', {inputId:'down', state: true});
  else if(keyCode === LEFT_ARROW)
    socket.emit('keyPress', {inputId:'left', state: true});
  else if(keyCode === RIGHT_ARROW)
    socket.emit('keyPress', {inputId:'right', state: true});
  return false;
}

function keyReleased(){
  if(keyCode === UP_ARROW)
    socket.emit('keyPress', {inputId:'up', state: false});
  else if(keyCode === DOWN_ARROW)
    socket.emit('keyPress', {inputId:'down', state: false});
  else if(keyCode === LEFT_ARROW)
    socket.emit('keyPress', {inputId:'left', state: false});
  else if(keyCode === RIGHT_ARROW)
    socket.emit('keyPress', {inputId:'right', state: false});
  return false;
}
