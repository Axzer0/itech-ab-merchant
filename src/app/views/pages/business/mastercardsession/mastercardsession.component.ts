import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EnvironmentImgConfigService} from "../../shared/environment-img-config.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {BusinessService} from "../service/business.service";
import {Payer} from "../model/cardsession.model";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {config} from "../../../../app.config";


declare var PaymentSession: any;
declare var pay: any;
declare var $: any;


@Component({
	selector: 'kt-mastercardsession',
	templateUrl: './mastercardsession.component.html',
	styleUrls: ['./mastercardsession.component.scss']
})
export class MastercardsessionComponent implements OnInit {
	payerInfo = new Payer();
	items = [];
	visiblePayerInfo = false;
	loadingPayer = false;
	sessionId;
	companyLogo;
	companyInformation;
	paymentGatewayTransaction;
	amount;
	merchantId;
	orderId;
	script = `<html>
    <head>
    <!-- INCLUDE SESSION.JS JAVASCRIPT LIBRARY -->

    <!-- APPLY CLICK-JACKING STYLING AND HIDE CONTENTS OF THE PAGE -->
    <style id="antiClickjack">
        body {
            display: none !important;
        }

        .errordisplay{
        color: red !important;
        }
    </style>
</head>
<body >


   <h6 style=" height: 29px; padding-left: 15px;
    padding-top: 5px;  background-color: #646c9a;
    color: white;">Card Information</h6>
    <br>
<div class="row">
<div class="col-6"><h6>Cardholder Name</h6></div>
<div class="col-6"><h6>Card Number</h6></div>
<div class="col-6"><input type="text" id="cardholder-name" class="form-control" title="cardholder name"
           aria-label="enter name on card" value="" tabindex="5" readonly></div>
<div class="col-6">
<input type="text" id="card-number" class="form-control" title="card number"
           aria-label="enter your card number" value="" tabindex="1" readonly>
            <span  class="errordisplay" style="color: red" id="cardError"></span>
</div>
</div>
<br>

<div class="row">
<div class="col-4"><h6>MM</h6></div>
<div class="col-4"><h6>YY</h6></div>
<div class="col-4"><h6>CVC</h6></div>
</div>

<div class="row">
<div class="col-4">
<input type="text" id="expiry-month" class="form-control" title="expiry month"
          aria-label="two digit expiry month" value="" tabindex="2" readonly>
 <span  class="errordisplay" style="color: red" id="expiryMonthError"></span>
 </div>

 <div class="col-4">
<input type="text" id="expiry-year" class="form-control" title="expiry year"
          	aria-label="two digit expiry year" value="" tabindex="3" readonly>
 <span  class="errordisplay" style="color: red" id="expiryYearError"></span>
 </div>

 <div class="col-4">
<input type="text" id="security-code" class="form-control" title="security code"
       aria-label="three digit CCV security code" value="" tabindex="4" readonly>
  <span  class="errordisplay" style="color: red" id="securityCodeError"></span>
  </div>

</div>
<div class="row">
<div class="col-4"></div>
<div class="col-4">
  <button style="margin-left: -13px; margin-top: 10px;width:135px" type="button" class="btn btn-primary"  id="payButton"
     onClick="pay('card');">Pay Now</button>
     </div>
</div>
<div style="width:100%; text-align:center;margin-top: 15px;">
	<div style="cursor:pointer" onClick="cancel()"><u>Cancel</u></div>
</div>

</div>
<br>

</div>
</mat-card>
</div>



    <script type="text/javascript">
        function cancel(){
        console.log('cancel')
        }

 const urlParams = new URLSearchParams(window.location.href);
 console.log("parma", window.location.href);

    var description =  window.location.href.substring(
    window.location.href.lastIndexOf("description=") + 12,
    window.location.href.indexOf("&currency="),
    )


    var currency =  window.location.href.substring(
    window.location.href.lastIndexOf("currency=") + 9,
    window.location.href.indexOf("&amount="),
    )

    var amount =  window.location.href.substring(
    window.location.href.lastIndexOf("amount=") + 7,
      window.location.href.indexOf("&merchantId="),
    )


    var merchantId =  window.location.href.substring(
    window.location.href.lastIndexOf("merchantId=") + 11,
      window.location.href.indexOf("&orderId="),
    )
    localStorage.setItem('merchantId', merchantId);


   var orderId =  window.location.href.substring(
    window.location.href.lastIndexOf("orderId=") + 8,
      window.location.href.indexOf("&transactionId="),
    )
         localStorage.setItem('orderId', orderId);

      var transactionId =  window.location.href.substring(
    window.location.href.lastIndexOf("transactionId=") + 14,
      window.location.href.indexOf("&sessionId="),
    )

    localStorage.setItem('transactionId', transactionId);


   var sessionId =  window.location.href.substring(
    window.location.href.lastIndexOf("sessionId=") + 10,
);
         localStorage.setItem('sessionId', sessionId);
   console.log("seson", sessionId);
        if (self === top) {
            var antiClickjack = document.getElementById("antiClickjack");
            antiClickjack.parentNode.removeChild(antiClickjack);
        } else {
            top.location = self.location;
        }

        PaymentSession.configure({
       session: sessionId,
            fields: {
                // Attach hosted fields to your payment page
                card: {
                    number: "#card-number",
                    securityCode: "#security-code",
                    expiryMonth: "#expiry-month",
                    expiryYear: "#expiry-year",
                    nameOnCard: "#cardholder-name",
                },
            },
            frameEmbeddingMitigation: ["javascript"],
            callbacks: {
                initialized: function (response) {
                    // HANDLE INITIALIZATION RESPONSE
                    if (response.status === "ok") {
                        console.log("Ready for payment")
                    }
                },
                formSessionUpdate: function (response) {
                    // HANDLE RESPONSE FOR UPDATE SESSION
                    if (response.status) {
                        if ("ok" == response.status) {
                            //check if the security code was provided by the user
                            if (response.sourceOfFunds.provided.card.securityCode) {
                                console.log("Security code was provided.");
                            }

                            //check if the user entered a MasterCard credit card
                            if (response.sourceOfFunds.provided.card.scheme == 'MASTERCARD') {
                                console.log("The user entered a MasterCard credit card.")
                            }

                            const data = { sessionId: sessionId };


                            let link = window.location.protocol + '//' +window.location.hostname;
                            if (window.location.port) {
                            	link = link + ':' + window.location.port ;
                            }


                             window.open( link +'/#/business/payment/process?session=' + sessionId+ '&order=' + orderId + '&merchant=' + merchantId +'&txn=' + transactionId, "_self");
                            // fetch(localStorage.getItem('serverMainApiUrl') + 'merchant/' + merchantId + '/initiateAuthentication/order/'+ orderId+ '/transaction/' + transactionId, {
                            //  method: 'POST',
                            //  headers: {
                            //  'Content-Type': 'application/json',
                            //  },
                            //  body: JSON.stringify(data),
                            //  })
							//
                            //  .then(function(res){ console.log("ressss ---->", res)
                            //  window.open(res.url, "_self");
                            //  })
                            //  .catch(function(res){ console.log("",res) });
                            //


                        } else if ("fields_in_error" == response.status) {
                            // HANDLE FIELD ERROR RESPONSES
                            document.getElementById("payButton").disabled = false;
                            document.getElementById("payButton").innerText = 'Pay Now';
                            console.log("Session update failed with field errors.");
                            if (response.errors.cardNumber) {
                            	document.getElementById('cardError').innerHTML= 'Card number invalid or missing.';

                            }
                            if (response.errors.expiryYear) {
                            		document.getElementById('expiryYearError').innerHTML= 'Expiry year invalid or missing.';

                            }
                            if (response.errors.expiryMonth) {
                            		document.getElementById('expiryMonthError').innerHTML= 'Expiry month invalid or missing.';

                            }
                            if (response.errors.securityCode) {
                            		document.getElementById('securityCodeError').innerHTML= 'Security code invalid.';

                            }
                        } else if ("request_timeout" == response.status) {
                        	document.getElementById("payButton").disabled = false;
                        	document.getElementById("payButton").innerText = 'Pay Now';
                            console.log("Session update failed with request timeout: " + response.errors.message);
                              alert(response.errors.message);
                        } else if ("system_error" == response.status) {
                        	document.getElementById("payButton").disabled = false;
                        	document.getElementById("payButton").innerText = 'Pay Now';
                            console.log("Session update failed with system error: " + response.errors.message);
                              alert(response.errors.message);
                        }
                    } else {
                    	document.getElementById("payButton").disabled = false;
                    	document.getElementById("payButton").innerText = 'Pay Now';
                        console.log("Session update failed: " + response);
                          alert(response);
                    }
                }
            },
            interaction: {
                displayControl: {
                    formatCard: "EMBOSSED",
                    invalidFieldCharacters: "REJECT"
                }
            }
        });

        function pay() {
        console.log("hello");
        PaymentSession.updateSessionFromForm('card');
        }
    </script>
</body>
      </html>`;

