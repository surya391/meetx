import User from '../models/user-model.js'
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userCltr = {}

userCltr.register = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const { name, email, password, phoneNumber } = req.body
    try {
        const user = new User({ name, email , password , phoneNumber})
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(password,salt)
        user.password = hash
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'something went wrong..'})
    }
}

userCltr.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({ errors:"invalid email or password"})
        }
        const verified = await bcryptjs.compare(password, user.password)
        if(!verified){
            return res.status(404).json({ errors: 'invalid email or password'})
        }
        const tokenData = { userId: user._id}
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:'10d'})
        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error:'something went wrong..'})
    }
}

userCltr.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        // console.log(user)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong..' })
    }
}

export default userCltr