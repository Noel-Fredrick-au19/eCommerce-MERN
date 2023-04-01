import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


/**
 * Routes for AUTH & get TOKEN
 * @desc Auth User & get Token
 * @desc POST api/users/login
 * @access Public
 * 
 */

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // to find userEMAIL from database 
    const user = await User.findOne({ email: email})

    // TO check if the user exits
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:null
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

export { authUser }
