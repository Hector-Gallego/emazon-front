import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faShoppingBag,
  faShoppingBasket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { finalize, Subscription } from 'rxjs';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { CartItem } from 'src/app/shared/interfaces/cart-item.inteface';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ShoppingCartPersistenceService } from 'src/app/shared/services/shopping-cart-persistence/shopping-cart-persistence.service';
import { ShoppingCartStateService } from 'src/app/shared/services/shopping-cart-state/shopping-cart-state.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss'],
})
export class ArticleDetailPageComponent implements OnInit, OnDestroy {
  
  constructor(
    private readonly articleService: ArticlePersistenceService,
    private readonly toastService: ToastService,
    private readonly loaderService: LoaderService,
    private readonly route: ActivatedRoute,
    private readonly shoppingCartPersistenceService: ShoppingCartPersistenceService,
    private readonly shoppinCartStateService: ShoppingCartStateService
  ) {}

  quantityToAdd: number = 1;
  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;
  faIconShoppingCart: IconDefinition = faShoppingBasket;
  buttonSyzeL: ButtonSize = ButtonSize.L;
  articleId: number = 0;
  article!: ArticleResponse;
  subscriptions: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleId = +params['id'];
    });

    this.loadArticle();
  }

  loadArticle(): void {
    this.loaderService.show();

    const getArticleSubscription = this.articleService
      .getArticleById(this.articleId)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (response) => {
          this.article = response.data;
        },
        error: (error) => {
          this.toastMessage =
            error?.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE;

          this.toastType = StatesTypes.ERROR;
          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
        },
      });

    this.subscriptions.add(getArticleSubscription);
  }

  addItemToShoppinCart() {
    this.loaderService.show();
    const cartItem: CartItem = {
      articleId: this.article.id,
      quantity: this.quantityToAdd,
    };

    this.shoppingCartPersistenceService
      .saveItemtoShoppingCart(cartItem)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(() => {
        this.shoppinCartStateService.addItemToShoppingCart(cartItem);
      });
  }

  getQuantityToAdd(quantity: number) {
    this.quantityToAdd = quantity;
  }
}
