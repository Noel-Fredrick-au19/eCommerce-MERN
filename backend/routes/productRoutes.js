import express from 'express'
const router = express.Router()
import { getProductById, getProducts } from '../controllers/productController.js'


/**
 * Routes to GET Product API
 */
router.route('/').get(getProducts)




/**
 Routes to GET Product woth params and particular ID
 */
router.route('/:id').get(getProductById)



export default router