
console.log("We are in the setup");
//   var socket =  io.connect("//64.52.84.42:8080");
console.log("connecting to "+window.location.hostname + ":8888")
var socket = io.connect(window.location.hostname + ":8888",data=>{
   console.log("connected: ",data)
});
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});
function sleepComputer(){
   socket.emit("serverAction",{
      action:"sleep",
      options:{}
   },(data)=>{
      console.log(data)
   })
}

function getAudioDevices(){
   socket.emit("serverAction",
   {
      action: "sound",
      options: {
         action:"Get Audio Devices",
         value:""
      }
   },
   (data)=>{
      console.log(data)
      var listDiv = document.getElementById("audioDevices")
      listDiv.innerHTML = data
   })
}




// document.addEventListener('DOMContentLoaded', function() {
//    var elems = document.querySelectorAll('.sidenav');
//    var instances = M.Sidenav.init(elems, options);
//  });