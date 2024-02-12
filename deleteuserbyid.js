const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./recruitmentmlsc2023-firebase-adminsdk-jibj4-0cff042ded.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// Function to read user UIDs from a JSON file and delete them recursively
async function readAndDeleteUserUIDs() {
    try {
        // Read user UIDs from the JSON file
        const userUIDs = JSON.parse(fs.readFileSync('user_uids.json', 'utf-8'));

        if (!Array.isArray(userUIDs)) {
            console.error('Invalid JSON file format. It should be an array of user UIDs.');
            return;
        }

        for (const uid of userUIDs) {
            await deleteUserByUID(uid);
        }
    } catch (error) {
        console.error('Error reading and deleting user UIDs:', error);
    }
}
// Function to delete users by UID
async function deleteUserByUID(uid) {
    try {
        await admin.auth().deleteUser(uid);
        console.log(`User with UID ${uid} has been deleted.`);
    } catch (error) {
        console.error(`Error deleting user with UID ${uid}:`, error);
    }
}
// Example usage:
// Uncomment and run this line to read user UIDs from the JSON file and delete them:
readAndDeleteUserUIDs();
