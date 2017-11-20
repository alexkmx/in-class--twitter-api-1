const express = require('express');
const fs = require('fs-extra');
const ejs = require('ejs');
const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile.js');
const {Model} = require ('objection');

const pageRouter = require('./src/routes/pageRouter.js');
const apiRouter = require('./src/routes/apiRouter.js');

const app = express();

const appDb = connectToDb(dbConfigObj.development);

Model.knex(appDb);

app.locals.db = appDb;

app.engine('ejs', ejs.renderFile);
app.set('view engine','ejs');
app.set('views', `${__dirname}/src/views`);

app.use(express.static(`${__dirname}/public`))

app.use('/', pageRouter);
app.use('/api/v1', apiRouter);

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
