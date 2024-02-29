require('dotenv').config();
require('./models/associations');
const express = require('express');
const app = express();
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/dbConfig');
const PORT = process.env.PORT || 5500;

//credentials needed to be passed to cors. Always before cors
app.use(credentials);
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// middleware for cookies
app.use(cookieParser());
// routing
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use(verifyJWT);
app.use('/employees', require('./routes/employee'));
app.use('/', require('./routes/uploadFiles'));

connectDB().then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});