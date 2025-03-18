import { Item } from '@/typings/item';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CurrencyComponent } from '../currency/currency.component';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-item',
  imports: [CommonModule, CurrencyComponent, AccountComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() item!: Item;
}
