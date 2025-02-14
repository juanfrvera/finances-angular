import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  public setSyncEnabled(value: boolean) {
    localStorage.setItem(localStoreKeys.syncEnabled, JSON.stringify(value));
  }
  public isSyncEnabled() {
    return !!localStorage.getItem(localStoreKeys.syncEnabled);
  }
  public hasLocalData() {
    return !!localStorage.getItem(localStoreKeys.hasLocalData);
  }
}

const localStoreKeys = {
  syncEnabled: 'SYNC_ENABLED',
  hasLocalData: 'LOCAL_DATA',
};
