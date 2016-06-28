const routes = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const template = require('../template');
const password = require('../password');
const sqlite3 = require('sqlite3').verbose();

// criando parser para application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Roteamento para verificar login
routes.use('/', (req, res, next) => {
    if (req.session.logado || req.url.startsWith('/painel/login') || req.url.startsWith('/painel/instalar_bd'))
        return next();
	
    res.redirect('/painel/login');
});

routes.get('/painel', (req, res) => {
	// painel principal
	res.send('Tela principal');
});

routes.get('/painel/login', (req, res) => {
	fs.stat('sistema.db', (err, stat) => {
		if (!err && stat.size > 0) {
			// mostrar login
			template.request('login', (render) => {
				var titulo = 'Login no sistema'; 
				var data = {
					titulo: titulo,
					login_url: '/painel/login',
					conteudo: render({
						titulo: titulo,
						enviar_texto: 'Entrar'
					})
				};
				
				template.request('main', (render) => {
					res.send(render(data));
				});
			});
		} else if ((err && err.code == 'ENOENT') || (stat && !stat.size)) {
			console.log('Criar sistema.db');
			res.redirect('/painel/instalar_bd');
		} else if (err) {
			console.log('Erro: ', err.code);
		}
	});
});

routes.post('/painel/login', urlencodedParser, (req, res) => {
	
	if (typeof req.body.login != 'string' || typeof req.body.password != 'string') {
		res.redirect('/painel/login?msg=' + encodeURIComponent('login ou senha em branco!'));
		return;
	}
	
	const db = new sqlite3.Database('sistema.db');
		
	db.serialize(() => {
		var logado = false;
		
		db.get("SELECT * FROM usuarios WHERE login = ?", req.body.login, function(err, row) {
			if (err) throw err;
			
			if (password.check(req.body.password, row.senha, row.salt))
			{
				req.session.logado = true;
				res.redirect('/painel');
			} else {
				res.redirect('/painel/login?msg=' + encodeURIComponent('usuário ou senha inválidos!'));
			}
		});
	});
	
	db.close();
});

routes.get('/painel/instalar_bd', (req, res) => {
	// verifica se bd existe e informa um erro 404
	// senão cria o bd
	fs.stat('sistema.db', (err, stat) => {
		if (!err && stat.size > 0) {
			res.status(404).send('Not found');
		} else if ((err && err.code == 'ENOENT') || (stat && !stat.size)) {
			// criar bd
			// pedir login e senha para registro
			template.request('login', (render) => {
				var titulo = 'Registrar usuário'; 
				var data = {
					titulo: titulo,
					login_url: '/painel/instalar_bd',
					conteudo: render({
						titulo: titulo,
						enviar_texto: 'Registrar'
					})
				};
				
				template.request('main', (render) => {
					res.send(render(data));
				});
			});
		} else if (err) {
			console.log('Erro: ', err.code);
		}
	});
});

routes.post('/painel/instalar_bd', urlencodedParser, (req, res) => {
	// verifica se bd existe e informa um erro 404
	// senão cria o bd
	fs.stat('sistema.db', (err, stat) => {
		if (!err && stat.size > 0) {
			res.status(404).send('Not found');
		} else if ((err && err.code == 'ENOENT') || (stat && !stat.size)) {
			// criar bd
			// pedir login e senha para registro
			
			if (typeof req.body.login != 'string' || typeof req.body.password != 'string') {
				res.redirect('/painel/instalar_bd?erro=' + encodeURIComponent('Login ou senha em branco'));
				return;
			}
			
			fs.readFile('sistema.sql', 'utf8', (err, sqlText) => {
				if (err) throw err;
				
				const db = new sqlite3.Database('sistema.db');
				
				var passinfo = password.create(req.body.password);
				
				db.serialize(() => {
					db.exec(sqlText);
					db.run("INSERT INTO usuarios (login, senha, salt) VALUES (?, ?, ?)", req.body.login, passinfo.hash, passinfo.salt);
				});
				
				db.close();
				
				// precisa de um tempo para criar o arquivo
				setTimeout(() => {
					res.redirect('/painel/login?msg=' + encodeURIComponent('sistema.db criado'));
				}, 100);
			});
		} else if (err) {
			console.log('Erro: ', err.code);
		}
	});
});

module.exports = routes;