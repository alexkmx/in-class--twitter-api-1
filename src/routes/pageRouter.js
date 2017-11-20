const Router = require('express').Router;
const fs = require('fs-extra');

// Init router
const pageRouter = Router();

// Create routes
pageRouter
  .get('/', (req, res) => {
    res.render('home.ejs');
  });

pageRouter
  .get('/about', (req, res) => {
    res.render('about.ejs');
  })

  
module.exports = pageRouter;
