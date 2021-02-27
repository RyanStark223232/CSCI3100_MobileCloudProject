var http = require("http");
http.createServer(function(request, response) {
console.log(request.headers);
response.end();
}).listen(8000);