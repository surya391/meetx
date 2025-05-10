import express from 'express'
import dotenv from 'dotenv'
import { checkSchema } from 'express-validator'

import configureDB from './config/db.js'
import { userRegisterSchema, userLoginSchema } from './app/validators/user-validation-schema.js'
import userCltr from './app/controller/user-cltr.js'
import authenticationUser from './app/middlewares/authentication.js'

import activityCltr from './app/controller/activity-cltr.js'
import bookingCltr from './app/controller/booking-cltr.js';
const port = 3000
dotenv.config()

const app = express()
app.use(express.json())

app.post('/register', checkSchema(userRegisterSchema), userCltr.register)
app.post('/login', checkSchema(userLoginSchema), userCltr.login)
app.get('/profile',authenticationUser,userCltr.profile)

app.post('/activities', authenticationUser, activityCltr.create); 
app.get('/', activityCltr.list);

app.post('/book', authenticationUser, bookingCltr.create);
app.get('/my-bookings', authenticationUser, bookingCltr.myBookings);

app.listen(port, ()=>{
    console.log('server is running on the port ', port)
    configureDB()
})