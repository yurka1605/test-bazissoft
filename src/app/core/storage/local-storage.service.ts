import { Injectable } from '@angular/core';
import { StorageService } from './models/storage';

@Injectable()
export class LocalStorageService implements StorageService {
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}