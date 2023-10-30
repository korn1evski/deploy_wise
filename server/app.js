const express = require("express")
const app = express()
const path = require('path')
const http = require("http");

const server = http.createServer(app)


const _dirname = path.resolve(".")
console.log(_dirname)
const buildPath = path.join(_dirname, "../client/build")
console.log(buildPath)

app.use(express.static(buildPath))

app.get("/*", function(req, res){
    res.sendFile(
        _dirname + "/client/build/index.html",
        function (err){
            if(err){
                res.status(500).send(err);
            }
        }
    )
})

server.listen(5001 , () => console.log('Listening to port 5001'))