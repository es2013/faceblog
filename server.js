const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});





// //add dependencies
// const express = require('express');
// const routes = require('./controllers/');
// const sequelize = require('./config/connection');
// const path = require('path');
// //handlebar template engine

// const exphbs = require('express-handlebars');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// //set up environment variables
// const PORT = process.env.PORT || 3001;
// const sess = {
//     secret: 'my secret cookie code',
//     cookie: { maxAge: 500000 }, //cookie expiration 
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };
// app.use(session(sess));
// const helpers = require('./utils/helpers');

// const hbs = exphbs.create({ helpers });


// //parses incoming requests with JSON payloads and is based on body-parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //add ability to use public folder holding css. It allows it to take contents of a folder and server them as static assetes
// app.use(express.static(path.join(__dirname,'public')));
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');



// // turn on routes
// app.use(routes);

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });