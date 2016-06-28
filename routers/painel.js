const routes = require('express').Router();
const fs = require('fs');
const template = require('../template');
const sqlite3 = require('sqlite3').verbose();

routes.get('/painel', (req, res) => {
	console.log('Ir para login');
	res.redirect('/painel/login');
});

routes.get('/painel/login', (req, res) => {
	fs.stat('sistema.db', (err, stat) => {
		if (!err && stat.size > 0) {
			// mostrar login
			res.send('Tela login');
		} else if ((err && err.code == 'ENOENT') || (stat && !stat.size)) {
			console.log('Criar sistema.db');
			res.redirect('/painel/instalar_bd');
		} else if (err) {
			console.log('Erro: ', err.code);
		}
	});
});

routes.get('/painel/instalar_bd', (req, res) => {
	// verifica se bd existe e informa um erro 404
	// senão cria o bd
	fs.stat('sistema.db', function(err, stat) {
		if (!err && stat.size > 0) {
			res.status(404).send('Not found');
		} else if ((err && err.code == 'ENOENT') || (stat && !stat.size)) {
			// criar bd
			// pedir login e senha para registro
			fs.readFile('sistema.sql', 'utf8', (err, sqlText) => {
				if (err) throw err;
				
				const db = new sqlite3.Database('sistema.db');
				
				db.serialize(() => {
					db.run(sqlText);
				});
				
				db.close();
				
				res.send('sistema.db criado');
			});
		} else if (err) {
			console.log('Erro: ', err.code);
		}
	});
});

module.exports = routes;