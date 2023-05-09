const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/todo', require('./routes/createTodo'));
app.use('/todos', require('./routes/todoOthers'));


// Error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
