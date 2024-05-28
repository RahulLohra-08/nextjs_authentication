import mongoose from "mongoose";
import { DB_NAME } from '@/constants/index'

const connect = async () => {
    try {
        console.log("Mongo db connecting...", `${process.env.MONGO_URI!}/${DB_NAME}`)
        await mongoose.connect(`${process.env.MONGO_URI!}/${DB_NAME}`); 

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo DB Connected successfully");
        });

        connection.on("error", (err) => {
            console.log("Mongo DB connection error. Please make sure MongoDB is running.", err);
            process.exit(1);
        });
    } catch (error) {
        console.log("Something went wrong while connecting MongoDB");
        console.log("Error: ", error);
    }
}

export default connect;
