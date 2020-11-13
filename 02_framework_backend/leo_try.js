const { Server } = require("http");

const createServer = (requestHandler) => {
    // ... ✏️
  
    //server es la variable que se ha de crear que contendrá el servidor
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