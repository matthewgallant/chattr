/**
 * @file MongoDB connection code
 * @copyright Matthew Gallant
 */

const mongoose = require('mongoose')

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectMongo
