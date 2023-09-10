const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan')
const cors = require('cors');
const connectDB = require('./config/DB.JS');

// Dotenv
dotenv.config();

// monogdb connection
connectDB();

// rest object
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
// 1 test routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));

// port 
const PORT = process.env.PORT || 8080

// listen

app.listen(PORT, () => {
    console.log(`Node server running In ${process.env.DEV_NODE} Mode On Port ${process.env.PORT}`.bgCyan.white);
})