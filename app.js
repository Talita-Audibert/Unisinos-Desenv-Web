const express = require('express');
const session = require('express-session');
const app = express();
const template = require('./template');

// suporte a sessões
app.use(session({
	key: 'session.sid',
	secret: 'GB-Impl',
	name: 'site_cookie',
	resave: true,
	saveUninitialized: true
}));

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
app.use('/', require('./routers/html'));
app.use('/', require('./routers/painel'));

app.listen(3000, function () {
	console.log('Rodando o servidor na porta 3000!');
});