	@ViewChild('content', {static: false}) elRef: ElementRef;
	disableCardBtn = true;

	constructor(private sanitizer: DomSanitizer,
				private service: BusinessService,
				private route: ActivatedRoute,
				private cdr: ChangeDetectorRef,
				private layoutUtilsService: LayoutUtilsService,
	) {
		localStorage.setItem('serverMainApiUrl', config.serverMainApiUrl);
		this.script = this.sanitizer.bypassSecurityTrustHtml(this.script) as any;
	}

	ngOnInit(): void {
		this.amount = this.route.snapshot.queryParamMap.get('amount');
	}

	ngAfterViewInit() {
		setTimeout(() => {
			var check = document.getElementById('hello');
			const scripts = this.elRef.nativeElement.getElementsByTagName('script');
			const script = document.createElement('script');
			setTimeout(() => {
				eval(scripts[0].text);
				this.service.getDetails(localStorage.getItem('merchantId'), localStorage.getItem('orderId'), {sessionId: localStorage.getItem('sessionId')}).subscribe(data => {
					this.companyInformation = data.data.companyInformation;
					this.companyLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:Image/*;base64,' + data.data.companyInformation.companyLogo);
					this.paymentGatewayTransaction = data.data.paymentGatewayTransaction;
					this.items = data.data.paymentGatewayTransaction.purchaseUnit.item;
					localStorage.setItem('approveUrl', data.data.paymentGatewayTransaction.approveUrl);
					localStorage.setItem('cancelUrl', data.data.paymentGatewayTransaction.cancelUrl);

					this.cdr.detectChanges();
					console.log("details ---->", this.items);
				});
			}, 0);

		}, 1000);

	}

	public handleAnchorClick = (event: Event) => {
		// Prevent opening anchors the default way
		event.preventDefault();
		const anchor = event.target as HTMLAnchorElement;
		alert(`You are trying to navigate to ${anchor.href}`);
	}

	save() {
		// this.service.redirectUrl().subscribe(data => {
		// 	console.log("redirect url", data);
		// })
		this.loadingPayer = true;
		this.payerInfo.merchantId = localStorage.getItem('merchantId');
		this.payerInfo.orderId = localStorage.getItem('orderId');
		this.payerInfo.transactionId = localStorage.getItem('transactionId');
		this.service.payerInfo(this.payerInfo).subscribe(data => {
			this.loadingPayer = false;
			this.cdr.detectChanges();
			const message = 'Successfully Saved';

			this.layoutUtilsService.showActionNotification(message, MessageType.Delete, 5000, true, false);
		}, error => {
			this.loadingPayer = false;
			const message = error.error.errorData.message;
			this.layoutUtilsService.showActionNotification(message, MessageType.Delete, 5000, true, false);
		})

	}

	showPayerInfo() {
		this.visiblePayerInfo = true;
	}

	minimizePayerInfo() {
		this.visiblePayerInfo = false;
	}


}
