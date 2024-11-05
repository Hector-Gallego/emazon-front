import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() sufficentStock : boolean = true;
  @Output() itemRemoved: EventEmitter<number> = new EventEmitter<number>();

  removeIcon: IconDefinition = faTrash;
  buttonTypeSecundary: ButtonType = ButtonType.SECUNDARY;
  buttonSize: ButtonSize = ButtonSize.S;

  getArticleId(articleId: number) {
    this.itemRemoved.emit(articleId);
  }
}
