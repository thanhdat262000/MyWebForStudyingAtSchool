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
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, buyPrice, productImage FROM `products` WHERE productId = ?';
	connection.query(sql, [productId], function(error,result,field) {
		if (!req.session.countTotal) {
			req.session.countTotal =1;
			req.session.totalPrice = result[0].buyPrice;
		}
		else {
			req.session.countTotal++;
			req.session.totalPrice += result[0].buyPrice;
		}
		if (!req.session.cart) {
			req.session.cart = [];
			var product = result[0];
			product.quantity = 1;
			req.session.cart.push(product);
		} else {
			var newItem = true;
			for (let p of req.session.cart) {
				if (p.productId == result[0].productId) {
					newItem = false
					p.quantity++;
				}
			}
			if (newItem) {
				var product = result[0];
				product.quantity = 1;
				req.session.cart.push(product);
			}
		}
		res.redirect('back');
	})
}
module.exports.update = function(req, res) {
	var quantity = req.body.quantity;
	var productId = req.body.id;
	var totalPrice= req.body.totalPrice;
	var count = req.body.count;
	for (var i =0;i < req.session.cart.length; i++) {
		if (req.session.cart[i].productId == productId) {
			if (quantity == 0) {
				req.session.cart.splice(i,1);
				req.session.totalPrice = totalPrice;
				req.session.countTotal+= parseInt(count);
			} else {
			req.session.cart[i].quantity = quantity;
			req.session.totalPrice = totalPrice;
			req.session.countTotal+= parseInt(count);
			}
			break;
		}
	}
		res.render('product/showCart', {
			purchasedProducts: req.session.cart
		})
}