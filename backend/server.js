import express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()


app.use(express.json())

//api Get Request from HOME
app.get('/', (req, res) => {
    res.send("API Running check....")
})

//api Get Request from ProductRoutes
app.use('/api/products', productRoutes)


//api POST Request from authUser LOGIN
app.use('/api/users', userRoutes)


/**
 * Middleware for URL
 * Error Message
 */

app.use(notFound)

/**
 * MIDDLEWARE FOR ERROR HANDLING
 */
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} MODE on port ${PORT}`.yellow.bold))