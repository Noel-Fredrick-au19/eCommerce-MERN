import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

/**
 * Routes to GET Product API
 * @desc Fetch all product
 * @desc Get /api/product
 * @access Public
 * 
 */
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))



/**
    Routes to GET Product woth params and particular ID
    @desc Fetch Single product
    @desc Get /api/products/:id
    @access Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))


export default router