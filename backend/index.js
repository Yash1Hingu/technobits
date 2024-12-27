require('dotenv').config();
const express = require('express');
const cors = require('cors');
app = express();
port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/technobitblogs";
Note = require('./models/note/noteModel')

// Connnect mongoose instance
mongoose.connect(url).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing Routes
const noteRouter = require('./routes/note/noteRoutes');

// Register Routes
app.use('/api', noteRouter);

app.get('*', (req,res) => {
    res.status(404).send({ url: req.originalUrl + 'not found' });
})


app.listen(port, () => {
    console.log('API server started on: ' + port);
});
