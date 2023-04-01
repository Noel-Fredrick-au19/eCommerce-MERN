import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userController.js'


/**
 * Routes to POST authUser for Login
 */
router.post('/login', authUser)



export default router