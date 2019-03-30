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


//Esta funcion dibuja un circulo en la posicion x, y
function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2, false);
  context.fillStyle = "#81ecec";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

//Se llama a la funcion de dibujar un circulo
 drawBall();

 //se llama a la funcion de dibujar la paleta
 drawPaddle();

 //Verificar si llego al limite de arriba/abajo
 if (y + dy < 0 || y + dy > canvas.height) {
   dy = -dy;
 }

 //Verificar si llego al limite izquierda/derecho
  if (x + dx < 0 || x + dx > canvas.width){
    dx = -dx;
  }



  x += dx;
  y += dy;

}

setInterval(draw, 10);
