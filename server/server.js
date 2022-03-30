const express = require('express');
const activities = require('./data');
const app = express();

//For using req.body that recieved from client
app.use(express.json());

//CRY
app.param('id', (req, res, next, value) => {
    const activityId = Number(value);
    const activityIndex = activities.findIndex(activity => {
        return activity.id === activityId;
    })
    if (activities[activityIndex]) {
        req.activityIndex = activityIndex;
        next();
    } else {
        res.status(404).send(`Not found activity`)
    }
});

app.use('/activities/update', (req, res, next) => {
    const updatedActivity = req.body;
    const activityIndex = activities.findIndex(activity => {
        return activity.id === updatedActivity.id;
    })
    if (activities[activityIndex]) {
        activities[activityIndex] = updatedActivity;
        next();
    } else {
        res.status(404).send(`Not found activity`);
    }
});

// Get all activities
app.get('/activities', (req, res) => {
    res.send(activities);
});

//Get activity by id
app.get('/activities/:id', (req, res) => {
    res.send(activities[req.activityIndex])
});

//Creating activity
app.post('/activities/create', (req, res) => {
    const createdActivity = req.body;
    createdActivity.id = activities[activities.length - 1].id + 1
    activities.push(createdActivity);
    res.send(activities);
});

//Updating activity
app.put('/activities/update', (req, res) => {
    res.send(activities);
});


// Deleting acticity
app.delete('/activities/:id/remove', (req, res) => {
    activities.splice(req.activityIndex, 1);
    res.send(activities);
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});