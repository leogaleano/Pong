const assert = require("assert");
const net = require("net");

const PORT = 8080;
const HOST = "127.0.0.1";

const post = () => {
    console.log("testing POST...");

    let buffer = "";
    const socket = new net.Socket();
    socket.connect(PORT, HOST);

    socket.on("data", data => {
        buffer += data.toString("utf8");
    });
    socket.on("end", () => {
        socket.end();

        console.log("buffer POST", buffer)
    });

    socket.write("POST / HTTP/1.1\r\n");
    socket.write("Accept: */*\r\n");
    socket.write("\r\n");
    socket.write("\r\n");
};

const get = () => {
    console.log("testing GET...");

    let buffer = "";
    const socket = new net.Socket();
    socket.connect(PORT, HOST);

    socket.on("data", data => {
        buffer += data.toString("utf8");
    });
    socket.on("end", () => {
        socket.end();

        console.log("buffer GET", buffer)
    });

    socket.write("GET /some/resource HTTP/1.1\r\n");
    socket.write("Host: localhost\r\n");
    socket.write("Accept: */*\r\n");
    socket.write("\r\n");
    socket.write("\r\n");
};

const postWithBody = () => {
    console.log("testing POST with several segments...");

    let buffer = "";
    const socket = new net.Socket();
    socket.connect(PORT, HOST);

    socket.on("data", data => {
        buffer += data.toString("utf8");
    });
    socket.on("end", () => {
        socket.end();

        assert(
            buffer.trim() ===
            `
HTTP/1.1 404 Not Found\r
Content-Type: text/plain\r
\r
The server only supports HTTP method GET\r
`.trim()
        );

        console.log("success");
    });

    socket.write("POST / HTTP/1.1\r\n");
    socket.write("Accept: */*\r\n");
    socket.write("\r\n");
    socket.write(
        "Voluptatem pariatur voluptates saepe consequatur omnis. Incidunt eaque est cum perferendis dolores molestiae. Ut quas distinctio corporis amet minus. Iste ab laborum quaerat tempora et animi ex.\r\n"
    );
    setTimeout(() => {
        socket.write("\r\n");
        socket.write("\r\n");
    }, 500);
};

setTimeout(post, 100);
setTimeout(get, 200);
// setTimeout(postWithBody, 300);
