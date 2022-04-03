const express = require('express');
const router = express.Router();
const activitiesData = require('../data')
const activityRecords = require('./activityRecords')

// assuming userId
const userId = 'OxWytz08py';

// Don't repeat yourself
router.use((req, res, next) => {
    const userIndex = activitiesData.findIndex(user => user.userId === userId)
    const userInfo = activitiesData[userIndex]

    if (!userInfo) {
        return res.status(404).send("User cannot found!")
    }
    
    req.userInfo = userInfo
    return next();
})

// defined router user record activities path
router.use('/me/record', activityRecords);


// CRUD
router.post('/login', (req, res, next) => {
});

router.post('/register', (req, res, next) => {});

router.get('/me', (req, res, next) => {
    return res.status(200).send(req.userInfo);
})

router.put('/me', (req, res, next) => {});


module.exports = router;