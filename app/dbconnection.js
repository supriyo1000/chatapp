import mysql from 'mysql2/promise';  // Use promise API of mysql2

// Async function to establish the connection
const dbconnection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'chatapp',
    user: 'root',
    password: 'qtest123'
});

export default dbconnection;
