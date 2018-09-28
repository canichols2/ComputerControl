
console.log("We are in the setup");
//   var socket =  io.connect("//64.52.84.42:8080");
console.log("connecting to "+window.location.hostname + ":8888")
var socket = io.connect(window.location.hostname + ":8888",data=>{
   console.log("connected: ",data)
});
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

function confirmSleep(){
   var toastHTML = '<span>Put the computer to sleep?</span><button class="btn-flat toast-action" onclick="sleepComputer()" >Yes</button><button class="btn-flat toast-action" onclick="dismissToast()">No</button>';
   M.toast({html: toastHTML});
}
function dismissToast(){
   // Get toast DOM Element, get instance, then call dismiss function
  var toastElement = document.querySelector('.toast');
  var toastInstance = M.Toast.getInstance(toastElement);
  toastInstance.dismiss();
}

function sleepComputer(){
   var sleepComputer = true



   socket.emit("serverAction",{
      action:"sleep",
      options:{}
   },(data)=>{
      console.log(data)
      M.toast({html:'Computer is going to sleep: ' + data})
   })
}

function getAudioDevices(){
   console.log("Getting audio devices: Called")
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
      soundDevices = data
      var listDiv = document.getElementById("audioDevices")
      buildCollapsibleVolume(listDiv,data)
   })
}

function setVolume(deviceID,slider){
   var newVolume = slider.value
   return function(){
      socket.emit("serverAction",
      {
         action: "sound",
         options: {
            action:"Set Volume",
            device:deviceID,
            value:slider.value
         }
      },
      (data)=>{
         console.log(data)
         soundDevices = data
      })
   }
}
function setAudioPlaybackDevice(deviceID){
   return function(){
      socket.emit("serverAction",
      {
         action: "sound",
         options: {
            action:"Set Audio Device",
            value:deviceID
         }
      },
      (data)=>{
         console.log(data)
         getAudioDevices();
      })
   }
}

function buildCollapsibleVolume(parent,data){
   parent.innerHTML=""
   var outer = newElem(parent,"ul",["collapsible"])
   data.forEach(audioDevice => {
      console.log("Audio Device: ",audioDevice)
      var li = newElem(outer,'li')
      var header = newElem(li,'div',["collapsible-header"])
      var icon = newElem(header,'i',["material-icons"])
      if (audioDevice.Type == "Recording") icon.innerHTML += "mic"
      if (audioDevice.Type == "Playback") icon.innerHTML += "volume_up"
      header.innerHTML += audioDevice.Name

      var body = newElem(li,'div',["collapsible-body"])

      var things = newElem(body,'div',[])

      //set status
      var status = newElem(newElem(things,"div",["row"]),'button',["btn-small","right","flexRight"])
      status.addEventListener('click',setAudioPlaybackDevice(audioDevice.Index))
      if(audioDevice.Default)
      {
      var sliderOuter = newElem(newElem(things,"div",["row"]),'p',["range-field"])
      var slider = newElem(sliderOuter,'input',["range"])
      slider.setAttribute("min","0")
      slider.setAttribute("max","100")
      slider.setAttribute("type","range")
      slider.addEventListener('change',setVolume(audioDevice.Index,slider))
      M.Slider.init(slider,{
         indicators:true,
         height:5,
         duration:100
      })
         li.classList.add("active")
         status.innerHTML += "Default"
         ///TODO: GetSet Value
         socket.emit("serverAction",{action: "sound",options: {action:"Get Current Volume",}},
         (data)=>{
            console.log(data)
            slider.value = parseInt(data)
         })
         status.disabled=true
         slider.disabled=false
      }
      else{
         status.innerHTML += "Make Default"
         status.disabled=false
         // slider.disabled=true
      }
   });
   M.Collapsible.init(outer);
}


function newElem(parent, type, classList) {
   var elem = document.createElement(type)
   
   if (classList) {
       for (i in classList)
           elem.classList.add(classList[i])
   }
   parent.appendChild(elem);
   return elem;
}


// document.addEventListener('DOMContentLoaded', function() {
//    var elems = document.querySelectorAll('.sidenav');
//    var instances = M.Sidenav.init(elems, options);
//  });



//Init Things
getAudioDevices()