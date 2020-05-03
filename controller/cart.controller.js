var shortid = require('shortid');
const connection = require('../dataHandle');
// module.exports.add=  function(req, res) {
// 	var productId = req.params.productId;
// 	var id = req.signedCookies.sessionId;
// 	var orderCode = shortid.generate();
// 	let sql = 'SELECT productId, quantityOrdered FROM orders WHERE productId =? AND status = "pending"';
// 	connection.query(sql,[productId], function(error,result,field) {
// 		if (result.length == 0) {
// 			let sql_insertOrder = 'INSERT INTO orders SET orderCode =?, orderDate = NOW(), customerId =?, productId =?, quantityOrdered= 1, status = "pending"'
// 			connection.query(sql_insertOrder, [orderCode, id, productId], function(error1, result1,field1) {
// 			if (error) throw error;
// 		})
// 			res.redirect('back');
// 		} else {
// 			var quantity = result[0].quantityOrdered;
// 			var quantityPlus = quantity + 1;
// 			let sql_updateOrder = 'UPDATE orders SET quantityOrdered= ? WHERE productId =? AND status = "pending"'
// 			connection.query(sql_updateOrder, [quantityPlus, productId], function(error2, result2,field2) {
// 			if (error) throw error;
// 		})
// 			res.redirect('back');
// 		}
// 	})
// }

module.exports.add = function(req, res) {
	var productId = req.params.productId;
	let sql = 'SELECT * FROM products WHERE productId = ?';
	connection.query(sql, [productId], function(error,result,field) {
		if (!req.session.countTotal) req.session.countTotal =1;
		else req.session.countTotal++;
		if (!req.session.cart) {
			req.session.cart = {};
			var product = result[0];
			product.quantity = 1;
			req.session.cart[productId]= product;
		} else {
			if (!req.session.cart[productId]) {
				var product = result[0];
				product.quantity = 1;
				req.session.cart[productId]= product;
			} else {
			var quantity =req.session.cart[productId].quantity;
			req.session.cart[productId].quantity = quantity + 1;
		}
		}
		res.redirect('back');
	})
}