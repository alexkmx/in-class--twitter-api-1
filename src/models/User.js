const { Model } = require('objection');

class Users extends Model {
  static get tableName () {
    return 'users';
  }

  static get relationMappings () {
    const Tweets = require('./Tweet.js');

    return {
      tweets: {
        relation: Model.HasManyRelation,
        modelClass: Tweets,
        join: {
          from: 'users.id',
          to: 'tweets.userId'
        }
      }
    };
  }
}

module.exports = Users;
