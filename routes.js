const sha256 = require('js-sha256');
const SALT = 'latvianpotato';

module.exports = (app, db, io) => {

	const users = require('./controllers/users')(db);
	const lobbies = require('./controllers/lobbies')(db, io);
	const game = require('./controllers/game')(db, io);

	// client-side JS routes
	app.put ('/lobbies/:id/choose', game.choosePhase);
	app.put('/lobbies/:id/start', game.startGame);

	app.post('/lobbies/:id/:mission/mission', game.mission);
	app.post('/lobbies/:id/:mission/vote', game.vote);
	
	app.get('/lobbies/:id/:mission/outcomes', game.getOutcomes);
	app.get('/lobbies/:id/:mission/votes', game.getVotes);
	app.get('/lobbies/:id/points', game.getPoints);
	app.get('/lobbies/:id/status', lobbies.getStatus);
	
	app.get('/lobbies/:id/getChat', lobbies.getChat);
	app.post('/lobbies/:id/getPlayers', lobbies.getPlayers); // this is a post even though it should be a get to avoid cheating as it reveals player roles
	app.get('/lobbies/:id/:mission', game.getMission);
	
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