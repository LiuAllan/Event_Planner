const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

// Private ENV
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Connect to DB
connectDB();

const app = express();

//Sessions
app.use(session({
	secret: 'cat',
	resave: false,
	saveUninitialized: false,
	// store: new MongoStore({ mongooseConnection: mongoose.connection }) // Storing user session on refresh
}))

// Middleware
app.use(express.json({ extended: true }));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Router
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/guests', require('./routes/guests'));

// Serve static assests if in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));