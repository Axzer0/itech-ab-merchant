
export class Filter {
	fromDate;
	toDate;
	merchantId;
	referenceId;
	orderStatus;
	currency;
}

export class SettlementModel{

}

export class PaymentPagination {
	pageSize = 10;
	pageNumber = 1;
	sortParameter;
	sortType;
	searchParameter;
	filter = new Filters();
}

export class Filters {
	fromDate;
	toDate;
	transactionStatus;
	refundStatus;
}
