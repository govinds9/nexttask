import mongoose from 'mongoose'
import {DB_Name} from "../util/contant.js"


const connectDB = async ()=>{
    try {
        const Connected = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_Name}`
          );
          console.log(`\n Mongodb connected !! DBHOST: ${Connected.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB Connection Error", error);
        process.exit(1);
    }
}

export default connectDB;