const { Model } = require('objection');

class Profile extends Model {
  static get tableName () {
    return 'profile';
  }

  static get relationMappings () {
    const Tweet = require('./Tweet.js');

    return {
      tweet: {
        relation: Model.HasManyRelation,
        modelClass: Tweet,
        join: {
          from: 'profile.id',
          to: 'tweet.profileId'
        }
      }
    };
  }
}

module.exports = Profile;
