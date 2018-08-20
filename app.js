
const PORT = process.env.PORT || 8888
var  express = require("./singleton").express,
     app = require("./singleton").app,
     http = require("./singleton").http,
     server = require("./singleton").server,
     io = require("./singleton").io
     
var computerActions = require('./computerActions')
var M = require('./model')

var serverSettings = [
   {key:"serversDir",value:"C:/opt/minecraft/"},
]

io.listen(server).on('connection',(socket)=>{
   console.log("Web Connected")
   socket.on('serverAction',(data,callback)=>{
      console.log("Socket Call: serverAction",data)
      computerActions.run(data,callback)
         .then(callback)
         .catch((err)=>{
            socket.emit('err',err)
         })
   })   
   socket.on('SettingsChange',(Data)=>{
      switch (Data.action) {
         case "start":
      
         default:
            socket.emit("message", `The action: ${Data.action} is not a valid action.`)
            break;
      }
})
   socket.on('AdminChange',()=>{})
   socket.on('blank',()=>{})
})
app.use(express.static('client'))
//Use materialize css files from node_modules directory
app.use('/materialize',express.static('./node_modules/materialize-css/dist'))

console.log("Listening for a connection...");
console.log("Access Web GUI at http://127.0.0.1:"+PORT);
server.listen(PORT)