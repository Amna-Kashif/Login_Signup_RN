import mongoose from "mongoose"

export const connectdb = async () => {
    try {

        const DB_URL = process.env.DB_URL
        mongoose.connect(DB_URL)

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })

        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to mongoDB', err);

        })

    } catch (error) {
        console.log(error);

    }
}