import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem<T>(key: string): T {
    const result = sessionStorage.getItem(key);
    let resultJson = null;
    if (result != null) {
      resultJson = JSON.parse(result);
    }
    return resultJson;
  }

  setItem<T>(key: string, value: T) {
   sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeItem<T>(key: string) {
    sessionStorage.removeItem(key);
  }

  removeAll<T>() {
    sessionStorage.clear();
  }
}
