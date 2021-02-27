var http = require("http");
var server = http.createServer(function(request, response) {
response.setHeader("Content-Type", "text/html");
response.write("Hello <strong>HTTP</strong>!");
response.end();
});
server.listen(8000);