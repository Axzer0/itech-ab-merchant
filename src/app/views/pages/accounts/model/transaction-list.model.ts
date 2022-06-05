import { Transactions } from './transactions.model';

export class TransactionList {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    data: Data;
}

export class Data {
    data: Transactions[];
}