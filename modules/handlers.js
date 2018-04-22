var fs          = require('fs');
var formidable  = require('formidable');
var url         = require('url');
var querystring = require('querystring');

exports.upload = function(request, response) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(request, function(error, fields, files) {
    	if (error) {
    		throw (error);
    	}
	    response.writeHead(200, {'Content-Type': 'text/html'});
	    if (typeof(files) === 'undefined' || typeof(files.upload) === 'undefined') {
	    	response.end();
	    	return;
	    }
		response.write('received images: <br/>');
    	for (let fileId = 0; fileId < files.upload.length; fileId++){
    		if (files.upload[fileId].name === null || files.upload[fileId].name.length === 0) {
    			break;
    		}
	    	var fileDestPath = './files/' + files.upload[fileId].name;
	        fs.renameSync(files.upload[fileId].path, fileDestPath);
			console.log('[handlers] upload ', files.upload[fileId].name, ' done');
    		response.write('<img src="/show?' + files.upload[fileId].name + '"/><br/>');    
			if (fileId == files.upload.length - 1) {
				response.end();
			}
		}
	});
}

exports.show = function(request, response) {
    //querystring.unescape used to translate eg. %20 to ' '
    let queryStr = querystring.unescape(url.parse(request.url).query);
    if (queryStr === 'null') {
        return;
    }  
    let filePath = './files/' + queryStr;
	console.log('[handlers] file to show: ', filePath);
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.readFile(filePath, "binary", function(error, file) {
    	if (error) {
    		throw (error);
    	}
    	console.log('[handlers] readFile: ', filePath);
        response.write(file, "binary");
		response.end();
    });
}

exports.welcome = function(request, response) {
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(html);
    	response.end();
	});
}

exports.error = function(request, response) {
    console.log('[handlers] request ', request.url, ' not recognized');
    response.write('404 request not recognized');
    response.end();
}