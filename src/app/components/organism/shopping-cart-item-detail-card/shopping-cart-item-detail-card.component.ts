import { Component, Input } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-shopping-cart-item-detail-card',
  templateUrl: './shopping-cart-item-detail-card.component.html',
  styleUrls: ['./shopping-cart-item-detail-card.component.scss'],
})
export class ShoppingCartItemDetailCardComponent {
  
  @Input() imgUrl: string = '';
  @Input() article!: ArticleResponse;

  removeIcon: IconDefinition = faTrash;
  buttonTypeSecundary: ButtonType = ButtonType.SECUNDARY;
  buttonSize: ButtonSize = ButtonSize.S;

}
