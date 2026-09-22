import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { BaseDataProvider } from "@core/storage";
import { generateId } from "@shared/utils/id-generator";

@Injectable()
export class ProductsService extends BaseDataProvider<Product[]> {
    readonly products = this.data.asReadonly();
    
    constructor() {
        super('products', []);
    }

    add(product: Omit<Product, 'id'>) {
        this.data.update((products) => {
            const id = generateId();
            return [
                ...products,
                { ...product, id },
            ]
        });
        this.updateStorage();
    }

    addMany(newProductsData: Omit<Product, 'id'>[]): void {
        this.data.update((products) => {
            const newProducts = newProductsData.map((product, index) => ({ id: generateId(), ...product}));
            return [
                ...products,
                ...newProducts,
            ]
        });
        this.updateStorage();
    }

    edit(product: Product) {
        this.data.update((products) => 
            products.map((item) => {
                if (item.id !== product.id) return item;

                return {...product};
            })
        );
        this.updateStorage(); 
    }

    remove(id: number) {
        this.data.update(
            (products) => products.filter((product) => product.id !== id)
        );
        console.log(this.data());
        this.updateStorage(); 
    }
}