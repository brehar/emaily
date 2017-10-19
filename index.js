const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

mongoose.Promise = global.Promise;

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useMongoClient: true }, () => {
	console.log('Successfully connected to the database...');
});

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Express server listening on port ${PORT}...`);
});
