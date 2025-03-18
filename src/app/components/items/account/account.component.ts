import { Account } from '@/typings/item';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  @Input() item!: Account;
}
