import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { STORAGE_SERVICE } from "./models/storage";

@Injectable()
export abstract class BaseDataProvider<T> {
    private readonly _storageService = inject(STORAGE_SERVICE);
    
    private readonly _storageKey: string;
    protected readonly data: WritableSignal<T>;

    constructor(
        storageKey: string,
        defaultInitialData: T,
    ) {
        this._storageKey = storageKey;
        this.data = signal(this._initialize(defaultInitialData));
    }


    protected updateStorage() {
        this._storageService.set<T>(this._storageKey, this.data());
    }

    private _initialize(defaultInitialData: T): T {
        return this._storageService.get<T>(this._storageKey) ?? defaultInitialData;
    }
}