//Variables y Funciones globales
//se definen los limites verticales del tablero
var limXmin = 383; //383 para la mac y 650 para compu de beca
var limYmin = 11;
//se definen los limites horizontales del tablero
var limXmax = 600+limXmin;
var limYmax = 400+limYmin;
//se establece la velocidad
var velocidad = 7;
//se inicializan los puntos de los jugadores
var Player1Points = 0;
var Player2Points = 0;
var p1 = document.getElementById("Player1Points");
var p2 = document.getElementById("Player2Points");
//se crea la funcion para obtener la posicion en el eje X
function obtenerPosX(id){
	var objeto = document.getElementById(id);
	var pos = objeto.style.left;
	var l = pos.length;
	pos = pos.substring(0,l-2);
	pos = parseInt(pos);
	return pos;
}
//se crea la funcion para obtener la posicion en el eje Y
function obtenerPosY(id){
	var objeto = document.getElementById(id);
	var pos = objeto.style.top;
	var l = pos.length;
	pos = pos.substring(0,l-2);
	pos = parseInt(pos);
	return pos;
}
//se crea la funcion para colocar algun elemento en concreto dentro del tablero
function ColocarElemento(id,x,y){
	var objeto = document.getElementById(id);
	objeto.style.left = x+"px";
	objeto.style.top = y+"px";
}

//funciones de la pelota
//se establece las variables de movimiento de la pelota
var movx = 1;
var movy = 1;
//coloca la pelota en el centro del tablero de juego para empezar la partida
ColocarElemento("pelota", 290+limXmin, 190+limYmin);
function Pelota(){
	//se obtiene la posicion de la pelota
	var posx = obtenerPosX("pelota");
	var posy = obtenerPosY("pelota");
	//se actualiza la posicion de la pelota
	posx+=movx;
	posy+=movy;
	//se suma un punto al jugador 2 si la pelota pasa del limite minimo de X
	if(posx <= limXmin){
		movx = 1;
		//puntos jugador 2
		Player2Points++;
		p2.innerHTML = Player2Points;
	}
	//se suma un punto al jugador 2 si la pelota pasa del limite maximo de X
	if(posx >= (limXmax-20)){
		movx = -1;
		//puntos jugador 1
		Player1Points++;
		p1.innerHTML = Player1Points;
	}
	if(posy <= limYmin){
		movy = 1;
	}
	if(posy >= (limYmax-20)){
		movy = -1;
	}
	//coloca la pelota con las nuevas posiciones de x e y
	ColocarElemento("pelota", posx,posy);
}
//Funcion principal del juego
function main(){
	Pelota();
}