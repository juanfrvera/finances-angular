import { ItemService } from '@/services/item/item.service';
import { Item } from '@/typings/item';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ui: { items?: Item[] } = {};

  private itemService = inject(ItemService);

  ngOnInit(): void {
    this.initAsync();
  }

  async initAsync() {
    this.ui.items = await this.itemService.getAllItems();
  }
}
