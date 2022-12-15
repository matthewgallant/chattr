/**
 * @file Routes for accounts
 * @copyright Matthew Gallant
 */

const express = require('express')
const accountRouter = express.Router()

const {
    registerAccount,
    loginAccount
} = require('../controllers/accountController')

accountRouter
    .post('/register', registerAccount)
    .post('/login', loginAccount)

module.exports = accountRouter
