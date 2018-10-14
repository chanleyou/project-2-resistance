const sha256 = require('js-sha256');
const SALT = 'latvianpotato';

module.exports = (db) => {

	return {
		
		newForm: (request, response) => {

			if (request.cookies.loggedin) {
				console.log('User is already logged in!');
				response.redirect('/'); // CHANGE TO LOBBIES
				
			} else {
				response.render('users/new', {cookies: request.cookies});
			}
		},

		create: (request, response) => {

			db.users.getName(request.body, (error, queryResult) => {

				if (error) {
					console.error('error getting user:', error);
					response.sendStatus(500);

				} else if (queryResult.rowCount > 0) {
					console.log('Username already exists!');
					response.render('users/new', {cookies: request.cookies, errorMessage: "A user with this name already exists!"});

				} else {

					db.users.create(request.body, (error, queryResult) => {

						if (error) {
							console.error('error getting user:', error);
							response.sendStatus(500);
						}

						if (queryResult.rowCount >= 1) {
							console.log('User created!');

							userid = queryResult.rows[0].id;
							username = queryResult.rows[0].name;

							response.cookie('loggedin', sha256(userid + username + SALT));
							response.cookie('username', username);
							response.cookie('userid', userid);
							response.redirect('/');

						} else {
							console.log('User could not be created.');
							response.sendStatus(500);
						}
					})
				}
			})
		},

		loginForm: (request, response) => {

			if (request.cookies.loggedin) {
				console.log('User is already logged in!');
				response.redirect('/');
				
			} else {
				response.render('users/login', {cookies: request.cookies});
			}
		},

		loginPost: (request, response) => {

			db.users.getName(request.body, (error, queryResult) => {

				if (error) {
					console.error('error getting user:', error);
					response.sendStatus(500);

				} else if (queryResult.rowCount === 0) {
        
					console.log('User not found!');
					response.render('users/login', {cookies: request.cookies, errorMessage: "Incorrect username or password!"});
	
				} else {

					let userid = queryResult.rows[0].id;
					let username = queryResult.rows[0].name;
					let password = queryResult.rows[0].password;
					
					if (sha256(request.body.password) === password) {
	
						response.cookie('loggedin', sha256(userid + username + SALT));
						response.cookie('userid', userid);
						response.cookie('username', username);
	
						response.redirect('/');
					
					} else {
						console.log('Incorrect password!');
						response.render('users/login', {cookies: request.cookies, errorMessage: "Incorrect username or password!"});
					}
				}
			})
		},

		logout: (request, response) => {

			response.clearCookie('loggedin');
			response.clearCookie('username');
			response.clearCookie('userid');
			response.redirect('/');
		},



	}
}