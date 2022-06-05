
function pay() {
	console.log("hello mello");
	document.getElementById("payButton").disabled = true;
	document.getElementById("payButton").innerText = 'Processing ...';
	PaymentSession.updateSessionFromForm('card');
}
function cancel(){
	if (localStorage.getItem('cancelUrl') == 'null'){
		console.log('null');
		return;
	}
	window.open( localStorage.getItem('cancelUrl'), "_self");

}
