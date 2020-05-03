var mysql = require('mysql');
const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PW,
	database: process.env.DB,
	port :'3306'

})
module.exports = connection;