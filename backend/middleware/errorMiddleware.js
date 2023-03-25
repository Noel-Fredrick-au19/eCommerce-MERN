/**
 * Middleware for URL
 * Error Message
 */

const notFound = (req, res, next) => {
    const error = new Error(`Not Found = ${req.originalUrl}`)
    req.statusCode(404)
    next(error)
}



/**
 * MIDDLEWARE FOR ERROR HANDLING
 */

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'proudction' ? null : err.stack
    })
}


export {notFound, errorHandler}