const sha256 = require('js-sha256');
const SALT = 'latvianpotato';

module.exports = (app, db, io) => {

	const users = require('./controllers/users')(db);
	const lobbies = require('./controllers/lobbies')(db, io);
	const game = require('./controllers/game')(db, io);


	app.put ('/lobbies/:id/choose', game.choosePhase);
	app.put('/lobbies/:id/start', game.startGame);
	
	// client-side JS routes
	// they're posts instead to gets to make cheating a little harder... though not impossible

	app.get('/lobbies/:id/status', lobbies.getStatus);
	app.post('/lobbies/:id/getPlayers', lobbies.getPlayers);
	
	// server-side JS routes (renders)
	app.post('/lobbies', lobbies.create);
	
	app.get('/lobbies/:id', lobbies.enter);
	app.get('/lobbies/', lobbies.index);
	
	app.get('/users/new', users.newForm);
	app.post('/users', users.create);

	app.get('/users/login', users.loginForm);
	app.post('/users/login', users.loginPost);
	app.post('/users/logout', users.logout);

	app.get('/', (request, response) => {
		response.redirect('/lobbies/');		
	})
}