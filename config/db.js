const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log('MongoDb Connected');
    } catch (error) {
        console.log('ERROR', error);
    }
}

module.exports = connectDB;
