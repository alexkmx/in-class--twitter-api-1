const Router = require('express').Router;
const Tweets = require('../models/Tweet.js')
const Users = require('../models/User.js')

const apiRouter = Router();

function getAllUsers(req, res) {
  Users

    .query()
    .eager('tweets')
    .then(data => res.json(data));
}

function getAllTweets (req, res) {
  Tweets

    .query()
    .then(data => res.json(data));
}

apiRouter
  .get('/users', getAllUsers)
  .get('/tweets', getAllTweets);

module.exports = apiRouter;
