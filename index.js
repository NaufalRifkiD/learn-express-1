// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// models/index.js
const { Sequelize } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',  // or wherever your DB is hosted (Docker IP, for example)
  dialect: 'postgres', // PostgreSQL dialect
});

// Test the connection to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;