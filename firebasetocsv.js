const fs = require('fs');
const autha = require("firebase/auth");
const fire = require("firebase/firestore")
const { db, auth , app } = require('./firebaseconfig');

async function exportTeamsToCSV(filePath) {
    try {
        const teamsRef = fire.collection(db, 'teams');
        const teamsSnapshot = await fire.getDocs(teamsRef);

        let csvContent = 'Name,Eliminate,Points1,Points2,Points3,Remarks,TeamOutside\n';

        teamsSnapshot.forEach((doc) => {
            const teamData = doc.data();
            const row = `${teamData.Name},${teamData.Eliminate},${teamData.Points1},${teamData.Points2},${teamData.Points3},"${teamData.Remarks}",${teamData.TeamOutside},${teamData.Updated}\n`;
            csvContent += row;
        });

        fs.writeFileSync(filePath, csvContent, 'utf-8');
        console.log('CSV file exported successfully.');
    } catch (error) {
        console.error('Error exporting teams to CSV:', error);
    }
}

// Replace 'teams.csv' with the desired file path
const filePath = 'teams.csv';

// Call the function to export teams to CSV
exportTeamsToCSV(filePath);
