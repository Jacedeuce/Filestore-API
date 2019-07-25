const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/filestore_api_db', {useNewUrlParser : true})

mongoose.set('useFindAndModify', false)

var CountersSchema = new mongoose.Schema({
    _id : {type: String},
    sequence_value: {type: Number, default : 0}
})

var FileSchema = new mongoose.Schema({
    uploader: {type: String, required: true},
    file: {type: String, required: true},
    size: {type: Number, required: true},
    file_id: {type: Number, required: true}  //https://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence

}, {timestamps: true})

counter = mongoose.model('counters', CountersSchema)
counter.findOneAndUpdate({_id:"fileid"}, {_id:"fileid"}, {upsert : true, new : true}, function(err, counter) {
    if(err){
        console.log("Couldn't set counters")
        console.log(err)
    }else {
        console.log("counter created")
        console.log(counter.sequence_value)
    }
})



module.exports = {
    "File" : mongoose.model('File', FileSchema),
    "counters" : counter,
}