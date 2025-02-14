export type TransactionType = 'add' | 'subtract' | 'update';
export interface Payment {
  _id?: string;
  dateString: string;
  amount: number;
  note?: string;
  transactionType?: TransactionType;
}

export interface PayWindow {
  defaultAmount: number;
  saving?: boolean;
  editedPayment?: Payment;
}

export interface IPaymentUI extends Payment {
  usdAmount?: number;
}

export interface IPayTable {
  payments: IPaymentUI[];
  show?: boolean;
  showUsdColumn?: boolean;
}
