const express = require('express');
const methodOverride = require('method-override');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true
}));

const cookieParser = require('cookie-parser');

const cookieParserIo = require('socket.io-cookie-parser');
const sha256 = require('js-sha256');
app.use(cookieParser());
io.use(cookieParserIo());

const SALT = 'latvianpotato';

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

const db = require('./db');
require('./routes')(app, db, io);

// just for the updateGame route
const game = require('./controllers/game')(db, io);

// socket.io stuff
io.on('connection', (socket) => {

  let cookies = socket.request.cookies;
  
  if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {
    
    console.log('User connected as: ' + cookies.username);
  } else {
    console.log('User not authenticated.');
  }

  socket.on('refreshIndex', () => {
    socket.broadcast.emit('refreshIndex');
  })
  
  socket.on('chat', (lobby, message) => {

    if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {

      let query = {
        id: lobby.id,
        username: cookies.username,
        user_id: cookies.userid,
        message: message
      }

      db.lobbies.chat(query, (error) => {
        if (error) {
          console.log('Error on chat: ', error);
        } else { 

          db.lobbies.getChat(lobby, (error, queryResult) => {
            if (error) {
              console.log('Error broadcasting chat:', error);
            } else {

              io.emit('chat', lobby, queryResult.rows);
            }
          })
        }
      })
    } 
  })

  socket.on('joinedGame', (lobby) => {

    if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {

      db.lobbies.getChat(lobby, (error, queryResult) => {
        if (error) {
          console.log('Error broadcasting chat:', error);
        } else {
          socket.emit('chat', lobby, queryResult.rows);
        }
      })

      console.log('here!');

      game.updateGame(lobby);
    }
  })

  socket.on('updateLogs', (lobby) => {

    if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {

      db.lobbies.getAllPlayers(lobby, (error, queryResult) => {
        if (error) {


        }
     })
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected.');
  })
})

const PORT = process.env.PORT || 3000;
const server = http.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

server.on('close', () => {
  console.log('Closed express server.');

  db.pool.end(() => {
    console.log('Shut down database connection pool.');
  });
});
