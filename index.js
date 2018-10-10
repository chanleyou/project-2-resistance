const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const cookieParserIo = require('socket.io-cookie-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
io.use(cookieParserIo());

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


const db = require('./db');
// require('./routes')(app, db);

app.get('/', (request, response) => {

	response.render('test');
})

io.on('connection', (socket) => {

  // if cookies.session = hash(id + SALT)
  let cookies = socket.request.cookies;

  console.log('User connected as: ' + cookies.username);

  socket.on('chat', (message) => {
    if (cookies.username) {
      console.log(`Message by ${cookies.username}: ${message}`);
      io.emit('chat', cookies.username, message);
    } else {
      io.emit('chat', 'Server', 'Error!');
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
