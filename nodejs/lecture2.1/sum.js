
// import readline module
const readline = require('readline');

// configure interface to connect with terminal/command line

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// read values from the terminal
interface.question("Enter first number: ", (num1) => {
    interface.question("Enter second number: ", (num2) => {
        // convert string inputs to numbers and calculate sum       
        const sum = Number(num1) + Number(num2);
        console.log(`The sum of ${num1} and ${num2} is ${sum}`);    
        // close the interface
        interface.close();
    });
});

// console.log("This will execute before the user inputs values.");

interface.question("Enter your name: ", (name) => {
    console.log(`Hello, ${name}!`);
    interface.close();
})
