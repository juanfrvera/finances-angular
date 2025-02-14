import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStoreService } from '../user-store/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = '/auth';
  private token: string | null = null;
  private readonly tokenStorageKey = 'token';
  private readonly tokenExpirationDateKey = 'token_expiration';
  private tokenExpirationDate: Date | null = null;

  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  public login(data: { username: string; password: string }) {
    return new Promise<void>((resolve, reject) => {
      this.http.post<TokenData>(`${this.url}/login`, data).subscribe({
        next: (response) => {
          this.setToken(response);
          this.userStore.setSyncEnabled(true);
          resolve();
        },
        error: reject,
      });
    });
  }

  public async signUp(data: {
    username: string;
    password: string;
    name?: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      this.http.post<TokenData>(`${this.url}/register`, data).subscribe({
        next: (response) => {
          this.setToken(response);
          this.userStore.setSyncEnabled(true);
          resolve();
        },
        error: reject,
      });
    });
  }

  public getToken() {
    if (!this.token) this.token = localStorage.getItem(this.tokenStorageKey);
    return this.token;
  }

  public hasValidToken() {
    try {
      const token = this.getToken();
      if (!token) return false;
    } catch (error) {
      return false;
    }

    const expirationDate = this.getTokenExpirationDate();
    if (expirationDate) {
      if (Date.now() > expirationDate.getTime()) return false;
    }

    return true;
  }

  public removeToken() {
    this.token = null;
    localStorage.setItem(this.tokenStorageKey, '');
    localStorage.setItem(this.tokenExpirationDateKey, '');
  }

  private setToken(data: TokenData) {
    this.token = data.token;
    localStorage.setItem(this.tokenStorageKey, data.token);
    this.tokenExpirationDate = new Date(data.expirationDate);
    localStorage.setItem(this.tokenExpirationDateKey, data.expirationDate);
  }

  private getTokenExpirationDate() {
    if (!this.tokenExpirationDate) {
      const expirationDate = localStorage.getItem(this.tokenExpirationDateKey);
      if (expirationDate) {
        this.tokenExpirationDate = new Date(expirationDate);
      }
    }
    return this.tokenExpirationDate;
  }
}

interface TokenData {
  token: string;
  expirationDate: string;
}
