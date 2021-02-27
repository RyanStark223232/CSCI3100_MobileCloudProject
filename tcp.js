var net = require("net");
var server = net.createServer({
allowHalfOpen: false
}, function(socket) {
// handle connection
socket.end("Hello and Goodbye!\n");
});
server.listen(8000, "127.0.0.1");