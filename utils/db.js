import { timeStamp } from 'console';
import mysql from 'mysql2/promise';
import { type } from 'os';

// MySQL connection setup
const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'chatapp',
    user: 'root',
    password: 'qtest123'
});

// Find a user by email
export const getUserByEmail = async (email) => {
    try {
        console.log('Searching for email:', email);

        // Normalize email (convert to lowercase and trim spaces) before comparison
        const normalizedEmail = email.trim().toLowerCase();

        // Call the stored procedure to fetch the user by email
        const [result] = await connection.execute(
            'CALL signup_procedure(?,?, ?, ?, ?, ?, ?, ?, ?, ?)', // Correct the parameters being passed
            [3, null, normalizedEmail, '', '', null, null, '', '', {}] // Pass email for dbmode = 2
        );

        console.log('User found:', result);

        // Check if the result is empty, meaning no user was found
        if (result.length === 0) {
            return null; // No user found
        }

        return result[0]; // Return the first user from the result set
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error; // Rethrow the error to handle it where the function is called
    }
};


// Add a new user using the stored procedure
export const addUser = async (user) => {
    try {
        console.log('Adding new user:', user);

        const { email, name, password, created_at, phone, country, state, room } = user;

        // Execute the stored procedure (dbmode = 1 for inserting a new user)
        const [result] = await connection.execute(
            'CALL signup_procedure(?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [1, null, email, name, password, created_at, phone, country, state, room]
        );

        console.log('User added successfully:', result);
        return result; // Return the result from MySQL (e.g., insertId)
    } catch (error) {
        console.error('Error adding user:', error);
        throw error; // Rethrow the error
    }
};

// Remove a user by email (for logout or cleanup)
export const removeUserByEmail = async (email) => {
    try {
        console.log('Removing user with email:', email);

        // Normalize email (convert to lowercase and trim spaces) before comparison
        const normalizedEmail = email.trim().toLowerCase();

        // Delete the user from MySQL database
        const [result] = await connection.execute(
            'DELETE FROM users WHERE email = ?',
            [normalizedEmail]
        );

        console.log('User removed successfully:', result);
        return result; // Return the result (e.g., affectedRows)
    } catch (error) {
        console.error('Error removing user:', error);
        throw error; // Rethrow the error
    }
};

// Add a new user using the stored procedure
export const getUser = async (mode, mail, userid) => {

    try {
        if (mode === 1) {
            // Execute the stored procedure (dbmode = 1 for inserting a new user)
            const [result] = await connection.execute(
                'CALL signup_procedure(?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [2, null, '', '', '', null, null, '', '', {}]
            );
            console.log('User added successfully:', result);
            return result[0]
        }
        else if (mode === 2) {
            // Execute the stored procedure (dbmode = 1 for inserting a new user)
            const [result] = await connection.execute(
                'CALL signup_procedure(?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [3, null, mail, '', '', null, null, '', '', {}]
            );
            console.log('User added successfully:', result);
            return result
        }
        else if (mode === 3) {
            // Execute the stored procedure (dbmode = 1 for inserting a new user)
            const [result] = await connection.execute(
                'CALL signup_procedure(?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [4, userid, '', '', '', null, null, '', '', {}]
            );
            console.log('User added successfully:', result);
            return result
        }

    } catch (error) {
        console.error('Error adding user:', error);
        throw error; // Rethrow the error
    }
};

// export const getUser = async (mode, mail) => {
//     try {
//         if (mode === 1) {
//             // Fetch all users from the database
//             const [result] = await connection.execute('SELECT * FROM users');
//             return result; // Return the list of users
//         } else if (mode === 2) {
//             // Fetch user by email (assuming 'mail' is the email)
//             const [result] = await connection.execute(
//                 'SELECT * FROM users WHERE email = ?',
//                 [mail]
//             );
//             return result; // Return user details for the specified email
//         } else {
//             return [];
//         }
//     } catch (error) {
//         console.error('Error in getUser function:', error);
//         throw error;  // Rethrow the error to be caught in the calling function
//     }
// };


export const createGroup = async (mode, id, roomname, users) => {

    try {
        if (mode === 1) {
            const [result] = await connection.execute(
                'CALL createGroup(?,?,?,?,?)',
                [1, null, roomname, users,null]
            );
            // console.log('Group Created successfully:', result);
            return result[0]
        }
        else if (mode === 2) {
            const [result] = await connection.execute(
                'CALL createGroup(?,?,?,?,?)',
                [2, id, '', users,null]
            );
            // console.log('User Added successfully:', result);
            return result[0]
        }
    } catch (error) {
        console.error(error);
    }

}

export const addUserinChat = async (mode , userid, recipientId) => {

    console.log(userid, recipientId);

    try {
        if (mode === 1) {
            const [result] = await connection.execute(
                'CALL message_master(?,?,?,?,?,?)',
                [5, userid, recipientId, '', null, null]
            );
            console.log(`${recipientId} added in ${userid} successfully:`, result);
            return result[0]
        } else if (mode === 2) {
            const [result1] = await connection.execute(
                'CALL message_master(?,?,?,?,?,?)',
                [6, userid, null, '', null, null]
            );
            const [result2] = await connection.execute(
                'CALL createGroup(?,?,?,?,?)',
                [3, userid, '', null,null]
            );
            
            let result = [];
            let res1 = await result1[0]
            let res2 = await result2[0]

            for (let i = 0; i < res1.length; i++) {
                result.push({ id: res1[i].id, name: res1[i].username, email: res1[i].email, phone: res1[i].phone, country: res1[i].country, state: res1[i].state, profile_img: res1[i].profile_img , timeStamp: res1[i].timestamp, users:[] , type: 'list'})
            }

            for (let i = 0; i < res2.length; i++) {
                result.push({ id: res2[i].room_id, name: res2[i].room_name, email: '', phone: null, country: '', state: '', profile_img: '', timeStamp: res2[i].timestamp, users: res2[i].users, type: 'group' })
            }

            return result;
        }
        
    } catch (error) {
        console.error(error);
    }

}

export const ProfileUpdate = async (id , name, phone, password, image, state, country) => {
    const [result] = await connection.execute(
        'CALL signup_procedure(?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [5, id, image, name, password, null, phone, country, state, {}]
    );
    console.log('User Profile Update successfull:', result);
    return result[0]
}

export const addUserGroup = async (users, roomid) => {
    const [result] = await connection.execute(
        'CALL createGroup(?,?, ?, ?, ?)',
        [4, roomid, '', users, null]
    );
    const [result1] = await connection.execute(
        'CALL createGroup(?,?, ?, ?, ?)',
        [5, roomid, '', users, null]
    );
    console.log('User successfully Added in Group:', result);
    return result[0]
}