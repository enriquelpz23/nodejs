const mysql = require("mysql2");


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "nq7bCMJq3LmzZx"

});

module.exports = pool.promise();