import { EnvironmentProviders, Type, makeEnvironmentProviders } from '@angular/core';
import { STORAGE_SERVICE, StorageService } from './models/storage';
import { LocalStorageService } from './local-storage.service';

export function provideStorage(
  implementation: Type<StorageService> = LocalStorageService
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: STORAGE_SERVICE,
      useClass: implementation
    }
  ]);
}