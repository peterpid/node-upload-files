var fs = require('fs');

exports.upload = function(request, response) {
    console.log('Request: upload');
    response.write('Upload start!');
    response.end();
}

exports.welcome = function(request, response) {
    console.log('Request: welcome');
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(html);
    	response.end();
	});
}

exports.error = function(request, response) {
    console.log('Request not recognized');
    response.write('404 request not recognized');
    response.end();
}