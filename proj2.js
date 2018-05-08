 /*   
                      Nagendra, Sathyasagar
                      Account:  jadrn024
                      CS645, Spring 2018
                      Project #2
              */

$(document).ready(function(){
	
	var url = "/jadrn024/servlet/DisplayDB";
	$.get(url, showAllData);

	$( '#thumbnails' ).delegate('div', 'click', function() {
    	var productDetails = $(this).closest(".each-product-div").attr("id");
    	var skuFromPd = productDetails.substring(0,7);
		localStorage.setItem('clickedSku', skuFromPd);
		var productUrl = "http://jadran.sdsu.edu/jadrn024/product.html";
		window.location.href = productUrl ;
	});

	
		$('#search-button').click(function() { 
			var searchString = $('#search-box').val();
					//alert(searchString);
					if(searchString){
					var url = "/jadrn024/servlet/FetchSearchedResults?searchString="+searchString;
						$.get(url, processSearchResults);
					}else{
						alert("Please enter a search string");
						}
			});


	
		var count =0;
		 for (var i = 0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            var re = /[A-Z]{3}-[0-9]{3}/;
            if(key.match(re)){               
				count+=1;
				}
			}

		$('#cart-no').html(count);


/*
	$( '#thumbnails' ).delegate('p', 'click', function() {
    	var productDetails = $(this).text();
    	var skuFromPd = productDetails.substring(0,7);
		localStorage.setItem('clickedSku', skuFromPd);
		var productUrl = "http://jadran.sdsu.edu/jadrn024/product.html";
		window.location.href = productUrl ;
	});
*/

});



function processSearchResults(response){

document.getElementById("thumbnails").innerHTML= " ";
var records = response.split("|||");
for(i=0; i<records.length-1; i++){
	var record = records[i].split("|");
	var imgSrc = "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+record[0];		

	var quantity = record[4];
	if(quantity > 0){
			var inStock = "In Stock";
		}
		else{
			var inStock = "Coming Soon";
		}

		document.getElementById("thumbnails").innerHTML+=`
            <div class="each-product-div col-md-4" id="`+ record[0] + `" >
              <div class="card mb-4 box-shadow">
                <img class="each-product-detail-div card-img-top" src="` + imgSrc + `" style="height: 225px;width: 100%;display: block;" alt="Card image cap">
                <div class="card-body">
                  <p class="each-product-detail-div card-text">` +  '</br>' + record[1] +  '</br>'+ record[2] +  '</br>' +record[3] + '</br>' +`</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-success border border-success rounded p-1">` + inStock +`</small>
                  </div>
                </div>
              </div>
			</div>	
		`;
	}
}

function showAllData(response){

	var records = response.split("|||");
	for(i=0; i<records.length-1; i++){
		var record = records[i].split("|");
		var imgSrc = "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+record[0];		

		var quantity = record[4];
		if(quantity > 0){
			var inStock = "In Stock";
		}
		else{
			var inStock = "Coming Soon";
		}
	
		document.getElementById("thumbnails").innerHTML+=`
            <div class="each-product-div col-md-4" id="`+ record[0] + `" >
              <div class="card mb-4 box-shadow">
                <img class="each-product-detail-div card-img-top" src="` + imgSrc + `" style="height: 225px;width: 100%;display: block;" alt="Card image cap">
                <div class="card-body">
                  <p class="each-product-detail-div card-text">` +  '</br>' + record[1] +  '</br>'+ record[2] +  '</br>' +record[3] + '</br>' +`</p>
                  <div class="d-flex justify-content-between align-items-center">
                       <small class="text-success border border-success rounded p-1">` + inStock +`</small>
                  </div>
                </div>
              </div>
			</div>	
		`;
	}
}


/*
function showAllData(response){
	var records = response.split("|||");
	for(i=0; i<records.length-1; i++){
		var record = records[i].split("|");
		var imgSrc = "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+record[0];
		var quantity = record[4];
		var quantityDiv= document.createElement("div");	
		if(quantity > 0){
			var inStock = "In Stock";
		}
		else{
			var inStock = "Coming Soon";
		}
			
		document.getElementById("thumbnails").innerHTML+=`
		  <div class="col-sm-6 col-md-4">
    		<div class="thumbnail">
      			<img src="` + imgSrc + `" width="242px" height="200px" alt="">
      			<div class="caption">
        			<h3>Thumbnail label</h3>
        			<p>` + record[0] +  '</br>' + record[1] +  '</br>'+ record[2] +  '</br>' +record[3] + '</br>' +`</p>
        			<p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
      			</div>
    		</div>
  		</div>
		`;
	}
}
*/

/*
function showAllData(response){
	var records = response.split("|||");
	for(i=0; i<records.length; i++){
		var record = records[i].split("|");		
			var tempDiv= document.createElement("div");
			var imgSrc = "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+record[0];
			tempDiv.innerHTML = record[0] +  '</br>' + record[1] +  '</br>'+ record[2] +  '</br>' +record[3] + '</br>' + `<img src = ${imgSrc} width=150px height=150px>`;
			var quantity = record[4];
			var quantityDiv= document.createElement("div");	
			if(quantity > 0){
				tempDiv.innerHTML += "</br> In Stock </br>";
			}
			else{
				tempDiv.innerHTML += "</br> Coming soon </br>";
			}
			tempDiv.id="div"+i;			
			tempDiv.className = "divClass border rounded bg-white col-sm-2";
			document.getElementById("thumbnails").appendChild(tempDiv);
	}
}
*/