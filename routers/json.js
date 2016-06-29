const routes = require('express').Router();
const bodyParser = require('body-parser');
const datetime = require('datetimejs');
const sqlite3 = require('sqlite3').verbose();

// criando parser para application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.post('/json/reservas', urlencodedParser, (req, res) => {
	const db = new sqlite3.Database('sistema.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
		if (err) throw err;
	});
	
	db.serialize(() => {
		db.run("INSERT INTO reservas (id_carro, periodo_inicial, periodo_final) VALUES (?, ?, ?)",
			[req.body.carro,
			datetime.strptime(req.body.periodo_inicial, '%d/%m/%Y %H:%M').getTime()/1000,
			datetime.strptime(req.body.periodo_final, '%d/%m/%Y %H:%M').getTime()/1000],
		(err) => {			
			res.json({
				err: err ? 1 : 0,
				msg: err ? err : 'cadastro concluído'
			});
		});
	});
	
	db.close();
});

module.exports = routes;