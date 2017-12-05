const Router = require('express').Router;
const Tweet = require('../models/Tweet.js')
const Profile = require('../models/Profile.js')

const apiRouter = Router();

//USER FUNCTIONS

function requireAuthentication(req, res, next) {
   if(req.user) { //Si esta logeado lo dejo consultar con next
    next();
    }else {        //SIno responmdemos no hay usuario logeado
      res.json({
      status: 'No User Authenticated.'
    });
  }
}

function getAllProfiles(req, res) {
  Profile

    .query()
    .eager('tweet')
    .then(data => res.json(data));
}

function getProfileById(req, res) {
  Profile
  .query()
  .findById(req.params.id)
  .then(Profile => {
    res.json(Profile).status(200);
  })
  .catch(error => {
    res.send(error).status(500);
  });
}

function createProfile(req, res) {
  Profile
  .query()
  .insert(req.body)
  .then(newProfile => {
    return json (newProfile).status(200);
  })
  .catch(error => {
    return res.send(error).status(500);
  });
}

function updateProfile(req, res) {
  Profile
  .query()
  .updateAndFetchById(req.params.id, req.body)
  .then(profileUpdated => {
    return res.json(profileUpdated).status(200);
  })
  .catch(error => {
    return res.send(error).status(500);
  })
}

function deleteProfileAndRelatedTweetsById (req, res) {
  // Get Profile to delete from DB.
  Profile
    .query()
    .where('id', req.params.id)
    .first()
    .returning('*')
    .then(profileToDelete => {
      // Delete all tweets from this User.
      return profileToDelete
        .$relatedQuery('tweet') // eager name declared in the relation
        .delete()
        .where('profileId', profileToDelete.id)
        .returning('*')
        .then(tweetsDeleted => {
          return profileToDelete
        })
        .catch(error => {
          return res.send(error).status(500);
        });
    })
    .then(profile => {
      return Profile
        .query()
        .deleteById(profile.id)
        .then(() => {
          return profile;
        })
    })
    .then(profileDeleted => {
      res.json(profileDeleted).status(200);
    })
    .catch(error => {
      return res.send(error).status(500);
    });
}

//TWEET FUNCTIONS

function getAllTweets (req, res) {
  Tweet

    .query()
    .then(data => res.json(data));
}

function getTweetById(req, res) {
  Tweet
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
  Tweet
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
  Tweet
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
  Tweet
  .query()
  .deleteById(req.params.id)
  .then(tweetDeleted => {
    return res.json({
  rowsDeleted: tweetDeleted
  });
})
  .catch(error => {
  return res.send(error).status(500);
  })
}

//Profile Endpoints
apiRouter
  .get('/profile', requireAuthentication, getAllProfiles)
  .get('/profile/:id', getProfileById)
  .post('/profile', createProfile)
  .put('/profile/:id', updateProfile)
  .delete('/profile/:id', deleteProfileAndRelatedTweetsById);

//Tweets Endpoints
apiRouter
  .get('/tweet', requireAuthentication, getAllTweets)
  .get('/tweet/:id', getTweetById)
  .post('/tweet', createTweet)
  .put('/tweet/:id', updateTweet)
  .delete('/tweet/:id', deleteTweetById);

module.exports = apiRouter;
