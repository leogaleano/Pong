Client_Request = "GET /hellow.txt HTTP/1.1\nUser-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3\nHost: www.example.com\nAccept-Languaje: en, mi";

// crear una funcion que me coja el contenido de la request
// y me lo guarde en variables
function getRequestData(request) {

    // comprobamos que es lo que recibimos
    console.log("esta es la request que estamos recibiendo : \n\n"
        + request +"\n");

    // realizamos con funcion split la separacion de informacion
    // y la almacenamos en variables
    console.log("realizamos el get data y assing to variables\n");

    //separo la cadena en varias por el salto de linea
    var data = request.split("\n")

    // almaceno cada data en su correspondiente variable
    //POS0-GET
    Get_all = data[0];
    console.log("Get ==> " + Get_all);

    // de las siguientes solo me importa el contenido despues de los :
    // por lo tanto realizo otro split

    //POS1-USER AGENT
    User_Agent_all = data[1];
    var data_User_Agent_all = User_Agent_all.split(":")
    User_Agent_data = data_User_Agent_all[1];
    console.log("User_Agent ==> " + User_Agent_data);

    //POS2- HOST
    Host_all = data[2];
    var data_Host_all = Host_all.split(":")
    Host_data = data_Host_all[1];
    console.log("Host ==> " + Host_data);

    //POS3- LANGUAJE
    Accept_Languaje_all = data[3];
    var data_Accept_Languaje_all = Accept_Languaje_all.split(":")
    Accept_Languaje_data = data_Accept_Languaje_all[1];
    console.log("Accept_Languaje ==> " + Accept_Languaje_data);
}

getRequestData(Client_Request);