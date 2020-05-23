	$(document).ready(function() {
		$(".plus").click(function(e){
			e.preventDefault();
			var id = $(this).parent().siblings('input').val();
			var quantity = parseInt($(this).siblings('input').val()) + 1;
			$(this).siblings('input').val(quantity);
			var totalPrice = parseInt($('.totalPrice').text())+ parseInt($(this).parent().siblings('.sp-box-price').text());
			// $('.totalPrice').text(totalPrice);
			$.ajax({
				url: '/cart/update',
				type: 'POST',
				dataType: 'html',
				data: {
					id: id,
					quantity: quantity,
					totalPrice: totalPrice,
					count: 1
				}
			}).done(function(data) {
				$('.main__form').html(data);
			})
		})
		$('.subtract').click(function(e){
			e.preventDefault();
			var id = $(this).parent().siblings('input').val();
			if (parseInt($(this).siblings('input').val()) >1) {
			var quantity = parseInt($(this).siblings('input').val()) - 1;
			$(this).siblings('input').val(quantity);
			var totalPrice = parseInt($('.totalPrice').text())- parseInt($(this).parent().siblings('.sp-box-price').text());
			// $('.totalPrice').text(totalPrice);
			$.ajax({
				url: '/cart/update',
				type: 'POST',
				data: {
					id: id,
					quantity: quantity,
					totalPrice: totalPrice,
					count: -1
				}
			}).done(function(data) {
				$('.main__form').html(data);
			})
		}
		})
		$('.cancel').click(function(e){
			e.preventDefault();
			var id = $(this).siblings('input').val();
			var count = parseInt($(this).siblings('.sp-box-quantity').children('input').val());
			var totalPrice = parseInt($('.totalPrice').text())- count*parseInt($(this).siblings('.sp-box-price').text());
			var total = parseInt($('.countTotal').text()) -1;
			if (total >=1) $('.countTotal').text(total);
			else $('.countTotal').remove();
			// $('.totalPrice').text(totalPrice);
			$.ajax({
				url: '/cart/update',
				type: 'POST',
				data: {
					id: id,
					quantity: 0,
					totalPrice: totalPrice,
					count: count*(-1)
				}
			}).done(function(data) {
				$('.main__form').html(data);
			})
			$(this).parents(".sp-box").remove();
		})

	})