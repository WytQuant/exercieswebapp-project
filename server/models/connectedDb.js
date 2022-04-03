const mongoose = require('mongoose');

const run = async () => {
    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.wtaia.mongodb.net/sample_training?retryWrites=true&w=majority';
    await mongoose.connect(uri);

    const schema = mongoose.Schema({
        city: {},
        zip: String,
        loc:{type: { y: Number, x: Number }},
        pop: Number,
        state: {type: String, 
            minLength:[2, 'State must contains at least 2 character'],
            maxLength:[3, 'State must contains at most 3 character']
        }
    })

    const ZipModel = mongoose.model('Zip', schema, 'zips')

    // const zips = await ZipModel.find({});

    // console.log(zips[0])

    const newZip = new ZipModel({
        city: 'bang kok',
        zip: 10600,
        loc: {x: 100, y: 14},
        pop: 2000000,
        state: 'BKK48'
    });

    await newZip.save();
}

run()
.then(() => {
    console.log('Done');
    process.exit(0)
})
.catch((e) => {
    console.log(e);
    process.exit(1);
});