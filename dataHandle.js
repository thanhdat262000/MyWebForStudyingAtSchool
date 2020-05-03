var mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'remotemysql.com',
	user: 'Fxt7yonmU1',
	password: '7uEywcuh7N',
	database: 'Fxt7yonmU1'

})
module.exports = connection;