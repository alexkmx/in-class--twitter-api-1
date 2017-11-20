const {Model} = require('objection');

class Tweets extends Model {
 static get tableName(){
  return 'tweets';
  }
 }

module.exports = Tweets;
