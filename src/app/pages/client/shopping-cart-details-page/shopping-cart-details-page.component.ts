import { Component, OnInit } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { ShoppinCartRequest } from 'src/app/shared/interfaces/shopping-cart-request.interface';
import { SortMapper } from 'src/app/shared/mappers/sort-mapper/sort.mapper';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ShoppingCartPersistenceService } from 'src/app/shared/services/shopping-cart-persistence/shopping-cart-persistence.service';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';

@Component({
  selector: 'app-shopping-cart-details-page',
  templateUrl: './shopping-cart-details-page.component.html',
  styleUrls: ['./shopping-cart-details-page.component.scss'],
})
export class ShoppingCartDetailsPageComponent implements OnInit {
  constructor(
    private readonly loaderService: LoaderService,
    private readonly tableToolBarService: TableToolBarService,
    private readonly shoppinCartPersistenceService: ShoppingCartPersistenceService,
    private readonly brandService: BrandPersistenceService,
    private readonly categoryService: CategoryPersistenceService
  ) {}
  subscription = new Subscription();

  buttonSizeLarge: ButtonSize = ButtonSize.L;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showByOptions = [
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
  ];

  sortByOptions = [
    { value: 'name:asc', label: 'nombre ASC' },
    { value: 'name:desc', label: 'nombre DESC' },
  ];

  categoryOptions: { value: string; label: string }[] = [];
  brandOptions: { value: string; label: string }[] = [];

  articles: ArticleResponse[] = [];
  totalPurchase: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 10;
  sortBy: SortBy = SortBy.NAME;
  sortDirection: SortDirection = SortDirection.ASC;
  categoryFilterName: string = '';
  brandFilterName: string = '';
  isEmpty: boolean = false;

  ngOnInit(): void {
    this.loadShoppingCart();


    const getCategoriesSubscription = this.categoryService
      .getAllCategories()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe((response) => {
        const categories = response.data;
        this.categoryOptions = [
          { value: '', label: 'Todos' },
          ...categories.map((category: Category) => ({
            value: category.name,
            label: category.name,
          })),
        ];
      });

    const getBrandsSubscription = this.brandService
      .getAllBrands()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe((response) => {
        const brands = response.data;
        this.brandOptions = [
          { value: '', label: 'Todos' },
          ...brands.map((brand: Brand) => ({
            value: brand.name,
            label: brand.name,
          })),
        ];
      });

    const showBysubscription = this.tableToolBarService.showBy$.subscribe(
      (value) => {
        this.pageSize = Number(value);
        this.loadShoppingCart();
      }
    );

    const sortBySubscription = this.tableToolBarService.sortBy$.subscribe(
      (value) => {
        const [sortByField, sortDirection] = value.split(':');
        this.sortBy = SortMapper.mapSortBy(sortByField);
        this.sortDirection = SortMapper.mapSortDirection(sortDirection);
        this.loadShoppingCart();
      }
    );

    const brandFilerSubscription =
      this.tableToolBarService.brandFilter$.subscribe((value) => {
        this.brandFilterName = value;
        this.loadShoppingCart();
      });

    const categoryFilterSubscription =
      this.tableToolBarService.categoryFilter$.subscribe((value) => {
        this.categoryFilterName = value;
        this.loadShoppingCart();
      });

    this.subscription.add(getCategoriesSubscription);
    this.subscription.add(getBrandsSubscription);
    this.subscription.add(showBysubscription);
    this.subscription.add(sortBySubscription);
    this.subscription.add(brandFilerSubscription);
    this.subscription.add(categoryFilterSubscription);
  }

  loadShoppingCart(): void {
    this.loaderService.show();

    const pageRequest: ShoppinCartRequest = {
      articlesCart: [],
      pageNumber: this.currentPage - 1,
      pageSize: this.pageSize,
      sortOrder: this.sortDirection,
      categoryNameFilter: this.categoryFilterName,
      brandNameFilter: this.brandFilterName,
    };

    const getShoppingCartSubscription = this.shoppinCartPersistenceService
      .getShoppingCart(pageRequest)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe((response) => {
        this.articles = response.customPage.content;
        this.totalPurchase = response.totalPurchase;
        this.totalPages = response.customPage.totalPages;
        this.isEmpty = response.totalPurchase <= 0;
      });

    this.subscription.add(getShoppingCartSubscription);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadShoppingCart();
  }
}
