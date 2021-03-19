//add dependencies
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const path = require('path');
//handlebar template engine

const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({ helpers });

const app = express();
//set up environment variables
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'my secret cookie code',
    cookie: { maxAge: 500000 }, //cookie expiration 
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//add ability to use public folder holding css. It allows it to take contents of a folder and server them as static assetes
app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));



// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});