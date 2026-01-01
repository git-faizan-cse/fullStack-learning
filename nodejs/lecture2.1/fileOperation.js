
const fs = require('fs');

// Reading from a file

// console.log('Starting to Read File...');
// fs.readFileSync('data.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error("Error reading file:", err);
//         return;
//     }
//     console.log("File content:", data);
//     console.log('Finished Reading File.');
// });

// const buffer = fs.readFileSync('data.txt');
// console.log('Data in buffer form: ', buffer);
// const orgData = buffer.toString();
// console.log('Data in org form: ', orgData);
// console.log('Finished Reading File.');

// Write file 
// try {
// fs.writeFileSync('data2.txt', '\nThis is new data being added to the file. \n Name: John Doe, Age; 40, Position: Manager');

// } catch (err) {
//     console.error("Error writing file:", err);
// }   

// fs.readFile('data2.txt', 'utf8', (err,data) => {
//     if(err) {
//         console.error("Error reading file:", err);
//         return;
//     }

//     console.log('Data in file is: ', data);
//     console.log('Finished Reading File.');
    
// });


// console.log('This is another opeation being performed ');
// Writing to a file

// fs.appendFileSync('data2.txt', '\nThis is new data being appended to the file. \n Name: Jane Doe, Age; 30, Position: Developer');
// console.log('Data appended to file successfully.');

// fs.readFile('data2.txt', 'utf8', (err,data) => {
//     if(err) {
//         console.error("Error reading file:", err);
//         return;
//     }  
//     console.log('Data in file is: ', data);
//     console.log('Finished Reading File.');      
// });
try {
fs.unlinkSync('data2.txt');
} catch (err) {
    console.log("Error deleting file:",err);
}

console.log('File deleted successfully.');

