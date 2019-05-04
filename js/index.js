var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

//paleta
var paddleHeight = 10;
var paddleWidth =75;
var paddleX = (canvas.width - paddleWidth) /2;

// variables
var rightPressed = false;
var leftPressed = false;

//variables son 7
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetLeft = 30;
var brickOffsetTop = 30;

var score = 0;


var bloques = [];

for (var fila = 0; fila < brickRowCount; fila++) {
  bloques[fila] = [];
  for (var columna = 0; columna < brickColumnCount;columna++){
    bloques[fila][columna] = { x: 0, y: 0, status: 1 };
  }
}

//Agregar soltado de teclas eventos de presionado
document.addEventListener("keydown",keydownHandler,false);
document.addEventListener("keyup" ,keyupHandler,false);

//Esta funcion determina si se presiona una teclas
function keydownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
}

//esta funcion determina si se suelta una tecla
function keyupHandler (event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

//esta funcion dibuja una paleta
function drawPaddle () {
  context.beginPath();
  context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle ="#00cec9";
  context.fill();
  context.closePath();
}

//funcion de dibujar bloques
function drawBricks() {
  for (var row= 0; row <brickRowCount; row++) {
    for(var column= 0; column <brickColumnCount; column++){
        var bloque =bloques[row][column];

     if(bloque.status == 1){
       var brickX =(column*(brickWidth + brickPadding))+ brickOffsetLeft;
       var brickY =(row*(brickHeight+brickPadding)) + brickOffsetTop;

          bloque.x= brickX;
          bloque.y = brickY;

          //dibujar bloque
          drawBrick(brickX,brickY);
     }
    }
  }
}

function drawBrick(brickX,brickY){
  context.beginPath();
  context.rect(brickX,brickY,brickWidth,brickHeight);
  context.fillStyle ="#3498db";
  context.fill();
  context.closePath();
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2, false);
  //Esta funcion dibuja un circulo en la posicion x, y
  context.fillStyle = "#81ecec";
  context.fill();
}

//esta funcion detecta la colision
function detectarColision() {
    for (var row = 0; row< brickRowCount; row++) {
      for(var column= 0; column <brickColumnCount; column++) {
        var bloque = bloques[row][column];
      if (bloque.status ==1){

        if(x > bloque.x && x < bloque.x + brickWidth && y > bloque.y && y < bloque.y + brickHeight) {
          dy = -dy;
          bloque.status = 0;
        score ++;
        if(score == brickRowCount * brickColumnCount){
          alert("Ganastes,felicidades!!!");
          document.location.reload();
        }
        }
      }
    }
  }
}
//esta funcion dibuja el puntaje
function drawScore(){
  context.font = "16px Arial";
  context.fillStyle = "#0095DD"
  context.fillText("puntaje:" + score,8,20);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  //sele llama a la funcion de dibujar los bloques
  drawBricks();

//Se llama a la funcion de dibujar un circulo
 drawBall();

 //se llama a la funcion de dibujar la paleta
 drawPaddle();

//se llama la funcion de dibujar un puntaje
drawScore();
 //se le llama a la funcion detectar Colision
 detectarColision();

 //Verificar si llego al limite izquierda/derecho
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    dx = -dx;
  }

 if (y+ dy < ballRadius){
   dy = -dy;
 } else if (y +dy > canvas.height - ballRadius){
   if(x > paddleX && paddleX + paddleWidth){
     dy = -dy;
   }
   else {
      alert("LO SIENTO PERDITES VUELVE A INTENTARLO POR FAVOR!!!")
   document.location.realod();
}
 }



//verificar si se toco la tecla direccional derecha
if (rightPressed && paddleX < canvas.width - paddleWidth){
  paddleX += 7;
}else if (leftPressed && paddleX > 0){
  paddleX -= 7;
}


  x += dx;
  y += dy;

}

setInterval(draw, 10);
