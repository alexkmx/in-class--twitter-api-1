
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('tweet', table => {
      table.increments();

      table.string('description');
      table.timestamp('createAt').notNullable().defaultTo(knex.fn.now());
      table.integer('likes');
      table.integer('retweets');
  });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('tweet');
};
