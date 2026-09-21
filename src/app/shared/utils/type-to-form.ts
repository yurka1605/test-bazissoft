import { FormControl } from "@angular/forms";

export type TypeToForm<T> = {
    [K in keyof T]: FormControl<
        Pick<T, K> extends Required<Pick<T, K>> ? T[K] : T[K] | null
    >
};