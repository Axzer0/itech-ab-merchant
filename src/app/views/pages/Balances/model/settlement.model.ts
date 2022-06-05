export class SettlementModel {
	// referenceId: string;
	// voucherId: string;
	// receiptId: string;
	// fromDate: string;
	// toDate: string;
	// batchNumber: string;
	// settlementDate: string;
	amount;
	transactionIds = [];
	remarks: string;
}

export class SettlementPagination {
	pageSize = 10;
	pageNumber = 1;
	sortParameter;
	sortType;
	searchParameter;
	filter = new Filter();
}

export class Filter {
	fromDate;
	toDate;
	merchantId;
	batchNumber;
	status;
}

export class UpdateSettlement{
	settleEnable;
	amount;
	transactionIds = [];
	remarks: string;
}
