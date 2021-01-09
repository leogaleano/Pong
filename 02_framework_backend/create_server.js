//const { Server } = require("http"); no es necesaria por lo que se pueden usar las librerías
const events = require("events");
const net = require("net");
const Stream = require("stream");

// crear la funcion  que recibe el headersbody (string)
// identificar headers y guardarlos en clave valor, hacerlo generico no sabemos cuantos heders vendran
// headersBody
const getHeadersObj = (allHeaders) => {
  // creamos la variable map que vamos a returnar
  let headers = new Object();

  // comprobamos que es lo que recibimos
  //console.log("esta es la headersBody que estamos recibiendo : \n\n" + headersBody +"\n");

  //separo la cadena en varias por el salto de linea, no sabemos el numero exacto en el ejemplo de get salen 3
  let data_allHeaders = allHeaders.split("\r\n")

  for (var i = 1; i < data_allHeaders.length; i++) {
    // por cada una seleccionaremos el contenido previo a ":" que sera el key
    // y el contenido posterior a ": " que sera el value
    line = data_allHeaders[i];
    let lineContent = line.split(": ")
    // // anterior ":" --> key
    // key = lineContent[0].toUpperCase();
    //console.log("key ==> " + key);

    // // posterior ":" -->  value
    // value = lineContent[1];
    //console.log("Value ==> " + value);
    headers[lineContent[0].toUpperCase()] = lineContent[1];
  }

  // devolvemos el objeto con el contenido de headersBody almacenado en k-v
  return headers;
}

// se implementa la funcion createServer
const createServer = (requestHandler) => {
  // se crea el servidor mediante net y se le pasa un socket
  const server = net.createServer(socket => {
    // se verifica que la conexcion se ha producido exitosamente
    console.log('Conexión exitosa con el servidor!')
    // se crea una varianle que almacenara el buffer en string
    let bufferString = "";
    // se implementa el metodo on para el socket al cual se le pasará el evento y la funcion que se ejecutara cuando el evento ocurra
    socket.on('data', function (data) {
      // se pasa la data de la peticion a string
      bufferString = Buffer.from(data).toString("utf-8");
      // busca que el bufer tenga la expresion regular
      let comparacion = /[a-zA-Z]+ \/[ a-zA-Z\/]* HTTP\/1\.1/i.test(bufferString);
      console.log("comparacion:", comparacion)

      //se separan los header de la info del array
        const [infoArray, ...headersBody] = bufferString.split("\r\n");
        // separa resources de request y se almacenan en variables distintas
        const resources = infoArray.split(" ");
        const request = {
          method: resources[0],
          path: resources[1],
          protocol: resources[2],
          headers: {},
          body: ''
        };
        // se obtiene el header de la request
        request.getHeader = (header) => {
          // si no hay header o esta undefined devuelve null, sin o retorna el header
          if (request.headers[header.toUpperCase()] === undefined)
            return null
          else
            return request.headers[header.toUpperCase()]
        }
        // retorna el primer indice del bufferString
        limitHeaders = bufferString.indexOf('\n\r');

        // llamar a la funcion identifica y guarda headers en key-v
        const headersObj = getHeadersObj(bufferString.substring(0, limitHeaders - 1));
        request.headers = headersObj;

        const allBody = bufferString.substring(limitHeaders + 3, bufferString.length);
        request.body = allBody;

        let contLen = request.getHeader("CONTENT-LENGTH");
        if(contLen != null && request.body.length < contLen){
          return;
        }
        
        //console.log("-----> headerObj: ", headersObj)
      
        // se implementa la funcion requestHandler del createServer
      requestHandler(request, {
        // se define el metodo send del response
        send: (response_code, response_header, response_body) => {
          // agrega la fecha del header responde
          response_header['Date'] = (new Date()).toUTCString();
          // agreag la longitud del header response
          response_header['content-length'] = response_body.length;
          //escribe la respuesta en el socket
          socket.write(`HTTP/1.1 ${response_code} Message\r\n`);
          // devuelve los objetos key value response del header y los escribe en el socket
          Object.entries(response_header).forEach(([key, value]) => {
            socket.write(`${key}: ${value}\r\n`);
          });
          // devuelve el response y los escribe en el socket
          socket.write("\r\n");
          socket.write(response_body ? response_body + "\r\n\r\n\r\n" : "\r\n");+
          // se finaliza la conexion con el socket
          socket.end();
        }
      });

    });
  });


  return {
    //la funcion createServer debe devolver tanto el listen en un puerto concreto como el close para cerrar la conexion
    listen: (portNumber) => {
      //se imprime por consola el puerto en el que estará abierta la conexion del servidor
      //para que el usuario pueda acceder a la ruta
      console.log("Servidor abierto en http://localhost:" + portNumber);
      //se establece el metodo para que el servidor escuche (listen) en el puerto indicado
      server.listen(portNumber);
    },
    close: () => {
      server.close();
    }
  };
};
// se exporta la funcion createserver
module.exports = createServer;