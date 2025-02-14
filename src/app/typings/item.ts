import { Payment } from './payment';

export type Item = Account | Service | Currency | Debt;

export interface ItemBase {
  _id: string;
  updateDate?: Date;
  sortOrder: number;
}

export interface Account extends ItemBase {
  type: 'account';
  name: string;
  balance: number;
  currency: string;
  payments?: Payment[];
}

export interface Service extends ItemBase {
  type: 'service';
  name: string;
  cost: number;
  currency: string;
  /** If the payment has to be done manually */
  isManual: boolean;
  payments?: Payment[];
}

export interface Currency extends ItemBase {
  type: 'currency';
  currency: string;
  total: number;
}
export interface CurrencyUI extends Currency {
  accounts?: Array<{ _id: string; name: string; balance: number }>;
}
export interface Debt extends ItemBase {
  type: 'debt';
  withWho: string;
  description: string;
  amount: number;
  currency: string;
  theyPayMe: boolean;
  payments?: Payment[];
}
