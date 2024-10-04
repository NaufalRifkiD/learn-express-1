const express = require('express')
const User = require('./models/user') // Import the User model

const app = express()
app.use(express.json()) // Parse incoming JSON requests

// Define a route to create a new user
app.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body
    const user = await User.create({ username, email })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Define a route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user endpoint
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id
  const { username, email } = req.body

  try {
    // Find the user by ID
    const user = await User.findByPk(userId)

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update the user's fields
    user.username = username || user.username // Only update if provided
    user.email = email || user.email // Only update if provided

    await user.save() // Save the updated user

    return res.status(200).json(user) // Return the updated user
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
})

//delete
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id

  try {
    // Find the user by ID
    const user = await User.findByPk(userId)

    // If user not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Delete the user
    await user.destroy()

    return res.status(204).send() // Return a 204 No Content response
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Sync the database and start the server
const PORT = process.env.PORT || 3000
const sequelize = require('./index')
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
