import { Component, DestroyRef, inject } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { ProductsService } from '../../products.service';
import { Product } from '../../models/product';
import { TuiButton, TuiDialogService, TuiIcon, TuiNotificationService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ProductForm } from '../product-form/product-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TUI_CONFIRM, TuiConfirmData } from '@taiga-ui/kit';
import { of, switchMap } from 'rxjs';

@Component({
  imports: [TuiTable, TuiButton],
  selector: 'app-product-table',
  styleUrl: './product-table.scss',
  templateUrl: './product-table.html',
})
export class ProductTable {
  private readonly _dialogService = inject(TuiDialogService);
  private readonly _alertsService = inject(TuiNotificationService);
  private readonly _productsService = inject(ProductsService);
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly products = this._productsService.products;

  edit(product: Product) {
    this._dialogService
      .open<Product>(
        new PolymorpheusComponent(ProductForm), 
        {
          label: 'Редактирование товара',
          size: 's',
          data: {...product},
        }
      )
      .pipe(
        switchMap((updatedProduct) => {
          this._productsService.edit(updatedProduct);
          return this._alertsService.open(`Товар "${product.name}" успешно изменен!`);
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  remove(product: Product) {
    const data: TuiConfirmData = {
      content:`Вы действительно хотите удалить товар ${product.name}?`,
      yes: 'Удалить',
      no: 'Отменить',
    };
 
    this._dialogService
        .open<boolean>(TUI_CONFIRM, {
            label: 'Удалить товар?',
            size: 's',
            data,
        })
        .pipe(
          switchMap((remove) => {
            if (!remove) {
              return of();
            }

            this._productsService.remove(product.id);
            return this._alertsService.open(`Товар "${product.name}" успешно удален!`);
          }),
          takeUntilDestroyed(this._destroyRef)
        )
        .subscribe();
  }
}
