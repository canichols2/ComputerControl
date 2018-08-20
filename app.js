const PORT = 8888
var  express = require("./singleton").express,
     app = require("./singleton").app,
     http = require("./singleton").http,
     server = require("./singleton").server,
     io = require("./singleton").io,
   //   request = require("./singleton").request,
   //   cheerio = require("./singleton").cheerio,
     fs = require("./singleton").fs
var serverActions = require('./computerActions')
var M = require('./model')

// app.use('/css/ETC.js', express.static('node_modules/'))

io.listen(server).on('connection',(socket)=>{
   socket.on('serverAction',(data)=>{
      console.log("called serverAction:",data)
      serverActions.run(data,callback)
         .then(callback)
         .catch((err)=>{
            socket.emit('err',err)
         })
   })
})
app.use(express.static('client'))
//Use materialize css files from node_modules directory
app.use('/materialize',express.static('./node_modules/materialize-css/dist'))

console.log("Listening for a connection...");
console.log("Access Web GUI at http://127.0.0.1:"+PORT);
server.listen(PORT)