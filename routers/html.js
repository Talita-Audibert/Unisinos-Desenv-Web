const routes = require('express').Router();
const template = require('../template');

routes.get('/html/home.html', (req, res) => {
	template.request('html/home', (render) => {
		res.send(render());
	});
});

routes.get('/html/reservas.html', (req, res) => {
	template.request('html/reservas', (render) => {
		res.send(render());
	});
});

module.exports = routes;