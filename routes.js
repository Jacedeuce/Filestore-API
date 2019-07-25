const controller = require("./controller")

module.exports = function(app){
    app.get('/file', controller.index)
    app.post('/file', controller.create)
    app.get('/file/:id', controller.show)
    app.get('/file/:id/stat', controller.stat)
    app.delete('/file/:id', controller.delete)
    app.get('/stat', controller.stats) // Typing into the nav bar and hitting enter or making the browser refresh will trigger the Express routes first and Angular routes second.
}