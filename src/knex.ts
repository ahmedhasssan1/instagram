export const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: 'localhost',
    port: 4000,
    user: 'postgres',
    password: '123456',
    database: 'instagram2',
  },
});