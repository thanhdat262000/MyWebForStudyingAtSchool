//console.log(process.env);
require('dotenv').config();
const express = require('express');
const connection = require('./dataHandle');
var shortid = require('shortid');
var bodyParser = require('body-parser');
var userRoute = require('./router/users-route')
var cartRoute = require('./router/cart.route')
var productRoute = require('./router/product.route')
var cookieParser = require('cookie-parser')
var sessionMiddleware = require('./middlewares/session.middleware')
var session = require('express-session');
var mySqlStore = require('express-mysql-session')(session);
var sessionStore = new mySqlStore({},connection);
const app = express();
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(sessionMiddleware);
app.use(session({
	secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 180*60*1000}
}));
app.use(function(req,res,next) {
	res.locals.session = req.session;
	next();
})
const port = process.env.PORT ||3000;
connection.connect((err)=>{
	if (err) throw err;
	console.log('Connecting MySql...' );
})
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.listen(port, () => console.log('Example app listening at http://localhost' + port));
//signed cookie: thêm 1 cái signature riêng biệt cho từng cookie
//pagination