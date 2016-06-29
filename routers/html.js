const routes = require('express').Router();
const template = require('../template');
const sqlite3 = require('sqlite3').verbose();

routes.get('/html/home.html', (req, res) => {
	const db = new sqlite3.Database('sistema.db');
		
	db.serialize(() => {
		var carros = [];
		
		db.each("SELECT * FROM carros", (err, row) => {
			if (err) throw err;			
			carros.push(row);
		}, () => {
			template.request('html/home', (render) => {
				res.send(render({
					carros: carros
				}));
			});
		});
	});
	
	db.close();
});

routes.get('/html/reservas.html', (req, res) => {
	template.request('html/reservas', (render) => {
		res.send(render());
	});
});

module.exports = routes;