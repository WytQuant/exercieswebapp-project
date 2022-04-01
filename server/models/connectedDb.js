const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
    {
        name: {type: String, minLength: [3, 'Activity name should contains at least 3 character']},
        description: { type: String },
        type: { type: String },
        duration: {type: Number, min: [0, 'Duration must be at least 0']},
        date: {type: String}
    }
);

const RecordModel = mongoose.model('')