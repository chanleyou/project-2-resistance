module.exports = (db) => {

	return {

		index: (request, response) => {

			db.lobbies.index((error, queryResult) => {
				if (error) {
					console.error('error getting lobbies:', error);
					response.sendStatus(500);

				} else {

					response.render('lobbies/index', {cookies: request.cookies, lobbies: queryResult.rows});

				}
			})
		}

	}
}