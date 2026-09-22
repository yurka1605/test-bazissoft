import { Component, DestroyRef, inject } from '@angular/core';
import { ProductTable } from '../../components/products/product-table';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogService, TuiIcon, TuiNotificationService } from '@taiga-ui/core';
import { ProductForm } from '../../components/product-form/product-form';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '@features/dashboard/models/product';
import { ProductsService } from '@features/dashboard/products.service';

@Component({
  imports: [ProductTable, TuiIcon, TuiButton],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly _productsService = inject(ProductsService);
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
          return this._alertsService.open(product.name);
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }
}
