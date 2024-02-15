require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const { connectDB } = require('./config/dbConfig');
const PORT = process.env.PORT || 5500;

app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
// routing
app.use('/employees', require('./routes/employee'));
app.use('/upload', require('./routes/uploadFiles'));

connectDB().then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});