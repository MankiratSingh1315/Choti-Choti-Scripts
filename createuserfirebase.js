const fs = require('fs');
const autha = require( "firebase/auth");
const { db, auth, app } = require( './firebaseconfig');
// Replace 'your-file-path.csv' with the actual path to your CSV file
const filePath = 'user8.csv';

async function readCSVFile(filePath) {
    // try {
        const csvData = fs.readFileSync(filePath, 'utf-8');
        const rows = csvData.split('\n');
        let i=rows.length;
        let j=0;
    rows.forEach(async (row,i) => {
        // for(let j=0;j<i;j++){
        //    const tmout = setInterval(() => {
            const obj = row.split("\t");
            // Process each row as needed
            console.log(obj[1],obj[5] );
            console.log(obj);
            console.log('hi');
            try {
                autha.createUserWithEmailAndPassword(auth,obj[2] , 'incorrect').then((userCredential) => 
                {
                    // Signed up 
                    console.log('done');
                    const user = userCredential.user;
                    // ...
                }).catch((error) => {
                    console.log(error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
            }
                catch (error) { 
                    console.log(error);
                }
                j=j+1;
            // }            , 3000)
    })
        }
    // } 
    // catch (error) {
    //     console.error('Error reading the CSV file:', error);
    // }
// }

// try{
// await createUserWithEmailAndPassword(auth, obj.email, passss).then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
// }).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
// });}
// catch (error) { console.log(error) }
// Call the function to read the CSV file
readCSVFile(filePath);
// var array = [1, 2, 3, 4, 5]
// let i=0;
//     setInterval(() => {
//         i=i+1;
//         console.log(array[i]);
//     }, 1000);