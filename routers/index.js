const routes = require('express').Router();
const template = require('../template');

// rotas
routes.get('/', (req, res) => {
	template.request('main', (render) => {
		res.status(200);
		res.type('text/html');
		res.send(render({ titulo: 'Índice' }));
	});
});

routes.get('/:file.html', (req, res) => {
	template.request('main', (render) => {
		res.status(200);
		res.type('text/html');
		
		res.send(render({
			titulo: req.params.file,
			curr_page: req.params.file			
		}));
	});
});

module.exports = routes;