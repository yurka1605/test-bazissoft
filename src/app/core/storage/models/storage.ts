import { InjectionToken } from '@angular/core';

export interface StorageService {
  get<T>(key: string): T | null | undefined;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

export const STORAGE_SERVICE = new InjectionToken<StorageService>('STORAGE_SERVICE');