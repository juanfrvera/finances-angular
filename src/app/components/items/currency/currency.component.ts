import { Currency } from '@/typings/item';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency',
  imports: [],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent {
  @Input() item!: Currency;
}
