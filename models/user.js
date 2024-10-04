// models/User.js
const { DataTypes } = require('sequelize')
const sequelize = require('../index')

// Define a User model
const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
)

module.exports = User
