
 /*   
                      Nagendra, Sathyasagar
                      Account:  jadrn024
                      CS645, Spring 2018
                      Project #2
              */

var productDetails="";

$(document).ready(function(){
	var clickedSku = localStorage.getItem("clickedSku");
	var url = "/jadrn024/servlet/DisplayProduct?clickedSku="+clickedSku;
	var imgSrc = "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+clickedSku;
	$('#product-image').html(`<img src = ${imgSrc} width=400px;>`);
	$.get(url, showProductInfo);
	
	$('#add-to-cart').click(function() { 
		var qtyInStock = productDetails[5];
		var quantitySelected = $('#product-details-quantity').val();
		
		if(quantitySelected == "" || parseInt(quantitySelected) <= 0){
			$('#more-quantity').html("Quantity has to be graeter than zero");
					setTimeout(function(){ $('#more-quantity').html("  "); }, 3000);		
			return;
			}

		if(parseInt(qtyInStock) < parseInt(quantitySelected)){
					$('#more-quantity').html("Quantity is greater than in stock quantity");
					setTimeout(function(){ $('#more-quantity').html("  "); }, 3000);
		return;			
		}

		if (localStorage.getItem('cart-count') === null) {
		    localStorage.setItem('cart-count', 0 + 1);
 		}
		else{
			localStorage.setItem('cart-count', parseInt(localStorage.getItem('cart-count')) + 1);
		}

		var cartUrl = "http://jadran.sdsu.edu/jadrn024/cart.html";

		addToLocalStorage();		

		window.location.href = cartUrl ;

	});


});

function addToLocalStorage(){

	var skuId = productDetails[0];
	var mid = productDetails[1];
	var description = productDetails[2];
	var features = productDetails[3]; 
	var retail = productDetails[4];
	var quantitySelected = $('#product-details-quantity').val();
	var qtyInStock = productDetails[5];
	var lsEntry = {
		"sku": skuId,
		"mid": mid,
		"description": description,
		"features": features, 
		"retail": retail,
		"quantitySelected": quantitySelected,
		"qtyInStock": qtyInStock
	};
	localStorage.setItem(skuId, JSON.stringify(lsEntry));
}

function showProductInfo(response){
	productDetails = response.split('|');
	$('#product-details').html(`MID: ${productDetails[1]} </br></br> DESCRIPTION: ${productDetails[2]} </br></br> FEATURES: ${productDetails[3]} </br></br> RETAIL: $ ${productDetails[4]} </br></br> Quantity in Stock: ${productDetails[5]} </br></br>`);
	$('#product-details').append('<div class="quantity"> Quantity: <input type="number" id="product-details-quantity" name="quantity" min="0" /></div>');
}


