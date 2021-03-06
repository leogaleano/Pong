var loop = undefined;
//Variables y Funciones globales
//se definen los limites verticales del tablero
var limXmin = 383; //383 para la mac y 650 para compu de beca
var limYmin = 11;
//se definen los limites horizontales del tablero
var limXmax = 600 + limXmin;
var limYmax = 400 + limYmin;
//se establece la velocidad
var velocidad = 7;
//se inicializan los puntos de los jugadores
var Player1Points = 0;
var Player2Points = 0;
var p1 = document.getElementById("Player1Points");
var p2 = document.getElementById("Player2Points");
//se crea la funcion para obtener la posicion en el eje X
function obtenerPosX(id) {
	var objeto = document.getElementById(id);
	var pos = objeto.style.left;
	var l = pos.length;
	pos = pos.substring(0, l - 2);
	pos = parseInt(pos);
	return pos;
}
//se crea la funcion para obtener la posicion en el eje Y
function obtenerPosY(id) {
	var objeto = document.getElementById(id);
	var pos = objeto.style.top;
	var l = pos.length;
	pos = pos.substring(0, l - 2);
	pos = parseInt(pos);
	return pos;
}
//se crea la funcion para colocar algun elemento en concreto dentro del tablero
function ColocarElemento(id, x, y) {
	var objeto = document.getElementById(id);
	objeto.style.left = x + "px";
	objeto.style.top = y + "px";
}

//funciones de la pelota
//se establece las variables de movimiento de la pelota
var movx = 1;
var movy = 1;
//coloca la pelota en el centro del tablero de juego para empezar la partida
ColocarElemento("pelota", 290 + limXmin, 190 + limYmin);

function Pelota() {
	//se obtiene la posicion de la pelota
	var posx = obtenerPosX("pelota");
	var posy = obtenerPosY("pelota");
	//se actualiza la posicion de la pelota
	posx += movx;
	posy += movy;
	//se suma un punto al jugador 2 si la pelota pasa del limite minimo de X
	if (posx <= limXmin) {
		//se cambia el sentido de la pelota
		movx = 1;
		//puntos jugador 2
		Player2Points++;
		//si el jugador 2 llega a 3 punto se detiene el juego indefiniendo el loop
		if (Player2Points >= 3) {
			clearInterval(loop);
			loop = undefined;
			//y se pone visible el div de iniciar
			document.getElementById("iniciar").style.visibility = "visible";
			AlmacenarPuntos();
		}
		//se imprimen los puntos del jugador 2
		p2.innerHTML = Player2Points;
	}
	//se suma un punto al jugador 2 si la pelota pasa del limite maximo de X
	if (posx >= (limXmax - 20)) {
		// se cambia el sentido de la pelota
		movx = -1;
		//puntos jugador 1
		Player1Points++;
		//si el jugador 1 llega a 3 puntos se detiene el juego indefiniendo el loop
		if (Player1Points >= 3) {
			clearInterval(loop);
			loop = undefined;
			//y se pone visible el div de iniciar
			document.getElementById("iniciar").style.visibility = "visible";
			AlmacenarPuntos();
		}
		//se imprimen los puntos del jugador 1
		p1.innerHTML = Player1Points;
	}
	if (posy <= limYmin) {
		movy = 1;
	}
	if (posy >= (limYmax - 20)) {
		movy = -1;
	}
	//coloca la pelota con las nuevas posiciones de x e y
	ColocarElemento("pelota", posx, posy);
}

