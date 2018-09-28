var cp = require('child_process')
var EventLogger = require('node-windows').EventLogger;
var PS = require('node-powershell');
let log = new EventLogger('ComputerActions')

function PutComputerToSleep(options) {
	return new Promise((resolve, reject) => {
		// cp.exec()
		var sleeping = cp.exec("rundll32.exe powrprof.dll, SetSuspendState 0,1,0")
		console.log("Going to sleep")
		resolve("Going to sleep")
	})
}

function handleVolumeOptions(options) {
	return new Promise((resolve, reject) => {
		//Run powershell commands...
		///Need to parse text returned???

		let ps = new PS({
			executionPolicy: 'Bypass',
			noProfile: true
      })
      console.log("adding \"Importing module\" command")
		ps.addCommand("Import-Module ./dist/AudioDeviceCmdlets.dll")
      console.log("added \"Importing module\" command")
      if(options)
			switch (options.action) {
				case "Get Audio Devices":
            console.log("adding \"Get-AudioDevice -List\" command")
					ps.addCommand("Get-AudioDevice -List | ConvertTo-Json")
               console.log("added \"Get-AudioDevice -List\" command")
					break;
				case "Get Current Volume":
					ps.addCommand("Get-AudioDevice -PlaybackVolume  | ConvertTo-Json")
					break;
				case "Set Volume":
					ps.addCommand(`Set-AudioDevice -PlaybackVolume ${options.value}  | ConvertTo-Json`)
					break;
				case "Set Audio Device":
					let option;
					if(isNaN(options.value)) option = "ID"; else option = "Index";
					
					ps.addCommand(`Set-AudioDevice -${option} ${options.value}` + " | ConvertTo-Json")
					break;

				default:
					ps.addCommand('dir  | ConvertTo-Json')
					break;
			}
      console.log("about to invoke the commands")
		ps.invoke().then(output => {
         console.log(output)
			resolve(JSON.parse(output))
		}).catch(err => {
			reject(err)
		})
	});
}

function handleServiceOptions(options) {
	return new Promise((resolve, reject) => {
		//Run node-windows options.
	});
}
// function PutComputerToSleep(options){}
// function PutComputerToSleep(options){}
// function PutComputerToSleep(options){}


module.exports.run = function (data) {
	return new Promise((resolve, reject) => {
		switch (data.action) {
			case "sleep":
				PutComputerToSleep(data.options)
					.then(resolve)
					.catch(reject)
				break;

			case "sound":
				handleVolumeOptions(data.options)
					.then(resolve)
					.catch(reject)
				break;

			case "service":
				break;

			default:
				reject("Server action doesn't exist")
				break;
		}
	})
}