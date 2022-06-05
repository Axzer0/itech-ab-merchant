export class PageSetupModel {
	companyName;
	companyLogo;
}

export class PaymentGatewayModel {
	merchantId;
	createdBy;
	createdTs;
	updatedTs;
	id;
	companyName;
	companyLogo;
}

export class PageDisplayControl {
	merchantId;
	applicationId;
	companyInformation = true;
	purchaseDetails = false;
	customerInformation = false;
	paymentMethod = false;
	cardInformation = false;
}
