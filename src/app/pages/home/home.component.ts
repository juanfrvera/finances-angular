import { ItemComponent } from '@/components/items/item/item.component';
import { RightPanelComponent } from '@/components/right-panel/right-panel.component';
import { ItemService } from '@/services/item/item.service';
import { Item } from '@/typings/item';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ItemComponent, RightPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ui: { items?: Item[]; currentItem?: Item } = {};

  private itemService = inject(ItemService);

  ngOnInit(): void {
    this.initAsync();
  }

  itemClicked(item: Item) {
    this.ui.currentItem = item;
  }

  rightPanelCloseClicked() {
    this.ui.currentItem = undefined;
  }

  private async initAsync() {
    this.ui.items = await this.itemService.getAllItems();
  }
}
