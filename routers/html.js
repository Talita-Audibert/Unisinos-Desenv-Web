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
		var carros = {};
		var reservas = [];
		const db = new sqlite3.Database('sistema.db');
	
		db.serialize(() => {
			db.each("SELECT * FROM carros", (err, row) => {
				if (err) throw err;			
				
				carros[row.id] = row;
			}, () => {
				db.each("SELECT * FROM reservas", (err, row) => {
					if (err) throw err;

					var start_date = new Date(row.periodo_inicial * 1000);
					var end_date = new Date(row.periodo_final * 1000);
					
					reservas.push({
						id: row.id,
						carro: carros[row.id_carro],
						periodo_inicial: datetime.strftime(start_date, '%d/%m/%Y %H:%M'),
						periodo_final: datetime.strftime(start_date, '%d/%m/%Y %H:%M')
					});
				}, () => {
					res.send(render({
						reservas: reservas
					}));
				});
			});
		});
		
		db.close();
	});
});

module.exports = routes;