const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const { connectToDatabase } = require('./db');
const morgan = require('morgan');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/api', routes);

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
