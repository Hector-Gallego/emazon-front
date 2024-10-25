import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faMinus,
  faPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';

@Component({
  selector: 'app-quantity-counter-button',
  templateUrl: './quantity-counter-button.component.html',
  styleUrls: ['./quantity-counter-button.component.scss'],
})
export class QuantityCounterButtonComponent implements OnInit {
  constructor() {}

  incrementIcon: IconDefinition = faPlus;
  decrementIcon: IconDefinition = faMinus;
  buttonSecundary: ButtonType = ButtonType.SECUNDARY;
  buttonSizeAuto: ButtonSize = ButtonSize.AUTO;
  quantity: number = 1;
  @Input() stock : number = 10;

  @Output() quantityChange : EventEmitter<number> = new EventEmitter<number>();

  increment(): void {
    if (this.quantity < this.stock) {  
      this.quantity++;
      this.quantityChange.emit(this.quantity); 
    }

  }

  decrement(): void {
    if (this.quantity > 1) { 
      this.quantity--;
      this.quantityChange.emit(this.quantity); 
    }
  }
  ngOnInit(): void {}
}
