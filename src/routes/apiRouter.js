const Router = require('express').Router;
const Tweets = require('../models/Tweet.js')
const Users = require('../models/User.js')

const apiRouter = Router();

//USER FUNCTIONS

function getAllUsers(req, res) {
  Users

    .query()
    .eager('tweets')
    .then(data => res.json(data));
}

function deleteUserAndRelatedTweetsById (req, res) {
  // Get User to delete from DB.
  Users
    .query()
    .where('id', req.params.id)
    .first()
    .returning('*')
    .then(userToDelete => {
      // Delete all tweets from this User.
      return userToDelete
        .$relatedQuery('tweets') // eager name declared in the relation
        .delete()
        .where('userId', userToDelete.id)
        .returning('*')
        .then(tweetsDeleted => {
          return userToDelete
        })
        .catch(error => {
          return res.send(error).status(500);
        });
    })
    .then(user => {
      return Users
        .query()
        .deleteById(user.id)
        .then(() => {
          return user;
        })
    })
    .then(userDeleted => {
      res.json(userDeleted).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

//TWEET FUNCTIONS

function getAllTweets (req, res) {
  Tweets

    .query()
    .then(data => res.json(data));
}

function getTweetById(req, res) {
  Tweets
  .query()
  .findById(req.params.id)
  .then(Tweet => {
    res.json(Tweet).status(200);
  })
  .catch(error => {
    res.send(error).status(500);
  });
}

function createTweet (req, res) {
  Tweets
  .query()
  .insert(req.body)
  .then(newTweet => {
    return json (newTweet).status(200);
  })
  .catch(error => {
    return res.send(error).status(500);
  });
}

function updateTweet(req, res) {
  Tweets
  .query()
  .updateAndFetchById(req.params.id, req.body)
  .then(tweetUpdated => {
    return res.json(tweetUpdated).status(200);
  })
  .catch(error => {
    return res.send(error).status(500);
  })
}

function deleteTweetById(req, res) {
  Tweets
  .query()
  .deleteById(req.params.id)
  .then(tweetsDeleted => {
    return res.json({
  rowsDeleted: tweetsDeleted
  });
})
  .catch(error => {
  return res.send(error).status(500);
  })
}

//User Endpoints
apiRouter
  .get('/users', getAllUsers)
  .delete('/users/:id', deleteUserAndRelatedTweetsById);

//Tweets Endpoints
apiRouter
  .get('/tweets', getAllTweets)
  .get('/tweets/:id', getTweetById)
  .post('/tweets', createTweet)
  .put('/tweets/:id', updateTweet)
  .delete('/tweets/:id', deleteTweetById);

module.exports = apiRouter;
