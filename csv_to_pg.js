const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');
const moment = require('moment');

// PostgreSQL Pool configuration
const pool = new Pool({
    database: 'some',
    host: 'something',
    user: 'somesome',
    port: 6543,
    password : 'sim sim' 
});

// Function to insert data into the Users table
const insertIntoUsers = async (name, email) => {
    const query = `
        INSERT INTO production.Users (name, email) 
        VALUES ($1, $2)
        RETURNING id;
    `;
    const values = [name, email];
    const res = await pool.query(query, values);
    return res.rows[0].id;
};

// Function to insert data into the UserDetails table
const insertIntoUserDetails = async (userId, accountType, bio, dateOfBirth, name, phoneNumber) => {
    const query = `
        INSERT INTO production.UserDetails (userid, accountType, bio, dateOfBirth, name, phoneNumber)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [userId, accountType, bio, dateOfBirth, name, phoneNumber];
    await pool.query(query, values);
};

// Function to parse the date
const parseDate = (dateStr) => {
    return moment(dateStr, 'MMM DD, YYYY hh:mm a').format('YYYY-MM-DD');
};

// Function to process CSV data
const processCSV = () => {
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', async (row) => {
            try {
                // Split full name into first and last names
                // const [firstName, ...lastNameParts] = row.Name.split(' ').reverse();
                // const lastName = lastNameParts.reverse().join(' ');

                const userId = await insertIntoUsers(row.Name, row.email);
                const parsedDateOfBirth = row.date_of_birth ? parseDate(row.date_of_birth) : null;

                await insertIntoUserDetails(
                    userId,
                    row['Account-Type'].toLowerCase() || 'client', // Default to 'client' if not provided
                    row.Bio || null,
                    parsedDateOfBirth,
                    `${row.Name} ${row.Lastname}`,
                    row.phone_number || null
                );
                console.log(`Inserted data for user: ${row.Name}`);
            } catch (error) {
                console.error('Error inserting data:', error);
            }
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            // pool.end();
        });
};

processCSV();
