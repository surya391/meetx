import Activity from '../models/activity-model.js';

const activityCltr = {};


activityCltr.create = async (req, res) => {
    try {
      const { title, description, location, dateTime } = req.body;
  
      const activity = new Activity({
        title,
        description,
        location,
        dateTime
      });
  
      await activity.save();
      res.status(201).json(activity); // Return the created activity as a response
    } catch (err) {
      res.status(500).json({ error: 'Failed to create activity' });
    }
  };
  
activityCltr.list = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch activities' });
    }
};

export default activityCltr;
