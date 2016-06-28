const routes = require('express').Router();
const template = require('../template');

// rotas
routes.get('/', (req, res) => {
	template.request('main', (render) => {
		res.send(render({
			titulo: 'Índice',
			carregamento_ajax: true
		}));
	});
});

routes.get('/:file.html', (req, res) => {
	template.request('main', (render) => {
		res.send(render({
			titulo: req.params.file,
			carregamento_ajax: true,
			curr_page: req.params.file			
		}));
	});
});

module.exports = routes;