import { Component, Input, OnInit } from '@angular/core';
import { faCartShopping, faCircleInfo, faInfo, faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() imageUrl : string = '';
  @Input() articleName: string = '';
  @Input() articleBrandName: string = '';
  @Input() articlePrice: number = 0;
  faIconShoppingCart: IconDefinition = faInfo;
  buttonSyzeS : ButtonSize = ButtonSize.S;

  ngOnInit(): void {
  }

}
