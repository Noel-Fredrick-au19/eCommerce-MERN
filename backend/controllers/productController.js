import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


/**
 * Routes to GET Product API
 * @desc Fetch all product
 * @desc Get /api/product
 * @access Public
 * 
 */

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})




/**
    Routes to GET Product woth params and particular ID
    @desc Fetch Single product
    @desc Get /api/products/:id
    @access Public
 */

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export {getProducts, getProductById}