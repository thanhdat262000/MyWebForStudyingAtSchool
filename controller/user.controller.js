var shortid = require('shortid');
const connection = require('../dataHandle');
module.exports.index =  function(req, res) {
	let sql = 'SELECT `productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` ORDER BY `quantityBought` DESC LIMIT 4'
	connection.query(sql, function(error, result, field) {
		res.render('index', {
			bestSellerProduct: result,
			title: "Trang chủ"
		})
	})
}
module.exports.search= function(req, res) {
	var q = "'%"+req.query.txtSearch +"%'";
	var title = "Searching for "+ req.query.txtSearch;
	let sql = 'SELECT `productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productName LIKE '+ q;
	connection.query(sql, function(error, result, field) {
		res.render('search', {
			searchProduct: result,
			title: title
		})
	})
}
// module.exports.shopping = function(req,res) {
// 	var id = req.signedCookies.sessionId;
// 	let sql = 'SELECT productId, quantityOrdered FROM orders WHERE customerId =? AND status = "pending"';
// 	connection.query(sql,[id], function(error,result,field ) {
// 		var purchasedProducts = [];
// 		for (var i=0;i<result.length;i++) {
// 			purchasedProducts.push(result[i].productId);
// 		}
// 		var range = '(' + purchasedProducts.toString() + ')';
// 		let sql_select = 'SELECT * FROM products WHERE productId IN' + range;
// 		connection.query(sql_select, function(error1,result2,field3) {
// 			for (var i=0;i<result.length;i++) {
// 				for (var j=0; j < result2.length;j++) {
// 					if (result[i].productId == result2[j].productId) {
// 						result2[j].quantityOrdered = result[i].quantityOrdered;
// 					}
// 				}
// 			}
// 			res.render('shopping',{
// 			purchasedProducts: result2,
// 			title: "Đơn hàng"
// 		})
// 		})
// })
// }
module.exports.shopping = function(req,res) {
	var purchasedProducts =[];
	for (var t in req.session.cart) {
		purchasedProducts.push(req.session.cart[t]);
	}
	res.render('shopping', {
		purchasedProducts: purchasedProducts,
		title: "Đơn hàng"
	})
}
module.exports.postSuccess = function(req,res) {
	var id = req.signedCookies.sessionId;
	var orderCode = shortid.generate();
	var name = req.body.txtName;
	var phone= req.body.txtPhone;
	var address = req.body.txtAddress;
	let sql = 'UPDATE customers SET customerName =?, phone =?, address =? WHERE customerId =?';
	connection.query(sql, [name, phone, address, id], function(error, result, field) {
			if (error) throw error;
	 })
	let sql_2 = 'INSERT INTO orders SET status = "ordered", customerId = ?, orderCode = ?, orderDate = NOW()';
	connection.query(sql_2, [id, orderCode], function(error, result, field) {
		if (error) throw error;
	})
	var query = '';
	for (var t in req.session.cart) {
		query += "('"+ orderCode + "',"+ t+','+ req.session.cart[t].quantity+",'"+ req.session.cart[t].buyPrice+"')," 
	}
	let sql_details = 'INSERT INTO `orderdetails`(`orderCode`, `productId`, `quantityOrdered`, `priceEach`) VALUES '+ query;
	sql_details = sql_details.substring(0,sql_details.length-1);
	console.log(sql_details);
	connection.query(sql_details, function(error,result,field) {
		req.session.destroy(function(err) {
			if (err) throw err;
		})
		res.render('success', {
			title: 'Mua hàng thành công!'
		})
	})
	// var orderCode = shortid.generate();
	// let sql_2 = 'INSERT INTO orders SET orderCode = ?, orderDate = NOW(), customerId = ?, status =?';
	// connection.query(sql_2, [orderCode,id, 'ordered'],function(error,result,field) {
	// 	if (error) throw error;
	// })
	
	// let sql_3 = 'INSERT INTO orderdetails SET orderCode =?, p'
	
}
// module.exports.create = function(req, res) {
// 	res.render('users/create');
// }
// module.exports.postCreate = function(req,res) {
// 	req.body.id = shortid.generate();
// 	req.body.avatar = req.file.path.split('/').slice(1).join('/');
// 	res.redirect('/users');
// }