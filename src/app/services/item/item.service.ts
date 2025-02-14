import { Injectable } from '@angular/core';
import type { IAccount, ICurrencyUI, ItemT, iItem } from '../typings';
import type { IPayment } from '../util/typings/payment.typings';
import { ApiService } from './api.service';
import { PaymentService } from './payment.service';
import { Item } from '../../typings/item';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly url = '/item';
  private list?: Item[];

  constructor(private httpClient: HttpClient) {}

  public async getItems() {
    this.list = await lastValueFrom(this.httpClient.get<Item[]>(this.url));

    if (this.list) {
    }

    return this.list;
  }

  private calculateCurrencies(list: Item[]) {
    // Fill currencies with balance
    const currencies = list.filter(
      (item) => item.type === 'currency'
    ) as ICurrencyUI[];
    currencies.forEach((c) => this.updateCurrencyUI(c, list as Item[]));
  }

  public async create(data: Partial<ItemT>): Promise<ItemT> {
    const item = await lastValueFrom(
      this.httpClient.post<Item>(this.url, data)
    );

    if (item.type === 'account' && item.currency && this.list) {
      const currency: ICurrencyUI | undefined = this.list.find(
        (i) => i.type === 'currency' && i._id === item.currency
      ) as ICurrencyUI;
      if (currency) this.updateCurrencyUI(currency, this.list);
    }

    return item;
  }

  public static async update(
    id: string,
    updatedFields: Partial<ItemT>
  ): Promise<ItemT> {
    const response = await fetch(`${this.getUrl()}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedFields),
    });
    return ApiService.interceptResponse(response);
  }

  public static async delete(id: string) {
    const response = await fetch(`${this.getUrl()}/${id}`, {
      method: 'DELETE',
    });
    return ApiService.interceptResponse(response);
  }

  public static async updateSortOrders(
    data: Array<{ id: string; sortOrder: number }>
  ) {
    const response = await fetch(`${this.getUrl()}/updateSortOrders`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return ApiService.interceptResponse(response);
  }

  /** Creates a payment and returns the created one from the server */
  public static addPayment(itemId: string, payment: IPayment) {
    return PaymentService.create({ ...payment, itemId });
  }

  public static updatePayment(itemId: string, payment: IPayment) {
    return PaymentService.update({ ...payment, itemId });
  }

  private updateCurrencyUI(c: ICurrencyUI, list: Item[]) {
    const accounts = list.filter(
      (l) => l.type === 'account' && l.currency === c.currency
    ) as IAccount[];
    if (accounts && accounts.length) {
      c.total = accounts
        .map((a) => a.balance)
        .reduce((accumulator, value) => accumulator + value);
      c.accounts = accounts.map((a) => ({
        _id: a._id,
        name: a.name,
        balance: a.balance,
      }));
    } else c.total = 0;
  }
}
