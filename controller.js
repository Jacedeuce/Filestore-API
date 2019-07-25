const Models = require("./models")


//https://blog.fullstacktraining.com/res-json-vs-res-send-vs-res-end-in-express/

module.exports = {
    index : (req, res) => {
        Models.File.find({}, function(err, files) {
            if (err) {
                console.log(err)
            } else {
                res.json({"files" : files})
            }
        })
    },
    create : (req, res) => {
        console.log(req.body)
        Models.counters.findOneAndUpdate(
            {_id: "fileid"},
            {$inc:{sequence_value:1}},
            {new:true},
            function(err, count) {
                if (err) {
                    console.log("error")
                } else {
                    counter = count.sequence_value
                    Models.File.create({"file_id" : counter,
                            "uploader" : req.header('Uploader'),
                            "size" : req.body.length,  //https://stackoverflow.com/questions/39211596/how-to-convert-req-body-to-string
                            "file" : req.body}, function(err, file) {
                        if (err) {
                            console.log(err)
                            res.json({"error" : "File not created"})
                        } else {
                            res.json({"file_id" : file.file_id})
                        }
                    })
                }
            }
        )
    },
    show : (req, res) => {
        Models.File.findOne({"file_id" : req.params.id}, function(err, file) {
            if (err) {
                res.status(404)
                res.json({"error" : "File not found"})
            } else if (file === null){
                res.status(404)
                res.json({"error" : "File not found"})
            } else {
                res.set('Content-Type', 'text/plain')
                res.send(file.file)
            }
        })
    },
    stat : (req, res) => {
        Models.File.findOne({"file_id" : req.params.id}, function(err, file) {
            if (err) {
                res.json({"error" : "File not found"})
            } else {
                res.json({"Uploader" : file.uploader,
                            "Upload date" : file.createdAt,
                            "Size" : file.size})
            }
        })
    },
    delete : (req, res) => {
        Models.File.findOneAndDelete({"file_id" : req.params.id}, function(err, file){
            if (err) {
                res.json({"error" : "File not found"})
            } else {
                res.status(200).end()
            }
        })
    },
    stats : (req, res) => {
        Models.File.find({}, function(err, files) {
            if (err) {
                res.status(404).end()
            } else {
                var num_files = 0
                var total_size = 0
                for (let file of files){
                    num_files++
                    total_size += file.size

                }
                res.json({"num_files" : num_files, "total_size" : total_size})
            }
        })
    }
}
