//const { Server } = require("http"); no es necesaria por lo que se pueden usar las librerías
const events = require("events");
const net = require("net");
const Stream = require("stream");
const buffer = require("buffer");

// se implementa la funcion createServer
const createServer = (requestHandler) => {
    // se crea el servidor mediante net y se le pasa un socket
    const server = net.createServer(socket => {
        // se verifica que la conexcion se ha producido exitosamente
        console.log('Conexión exitosa con el servidor!')
        //se crea una flag que indica si la peticion está segmentada
        let segmentada = false;
        // se crea una variable que almacenara la request de forma que sea global para el metodo
        let request;
        // se implementa el metodo on para el socket al cual se le pasará el evento y la funcion que se ejecutara cuando el evento ocurra
        socket.on('data', function(data){
            // se pasa la data de la peticion a string
            let String_data = data.toString();
            // se compara la peticion en tipo string con la expresion regular
            let comparacion = /[a-zA-Z]+ \/[ a-zA-Z\/]* HTTP\/1\.1/i.test(String_data);
            
            
            
            // se crea la nueva request obteniendo el head y el body y almacenandolos por separado =>...

            
            // se implementa request handler al cual se le pasa la peticion y el metodo send mediante un objeto
            requestHandler(request, {
                send: (response_code, response_header, response_body) => {
                    // se almacena en un espacio del array la longitud
                    response_header['length_content'] = response_body.length;
                    // se almacena en un espacio del array la fecha con el metodo toUTCString
                    response_header['Date'] = (new Date()).toUTCString();
                    // se escribe el contenido de respuesta del header
                    socket.write(`${response_header}`)
                    // se escribe el contenido de la respuesta del body
                    socket.end(`${response_body}`);
                    // se destruye el socket y se cierra la conexion
                    socket.destroy();
                    // se notifica que se cerro la conexion con el servidor
                    console.log("Se destruyó el socket efectivamente!")
                }
            });
        });
    });
    return {
        //la funcion createServer debe devolver tanto el listen en un puerto concreto como el close para cerrar la conexion
        listen: (portNumber) => {
            //se imprime por consola el puerto en el que estará abierta la conexion del servidor
            //para que el usuario pueda acceder a la ruta
            console.log("Servidor abierto en http://localhost:"+portNumber);
            //se establece el metodo para que el servidor escuche (listen) en el puerto indicado
            server.listen(portNumber);
        },
        close: () => {
            server.close();
        }
    };
  };