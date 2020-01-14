const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');

const PORT = 5000;

const MountAPI = require('./controllers');

const app = express();

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: null,
  defaultView: 'default',
  layoutsDir: path.join(__dirname, 'views/'),
  partialsDir: path.join(__dirname, 'views/partials/')
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'cats', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', MountAPI(app));

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});