import mongoose, { Mongoose } from "mongoose";

const configureDB = async () =>{
    try {
        const dburl = 'mongodb://localhost:27017/meetx'
        const db = mongoose.connect(dburl)
        console.log('conneted to database..')
    } catch (error) {
        console.log(error)
    }
}
export default configureDB