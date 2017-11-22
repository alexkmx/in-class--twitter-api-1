const express = require('express');
const fs = require('fs-extra');
const ejs = require('ejs');
const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile.js');
const {Model} = require ('objection');
const bodyParser = require('body-parser');

const pageRouter = require('./src/routes/pageRouter.js');
const apiRouter = require('./src/routes/apiRouter.js');
const authRouter = require('./src/routes/authRouter.js');

const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const registerLocalStrategy = require('./src/middleware/passport-local--registerLocalStrategy.js');
const { configDeserializeUser, configSerializeUser } = require('./src/helpers/passport-local--sessionActions.js');

const app = express();

const appDb = connectToDb(dbConfigObj.development);

Model.knex(appDb);

app.locals.db = appDb;

app.engine('ejs', ejs.renderFile);
app.set('view engine','ejs');
app.set('views', `${__dirname}/src/views`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cookieSession({
  name: 'cookiemonster',    //Aqui le paso el nombre de valor que quiera
  secret: 'superdupersupersecret',
  httpOnly: true,
  signed: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(registerLocalStrategy());
passport.serializeUser(configSerializeUser());
passport.deserializeUser(configDeserializeUser());

app.use(express.static(`${__dirname}/public`))

app.use('/', pageRouter);
app.use('/api/v1', apiRouter);
app.use('/auth', authRouter);

// Create 404 route
app.use((req, res) => {
  res.render('404.ejs')
});

// app.use('/', (req, res) => {
//   fs
//     .readFile(PATH, 'utf-8')
//     .then(data => {
//       res.send(data);
//     })
//   })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`App listening on port ${PORT}`)

});
