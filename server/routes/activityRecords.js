const express = require('express');
const router = express.Router();
const data = require('../data'); // mock data
const ActivityRecordModel = require('../models/RecordModel');

router.use('/:recordId', async (req, res, next) => {
    const activityRecord = await ActivityRecordModel.findOne({id: req.params.recordId})

    if(!activityRecord) {
        return res.status(404).send('Record not found!!')
    }
    req.activityRecord = activityRecord;
    return next();

})

router.use('/', async (req, res, next) => {
    const userRecords = await ActivityRecordModel.find({})
    req.userRecords = userRecords; 
    return next()
})

// get all of activities
router.get('/', (req, res, next) => {
    return res.status(200).send(req.userRecords)
})

// get activity by id
router.get('/:recordId', (req, res, next) =>{
    return res.status(200).send(req.activityRecord)
})

// create activity record
router.post('/', async (req, res, next) => {
    const body = req.body;

    if (req.userRecords.length > 0) {
        body.id = req.userRecords[req.userRecords.length - 1].id + 1
    } else {
        body.id = 1;
    }

    const createRecord = new ActivityRecordModel({
        ...body,
    })
    
    await createRecord.save();
    return res.status(201).send(createRecord);
})

//updating record
router.put('/:recordId', async (req, res, next) => {
    const body = req.body;

    // console.log(updateRecord)
    const updatedRecord = await ActivityRecordModel.updateOne(req.activityRecord, body);
    return res.status(201).send(updatedRecord);
})

// delete record
router.delete('/:recordId', async (req, res, next) => {
    // console.log(req.activityRecord)
    const deletedRecord = await ActivityRecordModel.deleteOne(req.activityRecord)
    return res.status(200).send(deletedRecord);
})

module.exports = router;