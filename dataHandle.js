var mysql = require('mysql');
const connection = mysql.createConnection({
	host: HOST,
	user: USER,
	password: PS,
	database: DB

})
module.exports = connection;