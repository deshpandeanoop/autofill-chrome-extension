submit();

function submit() {
  const urlParams = new URLSearchParams(window.location.search);
  const ottPlatformUserId = urlParams.get('ottPlatformUserId');
  const platformType = urlParams.get('platformType');
  let canAutofill = false;

  try {
    canAutofill = urlParams.get('canAutofill');
  } catch(exception) {
    //Eat away the exception, the value defaults to false.
  }

  if(canAutofill) {
    return;
  }

  window.alert("AutoFilling is kicking in!!");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	 var data = JSON.parse(this.responseText);
    	 ottUserName = data.ottServiceAccounts[0].username;
       ottPassword = data.ottServiceAccounts[0].password;

        window.alert(data.meta.emailElementId);
        window.alert(data.meta.passwordElementId);
        window.alert(data.meta.signInElementId);

    	 document.getElementById(data.meta.emailElementId).value = ottUserName;
       document.getElementById(data.meta.passwordElementId).value = ottPassword;
    	 document.getElementById(data.meta.signInElementId).click();
    }
  };
  xhttp.open("GET", "http://localhost:9000/ott-gateway-service/v1/ottaccounts?gatewayUserId="+ottPlatformUserId+"&fetchOnlyNames=false&platformType="+platformType, true);
  xhttp.send();
}
