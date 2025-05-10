
import mongoose from "mongoose";

const configureDB = async () => {
  try {
    const dburl = process.env.MONGO_URI;
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default configureDB;


// import mongoose, { Mongoose } from "mongoose";

// const configureDB = async () =>{
//     try {
//         const dburl = 'mongodb://localhost:27017/meetx'
//         const db = mongoose.connect(dburl)
//         console.log('conneted to database..')
//     } catch (error) {
//         console.log(error)
//     }
// }
// export default configureDB



