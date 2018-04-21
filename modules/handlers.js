exports.upload = function(request, response) {
    console.log('Request: upload');
    response.write('Upload start!');
    response.end();
}

exports.welcome = function(request, response) {
    console.log('Request: welcome');
    response.write('Welcome on start site!');
    response.end();
}

exports.error = function(request, response) {
    console.log('Request not recognized');
    response.write('404 request not recognized');
    response.end();
}