import { Schema, model } from "mongoose";

const activitySchema = new Schema({
    title: String,
    description: String,
    location: String,
    dateTime: Date
}, { timestamps: true });

const Activity = model('Activity', activitySchema);
export default Activity;
