const pg = require('pg');

const users = require('./models/users');
const lobbies = require('./models/lobbies');
const game = require('./models/game');

var configs = {
  user: 'chanleyou',
  host: '127.0.0.1',
  database: 'resistance',
  port: 5432
}

// var configs = {
// 	connectionString: process.env.DATABASE_URL,
// 	ssl: true
// }

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
	
	// app models here
  users: users(pool),
  lobbies: lobbies(pool),
  game: game(pool),

  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool:pool
};
