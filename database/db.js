import mysql from 'mysql';
import 'dotenv/config';

const connection =  mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DATABASE_PASSWORD,
    database : 'ani_weebs'
});

connection.connect(function(err) {
    if (err) {
        console.log("Datbase connection error", err);
    }
});

export default connection;