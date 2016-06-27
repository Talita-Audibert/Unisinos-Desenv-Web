var express = require('express');
var app = express();

// arquivos estaticos
app.use("/css", express.static('css'));
app.use("/fonts", express.static('fonts'));
app.use("/img", express.static('img'));
app.use("/img/cars", express.static('img/cars'));
app.use("/js", express.static('js'));
app.use("/data", express.static('data'));

// rotas
app.get('/', function (req, res) {
  res.sendFile('home.html', {root: __dirname});
});

app.get('/home', function (req, res) {
  res.sendFile('home.html', {root: __dirname});
});

app.get('/categorias', function (req, res) {
  res.sendFile('/html/categorias.html', {root: __dirname});
});

app.get('/contatos', function (req, res) {
  res.sendFile('/html/contatos.html', {root: __dirname});
});

app.get('/quem-somos', function (req, res) {
  res.sendFile('html/quem.html', {root: __dirname});
});

app.get('/reservas', function (req, res) {
  res.sendFile('html/reservas.html', {root: __dirname});
});

app.listen(3000, function () {
  console.log('Rodando o servidor na porta 3000!');
});