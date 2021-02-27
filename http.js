var http = require("http");
var server = http.createServer(function(request, response){response.write("Hello!");
							   response.end();});
server.listen(8000);