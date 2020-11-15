//const { Server } = require("http"); no es necesaria por lo que se pueden usar las librerías
const events = require("events");
const net = require("net");
const Stream = require("stream");

// se implementa la funcion createServer
const createServer = (requestHandler) => {
  // se crea el servidor mediante net y se le pasa un socket
  const server = net.createServer(socket => {
    // se verifica que la conexcion se ha producido exitosamente
    console.log('Conexión exitosa con el servidor!')
    //se crea una flag que indica si la peticion está segmentada
    let segmentada = false;
    let bufferString = "";
    // se implementa el metodo on para el socket al cual se le pasará el evento y la funcion que se ejecutara cuando el evento ocurra
    socket.on('data', function (data) {
      // se pasa la data de la peticion a string
      bufferString = Buffer.from(data).toString("utf-8");

      console.log("Buffer: ", bufferString)

      const [infoArray, ...headersBody] = bufferString.split("\r\n");
      const resources = infoArray.split(" ");
      const request = {
        method: resources[0],
        path: resources[1],
        protocol: resources[2],
        headers: {},
        body: ''
      };

      console.log("resources: ", resources)

      requestHandler(request, {
        send: (response_code, response_header, response_body) => {
          socket.write(`HTTP/1.1 ${response_code}\r\n`);
          Object.entries(response_header).forEach(([key, value]) => {
            socket.write(`${key}: ${value}\r\n`);
          });
          socket.write("\r\n");
          socket.write(response_body);
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

module.exports = createServer;