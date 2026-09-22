import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Observable } from "rxjs";

interface ValidationSuccess { data: Omit<Product, 'id'>[] };
interface ValidationError { error: string };

@Injectable()
export class ProductTransferService {
    private readonly exportFilePrefix = 'products_export';

    getJsonFromImportFile(file: File): Observable<ValidationSuccess['data']> {
        return new Observable((observer)  => {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const validationInfo = this._validateJsonString(e.target?.result as string);

                if (!this._isValidationSuccess(validationInfo)) {
                    observer.error({ message: validationInfo.error });
                } else {
                    observer.next(validationInfo.data);
                    observer.complete();
                }
            };

            reader.readAsText(file);
        });
    }

    exportToJSON(products: Product[]): void {
        const dataStr = JSON.stringify(products, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.exportFilePrefix}_${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    private _validateJsonString(fileContent: string): ValidationError | ValidationSuccess {
        try {
            const parsed = JSON.parse(fileContent);

            if (!Array.isArray(parsed)) {
                return { error: 'Файл должен содержать массив товаров' };
            }

            const isValid = parsed.every(
                (item) =>
                    typeof item.name === 'string' &&
                    typeof item.price === 'number' &&
                    typeof item.vat === 'number'
            );

            if (!isValid) {
                return { error: 'Неверная структура данных в файле (проверьте поля name, price, vat)' };
            }

            return { data: parsed as Omit<Product, 'id'>[] };
        } catch (e) {
            return { error: 'Некорректный формат JSON-файла' };
        }
    }

    private _isValidationSuccess(
        validationResult: ValidationError | ValidationSuccess
    ): validationResult is ValidationSuccess {
        return 'data' in validationResult;
    }
}