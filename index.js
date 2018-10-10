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
require('./routes')(app, db);

// socket.io stuff
io.on('connection', (socket) => {

  let cookies = socket.request.cookies;
  
  if (cookies.loggedin === sha256(cookies.username + SALT)) {
    
    console.log('User connected as: ' + cookies.username);
  } else {
    console.log('User logging in with cookie authentication error!');
  }
  
  socket.on('chat', (message) => {

    if (cookies.loggedin === sha256(cookies.username + SALT)) {

      console.log(`Message by ${cookies.username}: ${message}`);
      io.emit('chat', cookies.username, message);
    } else {
      io.emit('chat', 'Server', 'Cookie authentication error!');
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
