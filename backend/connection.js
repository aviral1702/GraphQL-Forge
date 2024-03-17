const mongoose = require('mongoose');
const url = 'mongodb+srv://aviral:1702@cluster0.i2jaaun.mongodb.net/';
mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database');
});

mongoose.exports = mongoose;