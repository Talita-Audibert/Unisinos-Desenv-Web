var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    //console.log(req);
    displayForm(res);
});

function displayForm(res) {
    //var data = 'resposta';
    fs.readFile('~/../../html/contatos.html', function (err, data) {
        if(err)
        console.log(err);
        
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
   });
}

server.listen(1185);
console.log("server listening on 1185");