const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/notediary"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log('Connected to MongoDB Successfully')
}

module.exports = connectToMongo;