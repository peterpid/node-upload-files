var http 	   = require('http');
var colors   = require('colors');
var url      = require('url');
var handlers = require('./handlers');

function start() {
    function onRequest(request, response) {
        console.log('[server] Request '.green, url.parse(request.url).pathname , ' received'.green);
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        switch (url.parse(request.url).pathname) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
      	    handlers.show(request, response);
      	        break;
            default:
                handlers.error(request, response);
        }
    }
    http.createServer(onRequest).listen(9000);
    console.log('[server] Server running'.green);
}

exports.start = start;