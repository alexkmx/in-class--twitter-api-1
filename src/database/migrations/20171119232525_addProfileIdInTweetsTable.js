
exports.up = function(knex, Promise) {
  return knex
    .schema
    .table('tweet', table => {
      table
        .integer('profileId')
        .unsigned()
        .references('id')
        .inTable('profile');

      return table;
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .table('tweet', table => {
      table.dropForeign('profileId');
      table.dropColumn('profileId');

      return table;
    });
};
