var shortid = require('shortid');
const connection = require('../dataHandle');
module.exports.index =  function(req, res) {
	let sql = 'SELECT productId, `productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` ORDER BY `quantityBought` DESC LIMIT 4'
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
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productName LIKE '+ q;
	connection.query(sql, function(error, result, field) {
		res.render('search', {
			searchProduct: result,
			title: title,
			search: req.query.txtSearch
		})
	})
}

module.exports.shopping = function(req,res) {
	var purchasedProducts =[];
	if (req.session.cart) {
		for (var t of req.session.cart) {
		purchasedProducts.push(t);
	}
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
	for (var t of req.session.cart) {
		query += "('"+ orderCode + "',"+ t.productId+','+ t.quantity+",'"+ t.buyPrice+"')," 
	}
	req.session.destroy(function(err) {
		if (err) throw err;
	})
	res.locals.session = 0;
	let sql_details = 'INSERT INTO `orderdetails`(`orderCode`, `productId`, `quantityOrdered`, `priceEach`) VALUES '+ query;
	sql_details = sql_details.substring(0,sql_details.length-1);
	connection.query(sql_details, function(error,result,field) {
		if (error) throw error;
	})
	res.render('success', {
		title: 'Mua hàng thành công!'
	})

}