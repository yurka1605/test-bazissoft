import { Component, DestroyRef, inject } from '@angular/core';
import { ProductTable } from '../../components/product-table/product-table';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogService, TuiIcon, TuiNotificationService } from '@taiga-ui/core';
import { ProductForm } from '../../components/product-form/product-form';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ProductTransferService } from '../../services/product-transfer';

@Component({
  imports: [ProductTable, TuiIcon, TuiButton],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly _productsService = inject(ProductsService);
  private readonly _productTransferService = inject(ProductTransferService);
  private readonly _alertsService = inject(TuiNotificationService);
  private readonly _dialogService = inject(TuiDialogService);
  private readonly _destroyRef = inject(DestroyRef);

  create(): void {
    this._dialogService
      .open<Product>(
        new PolymorpheusComponent(ProductForm), 
        {
          label: 'Добавление товара',
          size: 's',
        }
      )
      .pipe(
        switchMap((product) => {
          this._productsService.add(product);
          return this._alertsService.open(`Товар с именем ${product.name} успешно добавлен!`);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  exportData() {
    this._productTransferService.exportToJSON(this._productsService.products());
    this._alertsService.open(`Товары успешно выгружены в JSON!`)
  }

  importData(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this._productTransferService
      .getJsonFromImportFile(input.files[0])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (importedProducts) => {
          this._productsService.addMany(importedProducts);
          this._alertsService.open(`Товары успешно загруженны!`)
        },
        error: (err: { message: string }) => this._alertsService.open(err.message),
      });
  }
}
