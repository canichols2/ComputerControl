
const PORT = 8888
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
   // socket.on('ServerAction' ,(Data)=>{
   //    console.log("ServerAction")
   //    switch (Data.action) {
   //       case "start":
   //          console.log("start")
   //          MC.startServer(data.server)
   //          break;
   //       case "stop":
   //          console.log("stop")
   //          MC.stopServer(data.server)
   //          break;
   //       case "create":
   //          console.log("create:",Data.server)
   //          MC.newServer(Data.server)
   //          .catch((err)=>{
   //             console.log("Catch:",err)
   //             serversDB.find({},(err,docs)=>{
   //                console.log("FindServer response: in app.js:",docs)
   //             })
   //          })
   //          break;
   //       case "remove":
   //          console.log("remove")
   //          MC.deleteServer(data.server)
   //          break;
      
   //       default:
   //          socket.emit("message", `The action: ${Data.action} is not a valid action.`)
   //          break;
   //    }
   // })
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