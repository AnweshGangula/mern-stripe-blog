const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("DB Connected successfully")
    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);
    }
}

module.exports = connectDB