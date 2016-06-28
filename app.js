var express = require('express');
var app = express();
var template = require('./template');

// arquivos estaticos
app.use("/css", express.static('css'));
app.use("/fonts", express.static('fonts'));
app.use("/img", express.static('img'));
app.use("/img/cars", express.static('img/cars'));
app.use("/js", express.static('js'));
app.use("/data", express.static('data'));
app.use("/html", express.static('html'));

// Rotas
app.use('/', require('./routers')); // routers/index.js
app.use('/', require('./routers/painel'));

app.listen(3000, function () {
	console.log('Rodando o servidor na porta 3000!');
});