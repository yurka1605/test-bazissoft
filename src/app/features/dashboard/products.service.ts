import { inject, Service, signal } from "@angular/core";
import { Product } from "./models/product";
import { STORAGE_SERVICE } from "@core/storage";

@Service()
export class ProductsService {
    private readonly _storageService = inject(STORAGE_SERVICE);

    private readonly _productsStorageKey = 'products';
    private readonly _products = signal<Product[]>(this._getInitialData());

    readonly products = this._products.asReadonly();

    add(product: Omit<Product, 'id'>) {
        this._products.update((products) => {
            const id = Date.now() + products.length;
            return [
                ...products,
                { ...product, id },
            ]
        });
        this.updateStorage();
    }

    edit(product: Product) {
        this._products.update((products) => 
            products.map((item) => {
                if (item.id !== product.id) return item;

                return {...product};
            })
        );
        this.updateStorage(); 
    }

    remove(id: number) {
        this._products.update(
            (products) => products.filter((product) => product.id !== id)
        );
        this.updateStorage(); 
    }

    private updateStorage() {
        this._storageService.set(this._productsStorageKey, this._products());
    }

    private _getInitialData(): Product[] {
        const initialStorageData = this._storageService.get<Product[]>(this._productsStorageKey);
        return initialStorageData ?? [];
    }
}