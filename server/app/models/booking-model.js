import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' },
    bookedAt: { type: Date, default: Date.now }
});

const Booking = model('Booking', bookingSchema);
export default Booking;
