import { Item } from '@/typings/item';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent {
  @Input() item!: Item;

  @Output() closeClicked = new EventEmitter();

  close() {
    this.closeClicked.emit();
  }
}
