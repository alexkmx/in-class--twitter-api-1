const dataRows = [
  {
  description: 'Essential Image Optimization: my new eBook on image best practices!',
  likes: '2400',
  retweets: '1000',
  userId: 28
},{
  description: 'REST routes',
  likes: 2,
  retweets: 10,
  userId: 1
}
];

exports.seed = function(knex, Promise) {
  return knex('tweets')
    .del()
    .then(() => {
      return knex('tweets')
        .insert(dataRows);
    })
}
