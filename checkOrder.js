
 /*   
                      Nagendra, Sathyasagar
                      Account:  jadrn024
                      CS645, Spring 2018
                      Project #2
              */

$(document).ready(function(){

	var shipAddress= localStorage.getItem("shippingAddress");
	var shipName= localStorage.getItem("shippingName");
	$('#saddress').html(shipAddress);
	$('#sname').html(shipName);

	
	$('#cancel-order-button').click(function() { 
		var homeUrl = "http://jadran.sdsu.edu/jadrn024/proj2.html";
		window.location.href = homeUrl;
	});


	var totalCost = getTotalAmount();
	//alert(totalCost);
	document.getElementById("total").innerHTML = totalCost+"$";
	
	var taxAmount = totalCost+5.0;

	document.getElementById("tax").innerHTML = 0.075*taxAmount+taxAmount+"$";

	$('#place-order-button').click(function() { 
			var objectsToUpdate ="";
			for (var i = 0; i < localStorage.length; i++){
        		var key = localStorage.key(i);
        		var re = /[A-Z]{3}-[0-9]{3}/;
				if(key.match(re)){		
						var keyValue = JSON.parse(localStorage[key]);
						var changedQuantity = keyValue.qtyInStock - keyValue.quantitySelected;
						objectsToUpdate+=keyValue.sku+"|";
						objectsToUpdate+=changedQuantity;
						objectsToUpdate+="||";
			}
						
		}
			var url = "/jadrn024/servlet/UpdateRecords?objectsToUpdate="+objectsToUpdate;
						$.get(url, processUpdatedResults);		
	});

	var table = document.createElement('table');
	table.id="table-records";
	table.className ="table table-striped";
						var tr = document.createElement('tr'); 
						tr.className="thead-dark";
						 var heading1 = document.createElement('td');
							heading1.className ="bold";
   						 var heading2 = document.createElement('td');
							heading2.className ="bold";
						 var heading3 = document.createElement('td');	
							heading3.className ="bold";
						 var heading4 = document.createElement('td');
							heading4.className ="bold";
							var descriptionHeading= document.createTextNode("Description");
    						var retailHeading = document.createTextNode("Retail");
							var quantityHeading = document.createTextNode("Quantity");
							var imageHeading = document.createTextNode("Image");
						heading1.append(descriptionHeading);
						heading2.append(retailHeading);
						heading3.append(quantityHeading);		
						heading4.append(imageHeading);
							tr.append(heading1);
							tr.append(heading2);
							tr.append(heading3);
							tr.append(heading4);
							table.appendChild(tr);

		for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var re = /[A-Z]{3}-[0-9]{3}/;
        if(key.match(re)){	
						var keyValue = 	JSON.parse(localStorage[key]);
    					  var tr = document.createElement('tr'); 

						
    					 var column1 = document.createElement('td');
   						 var column2 = document.createElement('td');
						 var column3 = document.createElement('td');
						 var column4 = document.createElement('td');


    						var description = document.createTextNode(keyValue.description);
    						var retail = document.createTextNode(keyValue.retail);
							var quantity = document.createTextNode(keyValue.quantitySelected);
							var image = document.createElement("img");
							image.setAttribute("src", "http://jadran.sdsu.edu/~jadrn024/proj1/_DIRupld_/"+keyValue.sku);
      						image.setAttribute("height", "100");
     						image.setAttribute("width", "100");
							
			
    				column1.appendChild(description);
    				column2.appendChild(retail);
    				column3.appendChild(quantity);
    				column4.appendChild(image);

					tr.append(column1);
					tr.append(column2);
					tr.append(column3);
					tr.append(column4);

    				table.appendChild(tr);

					document.getElementById("table-div").appendChild(table);		
		}

  }


});


function processUpdatedResults(response){
	//if response is null
		if(response.length<=2){
			alert("Something went wrong");
		}else{
			localStorage.clear(); //clearing the cart items
			var OrderSuccess = "http://jadran.sdsu.edu/jadrn024/OrderSuccessfull.html";
			window.location.href = OrderSuccess;
		}
}


function getTotalAmount(){
		var totalCost=0;
		for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var re = /[A-Z]{3}-[0-9]{3}/;
		if(key.match(re)){	
			var keyValue = 	JSON.parse(localStorage[key]);
        	totalCost+=keyValue.quantitySelected * keyValue.retail;
		}
	}
	return totalCost;
}