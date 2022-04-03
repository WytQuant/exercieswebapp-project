const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/user')
const {uri} = require('./config')

app.use(express.json());

app.use('/user', router);

const PORT = process.env.PORT || 4001;


const boot = async () => {

    //start connented at mongo db
    await mongoose.connect(uri);

    //start express server
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
}

boot()