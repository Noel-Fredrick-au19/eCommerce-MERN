import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


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
    const user = await User.findOne({ email: email })

    // If the User Exits then to match the password
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

/**
 * Routes for Registering a new User
 * @desc New User register
 * @desc POST api/users
 * @access Public
 * 
 */

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // to find userEMAIL from database 
    const userExists = await User.findOne({ email: email })

    // If the User Exits then to match the password
    if (userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


/**
 * Routes for GET request for profile adding middleware for private access
 * @desc Get User Profile
 * @desc GET api/users/profile
 * @access Private
 * 
 */

const getUserProfile = asyncHandler(async (req, res) => {
    const user = user.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('user not found')
    }
})


/**
 * Routes for PUT request for Update user Profile
 * @desc Put for update Profile
 * @desc PUT api/users/profile
 * @access Private
 * 
 */

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = user.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
