import { Injectable } from "@angular/core";
import { BaseDataProvider } from "@core/storage";
import { Purchase } from "./models/history";
import { historyMock } from "./history.mock";

@Injectable()
export class PurchaseHistoryService extends BaseDataProvider<Purchase[]> {
    readonly purchaceHistoryList = this.data.asReadonly();

    constructor() {
        super('purchaseHistory', historyMock);
    }
}