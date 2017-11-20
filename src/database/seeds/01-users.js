const dataRows = [
{
   username: '@lancelot',
   name:'Lancelot Martinez',
   profileUrl: 'https://lancelot.com/avatar.jpeg'
}, {
   username: '@loquillo',
   name:'Loquillo Juarez',
   profileUrl: 'https://lloquillo.com/avatar.png'
}, {
   username: '@zeed',
   name:'Zeed Majora',
   profileUrl: 'https://zeed.com/avatar.png'

}

];

exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users')
        .insert(dataRows);
    });
}
