import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiInput } from '@taiga-ui/core';
import { TuiForm } from '@taiga-ui/layout';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Product } from '@features/dashboard/models/product';
import { TypeToForm } from '@shared/utils/type-to-form';

type ProductFormModel = Omit<Product, 'id'>;

@Component({
  imports: [ReactiveFormsModule, TuiAutoFocus, TuiButton, TuiForm, TuiInput],
  selector: 'app-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
  host: {'(submit.prevent)': 'context.completeWith(getCompletedValue())'},
})
export class ProductForm {
  protected readonly context = injectContext<TuiDialogContext<Product | Omit<Product, 'id'>, Product | undefined>>();
  private readonly _initialValue = this.context.data || {
    name: '',
    price: 0,
    vat: 0,
  } satisfies Omit<Product, 'id'>;

  readonly form = new FormGroup<TypeToForm<Omit<Product, 'id'>>>({
    name: new FormControl(
      this._initialValue.name, 
      { nonNullable: true, validators: [Validators.required] }
    ),
    price: new FormControl(
      this._initialValue.price, 
      { nonNullable: true, validators: [Validators.required] }
    ),
    vat: new FormControl(
      this._initialValue.vat, 
      { nonNullable: true, validators: [Validators.required] }
    ),
  });

  isFormChanged() {
    const keys = Object.keys(this.form.value) as (keyof Omit<Product, 'id'>)[];
    return keys.find((key) => this._initialValue[key] !== this.form.value[key]);
  }

  protected getCompletedValue() {
    return {
      ...this.form.getRawValue(),
      id: 'id' in this._initialValue ? this._initialValue.id : undefined,
    }
  }
}
