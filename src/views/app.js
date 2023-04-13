// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('/Users/stanhassett/healthychat/src/views/auth.js');
const chat = require('/Users/stanhassett/healthychat/public/js/chat.js');

// Create an instance of the express application
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory to the views folder
app.set('views', __dirname + '/views');

// Set up middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up middleware for session management
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up passport authentication strategy
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    auth.authenticate
));

// Serialize and deserialize user
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

// Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    chat.login
);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Start the server
const server = app.listen(3000, () => {
    console.log('Server started on port 3000');
});