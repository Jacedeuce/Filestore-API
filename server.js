const express = require('express')
const bp = require("body-parser")

var app = express()

app.use(bp.text())
app.use(bp.urlencoded({extended:true}))
// app.use(express.static( __dirname +  '/public/dist/public' ));

require('./routes')(app)

app.listen(8000, (err)=>{
    if (err){
        console.log(err)
    } else {
        console.log("listening on port 8000...")
    }
})