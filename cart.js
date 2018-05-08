

 /*   
                      Nagendra, Sathyasagar
                      Account:  jadrn024
                      CS645, Spring 2018
                      Project #2
              */

var totalPrice=0;
var totalQuantity=0;
var quantityValid=1;

$(document).ready(function(){

    $(".empty-cart-div").remove();

	
	$('#continue-shopping').on("click",function() {
				var homeUrl = "http://jadran.sdsu.edu/jadrn024/proj2.html"
				window.location.href = homeUrl;
	});

    $('#checkout-button').on("click",function() {
        quantityValid=1;
//


	if(totalQuantity==0)
	{
		nothingToCheckout();
		return;
	}
	
        for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            var re = /[A-Z]{3}-[0-9]{3}/;
            if(key.match(re)){
                var value = JSON.parse(localStorage.getItem(key));
                if($('#'+value.sku+'-quantity-entered-cart').val() >= 1 && $('#'+value.sku+'-quantity-entered-cart').val() <= parseInt(value.qtyInStock)){
                    updateLocalStorageWithQuantity(value);
                }
                else{
                    quantityValid=0;
                }
            }
        }

        if(quantityValid == 0){
           			$('#quan-error').html("Quantity incorrect");
					setTimeout(function(){ $('#quan-error').html("  "); }, 1000);
					return;
        }
//
        var checkoutURL = "http://jadran.sdsu.edu/jadrn024/checkout.html";
        window.location.href = checkoutURL ;
    });

    $('#cart-products-info').on('click','.remove-cart-item',function() {
        var removedKey = $(this).parent().attr("id");

        $(".price").remove();
        $(".quantity").remove();
        var value = JSON.parse(localStorage.getItem(removedKey));
        totalPrice-=(value.retail * value.quantitySelected);
        totalQuantity-=parseInt(value.quantitySelected);
        $('.check-out-button').prepend("<div class='price'>TOTAL PRICE = $"+totalPrice+" </div>");
        $('.check-out-button').prepend("<div class='quantity'>TOTAL QUANTITY = "+totalQuantity+" </div>");

        localStorage.removeItem(removedKey);
        $(this).closest("#"+$(this).parent().attr("id")).remove();

        actionIfCartEmpty();

    });

//	$('#cart-products-info').on('click','.remove-cart-item',function(){
//    	$('#cart-products-info').remove("#"+$(this).parent().attr("id"));
//	});

    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var re = /[A-Z]{3}-[0-9]{3}/;
        if(key.match(re)){
            var value = JSON.parse(localStorage.getItem(key));
            var productDiv = document.createElement("div");
            var imgSrc = "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+value.sku;
            productDiv.innerHTML = value.description + '</br>'+ value.retail + '</br>' + '</br>' + `<img src = ${imgSrc} width=150px height=150px>` + '</br>';
            productDiv.innerHTML += 'Quantity in stock: ' + value.qtyInStock +  '</br>' ;
            productDiv.innerHTML += 'Quantity Selected: <input type="number" min="1" id="'+value.sku+'-quantity-entered-cart" value="' + value.quantitySelected + '" </br>' ;
            productDiv.innerHTML += '</br> <input type="button" id=remove-cart-item'+i+ ' class="card-link remove-cart-item btn btn-danger btn-sm" value="Remove item"> </br>';
            productDiv.id=key;
            productDiv.className = "border rounded bg-white p-4";
            document.getElementById("cart-products-info").appendChild(productDiv);
            totalPrice+=value.retail * value.quantitySelected;
            totalQuantity+=parseInt(value.quantitySelected);
        }
    }
    $('.check-out-button').prepend("<div class='price'>TOTAL PRICE = $"+totalPrice+" </div>");
    $('.check-out-button').prepend("<div class='quantity'>TOTAL QUANTITY = "+totalQuantity+" </div>");

    actionIfCartEmpty();

});

function updateLocalStorageWithQuantity(value) {
        var skuId = value.sku;
        var mid = value.mid;
        var description = value.description;
        var features = value.features;
        var retail = value.retail;
        var quantitySelected = $('#'+value.sku+'-quantity-entered-cart').val();
        var qtyInStock = value.qtyInStock;
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

function actionIfCartEmpty(){
    var emptyCartDiv = document.createElement("div");
    emptyCartDiv.innerHTML = "Your shopping cart is empty";
    emptyCartDiv.className = "alert alert-warning empty-cart-div";
    emptyCartDiv.id = "empty-cart-div";
    if(totalQuantity==0) {
        document.getElementById("cart-products-info").appendChild(emptyCartDiv);
    }
    else{
        $(".empty-cart-div").remove();
    }
}


function nothingToCheckout(){
    var noCheckOut = document.createElement("div");
    noCheckOut.innerHTML = "Nothing to checkout";
    noCheckOut.className = "alert alert-warning empty-cart-div";
    noCheckOut.id = "noCheckOut-div";
    document.getElementById("cart-products-info").appendChild(noCheckOut);

    }

