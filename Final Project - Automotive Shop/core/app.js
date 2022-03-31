//packages
require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
app.use(express.json())
//routes
const userRoutes = require('../routes/user.routes')
const carRoutes = require('../routes/car.routes')
app.use('/user', userRoutes)
app.use('/car', carRoutes)
app.get('*', (req, res) => res.status(404).send({
    apiStatus: false,
    message:'incorrect route'
}))
//dirs
const staticsDir = path.join('../statics')
app.use(express.static(staticsDir))
//connection
require('../db/connection')
module.exports = app
