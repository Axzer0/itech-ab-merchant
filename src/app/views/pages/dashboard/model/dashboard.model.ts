export class SearchModel {
	filter = new Filter();
}

export class Filter {
	fromDate;
	toDate;
	merchantId;
	referenceId;
	orderStatus;
	currency;
}

export class MerchantPaymentModel {
	orderId: string;
	merchantId: string;
	referenceId: string;
	orderReference;
	paymentMethod;
	accountIdentifier;
	orderStatus;
	orderAmount: number;
	currency;
	sessionId: null;
}
