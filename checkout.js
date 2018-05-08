
 /*   
                      Nagendra, Sathyasagar
                      Account:  jadrn024
                      CS645, Spring 2018
                      Project #2
              */

$(document).ready(function(){

		$( "#check-out-product" ).click(function() {
			checkIfFieldsFilled();  	
		});
		
		$( "#inputName1" ).blur(function() {  //changing shipping name if billing name changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingName = $('#inputName1').val(); //billing name 
					$('#inputName').val(billingName);
				}
		});


		$( "#contactPhone1" ).blur(function() {  //changing shipping phone if billing phone changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingPhone = $('#contactPhone1').val(); //billing phone
						$('#contactPhone').val(billingPhone);
				}
		});


		$( "#inputAddress1" ).blur(function() {  //changing shipping address if billing address changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingAddress = $('#inputAddress1').val(); //billing address
						$('#inputAddress').val(billingAddress);
				}
		});


		$( "#inputAddress21" ).blur(function() {  //changing shipping address if billing address changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingAddress2 = $('#inputAddress21').val();
						$('#inputAddress2').val(billingAddress2);
				}
		});
		
		$( "#inputCity1" ).blur(function() {  //changing shipping city if billing city changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingCity = $('#inputCity1').val(); //billing city
						$('#inputCity').val(billingCity);
				}
		});

		$( "#inputState1" ).blur(function() {  //changing shipping city if billing city changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingState = $('#inputState1').val(); //billing state
						$('#inputState').val(billingState);
				}
		});

		$( "#inputZip1" ).blur(function() {  //changing shipping city if billing city changed later
  				if(document.getElementById('gridCheck').checked) {
					var billingZIP = $('#inputZip1').val(); //billing zip
						$('#inputZip').val(billingZIP);
				}
		});






		$('#gridCheck').click(function() {
			if(document.getElementById('gridCheck').checked) {
   						//copy all fields of the billing address to the shipping address
						var billingName = $('#inputName1').val(); //billing name 
						//alert(billingName);
						$('#inputName').val(billingName);

						var billingPhone = $('#contactPhone1').val(); //billing phone
						$('#contactPhone').val(billingPhone);

						var billingAddress = $('#inputAddress1').val(); //billing address
						$('#inputAddress').val(billingAddress);
						var billingAddress2 = $('#inputAddress21').val();
						$('#inputAddress2').val(billingAddress2);

						var billingCity = $('#inputCity1').val(); //billing city
						$('#inputCity').val(billingCity);

						var billingState = $('#inputState1').val(); //billing state
						$('#inputState').val(billingState);

						var billingZIP = $('#inputZip1').val(); //billing zip
						$('#inputZip').val(billingZIP);
			} else {
    				//alert("unchecked");  //dont copy the billing details			
				}
		});
});

function checkIfFieldsFilled(){
			var name = $('#inputName').val();
			if(!name){
				$("#inputName").focus();	
					$('#no-name').html("Name is required");	
					setTimeout(function(){ $('#no-name').html("  "); }, 1000);		
					return;
				}

			var phone = $('#contactPhone').val();
			if(!phone){
						$("#contactPhone").focus();	
					$('#no-phone').html("Phone is required");
					setTimeout(function(){ $('#no-phone').html("  "); }, 1000);
					return;
				}

			var address1 = $('#inputAddress').val();
			if(!address1){
					$("#inputAddress").focus();	
					$('#no-address').html("Address is required");
					setTimeout(function(){ $('#no-address').html("  "); }, 1000);
					return;
				}

			var city = $('#inputCity').val();
			if(!city){
					$("#inputCity").focus();	
					$('#no-city').html("City is required");
					setTimeout(function(){ $('#no-city').html("  "); }, 1000);
					return;
				}

			
			var state = $('#inputState').val();
			if(!state){
					$("#inputState").focus();
					$('#no-state').html("State is required");
					setTimeout(function(){ $('#no-state').html("  "); }, 1000);
					return;
				}

			

		var zip = $('#inputZip').val();
			if(!zip){
					$("#inputZip").focus();
					$('#no-zip').html("Zip is required");
					setTimeout(function(){ $('#no-zip').html("  "); }, 1000);
					return;
				}

		var nameBilling = $('#inputName1').val();		
				if(!nameBilling){
					$("#inputName1").focus();
					$('#no-namebilling').html("Name is required");
					setTimeout(function(){ $('#no-namebilling').html("  "); }, 1000);
					return;
				}

			var billingPhone = $('#contactPhone1').val();		
				if(!billingPhone){
					$("#contactPhone1").focus();
					$('#no-phonebilling').html("Phone is required");
					setTimeout(function(){ $('#no-phonebilling').html("  "); }, 1000);
					return;
				}

			var billingAddress= $('#inputAddress1').val();		
				if(!billingAddress){
					$("#inputAddress1").focus();
					$('#no-addressbilling').html("Address is required");
					setTimeout(function(){ $('#no-addressbilling').html("  "); }, 1000);
					return;
				}  

				var billingCity= $('#inputCity1').val();		
				if(!billingCity){
					$("#inputCity1").focus();
					$('#no-citybilling').html("City is required");
					setTimeout(function(){ $('#no-citybilling').html("  "); }, 1000);
					return;
				}

				var billingState= $('#inputState1').val();		
				if(!billingState){
					$("#inputState1").focus();
					$('#no-statebilling').html("State is required");
					setTimeout(function(){ $('#no-statebilling').html("  "); }, 1000);
					return;
				}

				var billingZip= $('#inputZip1').val();		
				if(!billingZip){
					$("#inputZip1").focus();
					$('#no-zipbilling').html("Zip is required");		
					setTimeout(function(){ $('#no-zipbilling').html("  "); }, 1000);
					return;
				}

				var cardNumber= $('#card-number').val();		
				if(!cardNumber){
					$("#card-number").focus();
					$('#no-cardnumbers').html("Card Number is required");
					setTimeout(function(){ $('#no-cardnumbers').html("  "); }, 1000);
					return;
				}


				var securityCode= $('#security-code').val();		
				if(!securityCode){
					$("#security-code").focus();
					$('#no-securitycode').html("Security code is required");
					setTimeout(function(){ $('#no-securitycode').html("  "); }, 1000);
					return;
				}

			var expiryCard = $('#expiry-card').val();		
				if(!expiryCard){
					$("#expiry-card").focus();
					$('#no-expiry').html("Expiry date is required");
					setTimeout(function(){ $('#no-expiry').html("  "); }, 1000);
					return;
				}
			var sAddress = $('#inputAddress').val();
			sAddress += "  "+ $('#inputAddress2').val();
			var sName =  $('#inputName').val();
			localStorage.setItem("shippingAddress",sAddress);
			localStorage.setItem("shippingName",sName);
			var checkFinalOrderUrl = "http://jadran.sdsu.edu/jadrn024/checkOrder.html";
			window.location.href = checkFinalOrderUrl;
			//var homePageUrl = "http://jadran.sdsu.edu/jadrn024/productCheckout.html";
			//window.location.href = homePageUrl;
}