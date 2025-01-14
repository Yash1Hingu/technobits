require('dotenv').config();
const express = require('express');
const cors = require('cors');
app = express();
port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;
Note = require('./models/note/noteModel')

// Connnect mongoose instance
mongoose.connect(url).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
})

app.use(cors({
    origin: 'https://technobits.vercel.app',
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
