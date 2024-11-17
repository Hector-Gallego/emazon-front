import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faBars,
  faFileInvoice,
  faMoneyBill,
  faSignOut,
  faStore,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { filter, finalize, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import {
  ClientRoutes,
  MainRoutes,
} from 'src/app/shared/constants/routes.constants';
import { Role } from 'src/app/shared/enums/role.enum';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { CartItem } from 'src/app/shared/interfaces/cart-item.inteface';
import { ShoppinCartRequest } from 'src/app/shared/interfaces/shopping-cart-request.interface';
import { ShoppingCartPersistenceService } from 'src/app/shared/services/shopping-cart-persistence/shopping-cart-persistence.service';
import { ShoppingCartStateService } from 'src/app/shared/services/shopping-cart-state/shopping-cart-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly shoppingCartSatateService: ShoppingCartStateService,
    private readonly shoppingCartPersistenceService: ShoppingCartPersistenceService
  ) {}

  faLogoutIcon: IconDefinition = faSignOut;
  faArticlesIcon: IconDefinition = faStore;
  faReportsIcon: IconDefinition = faFileInvoice;
  menuIcon: IconDefinition = faBars;
  subscription = new Subscription();
  active: boolean = true;
  currentRoute: string = '';
  roleCleint: Role = Role.CLIENT;
  itemsCartQuantity: number = 0;
  roleClient = Role.CLIENT;
  roleAux = Role.WAREHOUSE_ASSISTANT;
  roleAdmin = Role.ADMIN;

  menuItems = [
    {
      label: 'Artículos',
      icon: this.faArticlesIcon,
      route: `/${MainRoutes.STORE}/${ClientRoutes.ARTICLES}`,
      roles: [this.roleClient],
    },
    {
      label: 'Reportes',
      icon: this.faReportsIcon,
      route: `/${MainRoutes.STORE}/${ClientRoutes.REPORTS}`,
      roles: [this.roleClient],
    },
    {
      label: 'Cerrar Sesión',
      icon: this.faLogoutIcon,
      route: `${MainRoutes.LOGOUT}`,
      roles: [this.roleAux, this.roleAdmin, this.roleClient],
      isLogout: true,
    },
  ];

  pageRequest: ShoppinCartRequest = {
    articlesCart: [],
    pageNumber: 0,
    pageSize: 10,
    sortOrder: 'asc',
    categoryNameFilter: '',
    brandNameFilter: '',
  };
  @Input() isAdmin: boolean = false;

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    const subs = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd;
        this.currentRoute = navigationEndEvent.url;
      });

    const subCartPersistence = this.shoppingCartPersistenceService
      .getShoppingCart(this.pageRequest)
      .subscribe((response) => {
        const articleIds: number[] = response.customPage.content.map(
          (item: ArticleResponse) => item.id
        );

        this.shoppingCartSatateService.setInitialItemsInCart(articleIds);
      });

    const subCartState = this.shoppingCartSatateService.itemsInCart$.subscribe(
      (quantity) => {
        this.itemsCartQuantity = quantity;
      }
    );

    this.subscription.add(subs);
    this.subscription.add(subCartState);
    this.subscription.add(subCartPersistence);
  }

  setActive(): void {
    this.active = !this.active;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  onLogout() {
    this.shoppingCartSatateService.clearShoppingCart();
    this.authService.logout();
    this.router.navigate([`/${MainRoutes.AUTH}/${MainRoutes.LOGIN}`]);
  }

  navigateTo() {
    this.router.navigate([
      `/${MainRoutes.STORE}/${ClientRoutes.SHOPPING_CART}`,
    ]);
  }
}