//Raqueta
//se inicializan las direcciones de las raquetas en el eje Y
var DirP1Y = 0;
var DirP2Y = 0;
//se establecen las posiciones de las raquetas en el eje X
var PosP1X = 20 + limXmin;
var PosP2X = 560 + limXmin;
//se colocan las dos raquetas en el juego en la mitad de la pantalla para empezar la partida
ColocarElemento("player1", PosP1X, 160);
ColocarElemento("player2", PosP2X, 160);
//se define la funcion de movimiento para las raquetas
function mover(event) {
	//dependiendo de la tecla oprimida, cambiará la direccion de las raquetas, esto se identifica con el código de las teclas
	var c = event.keyCode;
	console.log(c);
	switch (c) {
		//jugador 1
		//arriba
		//tecla w
		case 87:
			DirP1Y = -1;
			break;
			//abajo	
			//tecla s
		case 83:
			DirP1Y = 1;
			break;
			//jugador 2
			//arriba
			//tecla o
		case 79:
			DirP2Y = -1;
			break;
			//abajo
			//tecla l
		case 76:
			DirP2Y = 1;
			break;
			//espacio
		case 32:
			//si el loop esta indefinido
			if (loop === undefined) {
				//cuando alguno de los jugadores haya llegado a 3 puntos
				if (Player1Points >= 3 || Player2Points >= 3) {
					//se vuelve a poner la pelota en el centro
					ColocarElemento("pelota", 290 + limXmin, 190 + limYmin);
					ColocarElemento("player1", PosP1X, 160);
					ColocarElemento("player2", PosP2X, 160);
					//se reinician los puntos de los jugadores
					Player1Points = 0;
					Player2Points = 0;
					//se imprimen los nuevos valores de los puntos
					p1.innerHTML = Player1Points;
					p2.innerHTML = Player2Points;
				}
				//se inicia el juego cuando se presiona espacio
				loop = setInterval("main();", velocidad);

document.getElementById("iniciar").style.visibility = "hidden";
			}
			break;
	}
}
//Se define la funcion para que las raquetas sean capaces de detrenerse
function parar(event) {
	var c = event.keyCode;
	if (c == 87 || c == 83) {
		DirP1Y = 0;
	}
	if (c == 79 || c == 76) {
		DirP2Y = 0;
	}
}
//se define la funcion que colocará y actualizara las raquetas durante la ejecución del programa
function Raqueta() {
	// se obtiene la posicion de la raqueta
	var pos1 = obtenerPosY("player1");
	//se actualiza la posicion segun la direccion que tenga
	pos1 += DirP1Y;
	//se definen los limites del tablero
	if (pos1 <= limYmin) {
		ColocarElemento("player1", PosP1X, limYmin);
	}
	if (pos1 >= (limYmax - 80)) {
		ColocarElemento("player1", PosP1X, (limYmax - 80));
	}
	if (pos1 >= limYmin && pos1 <= (limYmax - 80)) {
		ColocarElemento("player1", PosP1X, pos1);
	}
	// se obtiene la posicion de la raqueta
	var pos2 = obtenerPosY("player2");
	//se actualiza la posicion segun la direccion que tenga
	pos2 += DirP2Y;
	//se definen los limites del tablero
	if (pos2 <= limYmin) {
		ColocarElemento("player2", PosP2X, limYmin);
	}
	if (pos2 >= (limYmax - 80)) {
		ColocarElemento("player2", PosP2X, (limYmax - 80));
	}
	if (pos2 >= limYmin && pos2 <= (limYmax - 80)) {
		ColocarElemento("player2", PosP2X, pos2);
	}

}
//Choques
function choque() {
	//se crea el escenario del jugador 1 para cuando choque con la raqueta cambie de direccion
	if (obtenerPosX("pelota") == (obtenerPosX("player1") + 20)) {
		if (obtenerPosY("pelota") >= obtenerPosY("player1") && obtenerPosY("pelota") <= (obtenerPosY("player1") + 80)) {
			movx = 1;
		}
	}
	//se crea el escenario del jugador 2 para cuando choque con la raqueta cambie de direccion
	if (obtenerPosX("pelota") == (obtenerPosX("player2") - 20)) {
		if (obtenerPosY("pelota") >= obtenerPosY("player2") && obtenerPosY("pelota") <= (obtenerPosY("player2") + 80)) {
			movx = -1;
		}
	}
}
//Funcion principal del juego
function main() {
	Pelota();
	Raqueta();
	choque();


}

let historial = [];
function AlmacenarPuntos() {
	let header = "---Partida---\n"
	let puntajeP1 = "Puntos jugador 1: " + Player1Points + "<br/>";
	let puntajeP2 = "Puntos jugador 2: " + Player2Points + "<br/>";
	historial.push(puntajeP1 + puntajeP2);
	localStorage.setItem("Historial",historial);
	Actualizarhistorial();
}

function Actualizarhistorial() {
	document.getElementById("historico").innerHTML = localStorage.getItem("Historial").toString();
}

//cuando se presiona una tecla se mueven las raquetas
document.onkeydown = mover;
//cuando se deja de presionar una tacle de detienen las raquetas
document.onkeyup = parar;
document.getElementById("iniciar").style.visibility = "visible";
Actualizarhistorial();