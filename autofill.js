submit();

function submit() {
  var email = document.getElementById("ap_email");
  var password = document.getElementById("ap_password");
  var urlParams = new URLSearchParams(window.location.search);
  var ottPlatformUserId = urlParams.get('ottPlatformUserId');
  var platformType = urlParams.get('platformType');

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	 var data = JSON.parse(this.responseText);
	 ottUserName = data.ottServiceAccounts[0].username;
     ottPassword = data.ottServiceAccounts[0].password;
	 
	 email.value = ottUserName;
	 password.value = ottPassword;
	 document.getElementById("signInSubmit").click();
    }
  };
  xhttp.open("GET", "http://localhost:9000/ott-gateway-service/v1/ottaccounts?gatewayUserId="+ottPlatformUserId+"&fetchOnlyNames=false&platformType="+platformType, true);
  xhttp.send(); 	
}
