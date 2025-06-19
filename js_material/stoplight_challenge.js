
/*
    Stoplight challenge

    Vehicle Types:
        private ( cars, trucks )
        public ( busses )
        emergency ( ambulance, fire )
        human ( bicycle )

    Lights:
        green
        yellow
        red
        white

    Specs:
        For white lights, only public and emergency vehicles can go.
        Public vehicles can go up to their max speed of 30mph through white lights. But must stop for any other lights.
        At yellow lights, private vehicles must slow to 20 and emergency vehicles must slow to 30.
        Other than emergency vehicles, all vehicles must stop at a red light.
        At green lights, allowed vehicles can maintain their speed.
        Emergency vehicles must slow to 20 at red lights.
        Human vehicles must stop at yellow and red lights.

    Process Builders -
        Plan before you build; pseudo code
        Refer to yours or some other source of working code that is similar.
        Build and test in small chunks
 */


// import the readline module for work with stdin, or stdout.
const readline = require('readline');

// create a readline object to work with the stream.
// pass the stdin, or stdout in the current process.
const prompts = readline.createInterface(process.stdin, process.stdout);

const vehicleType = 'private'; // private, public, emergency, human
const lightColor = 'green'; // green, yellow, red, white
let speed = 50; // current speed of the vehicle.


// create a question or there handler.
prompts.question(' enteer something : ', (response) => {

    

    // after all work is done want to terminate this process.
    process.exit();
});
