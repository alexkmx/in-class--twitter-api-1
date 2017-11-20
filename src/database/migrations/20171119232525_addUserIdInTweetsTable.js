
exports.up = function(knex, Promise) {
  return knex
    .schema
    .table('tweets', table => {
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users');

      return table;
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .table('tweets', table => {
      table.dropForeign('userId');
      table.dropColumn('userId');

      return table;
    });
};
