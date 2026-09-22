import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PurchaseHistoryService } from '@features/history/pruchace.service';
import { TuiTable } from '@taiga-ui/addon-table';

@Component({
  imports: [TuiTable, DatePipe],
  selector: 'app-purchace-table',
  styleUrl: './purchace-table.scss',
  templateUrl: './purchace-table.html',
})
export class PurchaceTable {
  private readonly _purchaseHistoryService = inject(PurchaseHistoryService);

  protected purchaceHistoryList = this._purchaseHistoryService.purchaceHistoryList;
  readonly timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
}
