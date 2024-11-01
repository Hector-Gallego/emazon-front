import { Component, Input, OnInit } from '@angular/core';
import { faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-badge',
  templateUrl: './icon-badge.component.html',
  styleUrls: ['./icon-badge.component.scss']
})
export class IconBadgeComponent {

  @Input() cartIcon : IconDefinition = faShoppingCart;
  @Input() quantity : number = 0;
  
}
