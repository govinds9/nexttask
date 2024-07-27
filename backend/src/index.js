import dotenv from 'dotenv'

import connectDB from './db/connectDb.js'
import { app } from './app.js'


dotenv.config({
    path:"../.env"
})

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on ${process.env.PORT}`);
      });

}).catch(()=>{
    console.log("Error in connecting Db", err);
})