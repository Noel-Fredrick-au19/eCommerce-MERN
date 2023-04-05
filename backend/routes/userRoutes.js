import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'



/**
 * Routes to POST authUser for Login
 */
router.post('/login', authUser)


/**
 * Routes to Get for Profile
 */
router.route('/profile').get(protect, getUserProfile)


/**
 * Routes to POST for adding and register new user
 * Route for PUT request as updateUserProfile
 */
router.route('/').post(registerUser).put(protect, updateUserProfile)



export default router