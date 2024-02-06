const fs = require('fs');
const autha = require("firebase/auth");
const fire = require("firebase/firestore")
const { db, auth, app } = require('./firebaseconfig');
// Replace 'your-file-path.csv' with the actual path to your CSV file
const filePath = 'qus.csv';

async function readCSVFile(filePath) {
    // try {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    const rows = csvData.split('\n');
    let i = rows.length;
    let j = 0;
    // rows.forEach(async (row, i) => {
        // for(let j=0;j<i;j++){

        const tmout = async () => {
            const obj = rows[0].split("\t");
            console.log(obj)
            // const obj = [
            //     'Anshu',
            //     'anshusaini522@gmail.com',
            //     '102306016',
            //     '4',
            //     'LP109',
            //     '11nAk76S71',
            //     '',
            //     '',
            //     '\r'
            // ]
            // Process each row as needed
            // console.log(obj[1], obj[5], obj[2].split('\r'));
            // console.log(obj);
            // console.log(obj);
            // console.log('hi');
            try {
                const newCityRef = fire.doc(db, `questions/${31 + i}`);

                await fire.setDoc(newCityRef, {
                    text: obj[0],
                    slot: parseInt(obj[5].split('\r')[0]),
                    options : {
                        a :obj[1],
                        b :obj[2],
                        c:obj[3],
                        d:obj[4]
                    },
                    qid : 30
                });
                console.log(obj);
}
            catch (error) {
                console.log(error);
            }

        }
        tmout();
    // })

}
// async function tempp (){
//     const obj = [
//         'Anshu',
//         'anshusaini522@gmail.com',
//         '102306016',
//         '4',
//         'LP109',
//         '11nAk76S71',
//         '',
//         '',
//         '\r'
//     ]
//     const newCityRef = fire.doc(db, `slotTest/${obj[2]}`);
//     console.log(obj);
//     await fire.setDoc(newCityRef, {
//         email: obj[1],
//         name: obj[0],
//         roll_number: obj[2],
//         slot: parseInt(obj[3]),
//         venue: obj[4]
//     });
// }
// tempp();
// } }
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