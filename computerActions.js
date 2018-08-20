var cp = require('child_process')  
function PutComputerToSleep(options){
   return new Promise((resolve, reject) => {
      // cp.exec()
      var sleeping = cp.exec("rundll32.exe powrprof.dll, SetSuspendState 0,1,0")
      console.log("Going to sleep")
      resolve("Going to sleep")
   })
}
// function PutComputerToSleep(options){}
// function PutComputerToSleep(options){}
// function PutComputerToSleep(options){}
// function PutComputerToSleep(options){}


module.exports.run = function(data){
   return new Promise((resolve, reject) => {
      switch (data.action) {
         case "sleep":
            PutComputerToSleep(data.options)
            .then(resolve)
            .catch(reject)
            break;
      
         default:
            reject("Server action doesn't exist")
            break;
      }
   })
}