var Service = require('node-windows').Service;
var startScript = __dirname+'/app.js'
// Create a new service object
var svc = new Service({
  name:'Computer Control',
  description: 'The nodejs.org example web server.',
  script: startScript,
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});


// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
   svc.start();
 });


svc.on('uninstall',function(){
   //Do Something...
});

svc.on('alreadyuninstalled',function(){
   //Do Something
});



process.argv.forEach(arg => {
   console.log("Property:",arg)
   if(arg[0] == '-')
   switch (arg) {
      case "-install":
         console.log("installing")
         svc.install();
         break;
      case "-uninstall":
         console.log("uninstalling")
         svc.uninstall();
         break;
      case "-start":
         console.log("starting")
         svc.start();
         break;
      case "-stop":
         console.log("Stopping")
         svc.stop();
         break;
      case "-script":
         //NOT YET IMPLEMENTED
         conosle.log("Will at one point let you rename/repoint the executable.")

      default:
      console.log("NOTHING")
         break;
   }
});