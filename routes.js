const sha256 = require('js-sha256');
const SALT = 'latvianpotato';

module.exports = (app, db) => {

	const users = require('./controllers/users')(db);
	const lobbies = require('./controllers/lobbies')(db);

	app.get('/users/new', users.newForm);
	app.post('/users', users.create);

	app.get('/users/login', users.loginForm);
	app.post('/users/login', users.loginPost);
	app.post('/users/logout', users.logout);

	app.post('/lobbies', lobbies.create);

	app.get('/lobbies/:id', lobbies.enter);
	app.get('/lobbies/', lobbies.index);

	app.get('/', (request, response) => {

		response.redirect('/lobbies/');		
	})
}