const routes = require('express').Router();
const template = require('../template');

routes.get('/painel', (req, res) => {
	res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;