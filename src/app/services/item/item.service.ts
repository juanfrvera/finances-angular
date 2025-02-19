import { Injectable, resource } from '@angular/core';
import type { Account, CurrencyUI, Item } from '@/typings/item';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly url = '/items';
  private list?: Item[];

  constructor(private http: HttpClient) {}

  public async getAllItems() {
    if (!this.list) {
      this.list = await lastValueFrom(this.http.get<Item[]>(this.url));

      if (this.list) {
        this.calculateCurrencies(this.list);
      }
    }

    return this.list;
  }

  public async create(data: Partial<Item>) {
    const item = await lastValueFrom(this.http.post<Item>(this.url, data));

    this.addToCurrencyIfAccount(item);

    return item;
  }

  public update(id: string, updatedFields: Partial<Item>) {
    return lastValueFrom(
      this.http.patch<Item>(`${this.url}/${id}`, updatedFields)
    );
  }

  public delete(id: string) {
    return lastValueFrom(this.http.delete(`${this.url}/${id}`));
  }

  public updateSortOrders(data: Array<{ id: string; sortOrder: number }>) {
    return lastValueFrom(this.http.post(`${this.url}/updateSortOrders`, data));
  }

  private calculateCurrencies(list: Item[]) {
    // Fill currencies with balance
    const currencies = list.filter(
      (item) => item.type === 'currency'
    ) as CurrencyUI[];
    currencies.forEach((c) => this.updateCurrencyUI(c, list as Item[]));
  }

  private addToCurrencyIfAccount(item: Item) {
    if (item.type === 'account' && item.currency && this.list) {
      const currency: CurrencyUI | undefined = this.list.find(
        (i) => i.type === 'currency' && i._id === item.currency
      ) as CurrencyUI;
      if (currency) {
        this.updateCurrencyUI(currency, this.list);
      }
    }
  }

  private updateCurrencyUI(c: CurrencyUI, list: Item[]) {
    const accounts = list.filter(
      (l) => l.type === 'account' && l.currency === c.currency
    ) as Account[];
    if (accounts && accounts.length) {
      c.total = accounts
        .map((a) => a.balance)
        .reduce((accumulator, value) => accumulator + value);
      c.accounts = accounts.map((a) => ({
        _id: a._id,
        name: a.name,
        balance: a.balance,
      }));
    } else {
      c.total = 0;
    }
  }
}
