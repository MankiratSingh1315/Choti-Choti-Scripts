const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./recruitmentmlsc2023-firebase-adminsdk-jibj4-0cff042ded.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to list user UIDs and save them to a JSON file
async function listAndSaveUserUIDs() {
    try {
        const listUsersResult = await admin.auth().listUsers();

        const userUIDs = listUsersResult.users.map((user) => user.uid);

        // Save user UIDs to a JSON file
        fs.writeFileSync('user_uids.json', JSON.stringify(userUIDs, null, 2));

        console.log('User UIDs have been saved to user_uids.json');
    } catch (error) {
        console.error('Error listing and saving user UIDs:', error);
    }
}

// Function to delete users by UID
// async function deleteUserByUID(uid) {
//     try {
//         await admin.auth().deleteUser(uid);
//         console.log(`User with UID ${uid} has been deleted.`);
//     } catch (error) {
//         console.error(`Error deleting user with UID ${uid}:`, error);
//     }
// }

// Example usage:
// Uncomment and run this line to list user UIDs and save them to a JSON file:
listAndSaveUserUIDs();

// Uncomment and run this line to delete a user by UID (replace 'uidToDelete' with the actual UID):
// const uidToDelete = 'uidToDelete';
// deleteUserByUID(uidToDelete);
