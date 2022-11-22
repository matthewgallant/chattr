/**
 * @file chattr server entry point
 * @copyright Matthew Gallant
 */

const dotenv = require('dotenv').config()
const colors = require('colors')
const express = require('express')

const errorHandler = require('./middleware/errorMiddleware')
const connectMongo = require('./utilities/connectMongo')

const messageRoutes = require('./routes/messageRoutes')
const channelRoutes = require('./routes/channelRoutes')
const accountRoutes = require('./routes/accountRoutes')

// Connect to database
connectMongo()

// Create and configure express instance
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Setup routers
app.use('/api/message', messageRoutes)
app.use('/api/channel', channelRoutes)
app.use('/api/account', accountRoutes)

// Use custom error handler
app.use(errorHandler)

// Run server
app.listen(process.env.PORT, () => {
    console.log(`chattr running on port ${process.env.PORT}...`.green.underline)
})
