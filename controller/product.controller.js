var shortid = require('shortid');
const connection = require('../dataHandle');
module.exports.apple =  function(req, res) {
	var productBrand = 'Macbook';
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productBrand =? '
	connection.query(sql, [productBrand],function(error, result, field) {
		res.render('product/macbook', {
			products: result,
			title: productBrand
		})
	})
}
module.exports.dell =  function(req, res) {
	var productBrand = 'Dell';
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productBrand =? '
	connection.query(sql, [productBrand],function(error, result, field) {
		res.render('product/dell', {
			products: result,
			title: productBrand
		})
	})
}
module.exports.asus =  function(req, res) {
	var productBrand = 'Asus';
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productBrand =? '
	connection.query(sql, [productBrand],function(error, result, field) {
		res.render('product/asus', {
			products: result,
			title: productBrand
		})
	})
}
module.exports.hp =  function(req, res) {
	var productBrand = 'Asus';
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productBrand =? '
	connection.query(sql, [productBrand],function(error, result, field) {
		res.render('product/asus', {
			products: result,
			title: productBrand
		})
	})
}
module.exports.lenovo =  function(req, res) {
	var productBrand = 'Macbook';
	let sql = 'SELECT productId,`productName`, `productBrand`, `productScreen`, `productCPU`, `productRAM`, `productVGA`, `productOS`, `productWeight`, `productImage`, FORMAT(`buyPrice`,0) buyPrice FROM `products` WHERE productBrand =? '
	connection.query(sql, [productBrand],function(error, result, field) {
		res.render('product/macbook', {
			products: result,
			title: productBrand
		})
	})
}