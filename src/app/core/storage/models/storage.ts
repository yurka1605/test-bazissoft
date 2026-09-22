import { InjectionToken } from '@angular/core';

// TODO: Для поддержки асинхронных Storage, таких как IndexedDB - переписать с использованием Observable
export interface StorageService {
  get<T>(key: string): T | null | undefined;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');