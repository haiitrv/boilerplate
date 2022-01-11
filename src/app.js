const express = require('express')
const createHttpError = require('http-errors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

// Initialize app
const app = express()
app.use(morgan('dev'))

// View Engines
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'resources', 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
const route = require('./app/routes/indexRoute')


// Routes initial
route(app)

// Error Handler
app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.status(error.status)
    res.render('error_page', { error })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))