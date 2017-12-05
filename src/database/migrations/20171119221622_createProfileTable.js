
exports.up = function(knex, Promise) {
  return knex
  .schema
  .createTable('profile', table => {
    table.increments();

    table.string('username');
    table.string('name');
    table.string('profileUrl');
    table.timestamp('createAt').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('profile');
};
