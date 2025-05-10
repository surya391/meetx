// controller/booking-cltr.js
import Booking from '../models/booking-model.js';

const bookingCltr = {};
bookingCltr.create = async (req, res) => {
    try {
        console.log("User ID from token:", req.user.userId); // Log userId
        const booking = new Booking({
            user: req.user.userId,
            activity: req.body.activityId
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        console.error(err); // Log error details
        res.status(500).json({ error: 'Booking failed' });
    }
};


bookingCltr.myBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.userId }).populate('activity');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

export default bookingCltr;
