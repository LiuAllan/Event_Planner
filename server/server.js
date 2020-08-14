const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

const app = express();


// Middleware
app.use(express.json({ extended: true }));
// Router
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));