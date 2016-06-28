var express = require('express');
var app = express();
var template = require('./template.js');

// arquivos estaticos
app.use("/css", express.static('css'));
app.use("/fonts", express.static('fonts'));
app.use("/img", express.static('img'));
app.use("/img/cars", express.static('img/cars'));
app.use("/js", express.static('js'));
app.use("/data", express.static('data'));
app.use("/html", express.static('html'));

// rotas
app.get('/', function(req, res) {
	template.request('main', function(render) {
		res.status(200);
		res.type('text/html');
		res.send(render({ titulo: 'Índice' }));
	});
});
// temporario, separar em routers diferentes
app.get('/:file.html', function(req, res) {
	template.request('main', function(render) {
		res.status(200);
		res.type('text/html');
		
		res.send(render({
			titulo: req.params.file,
			curr_page: req.params.file			
		}));
	});
});

app.listen(3000, function () {
	console.log('Rodando o servidor na porta 3000!');
});