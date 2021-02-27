var http = require("http");
http.createServer(function(request, response) {
if (request.url === "/foo") {
response.end("Hello HTTP");
} else {
response.statusCode = 404;
response.end();
}
}).listen(8000);