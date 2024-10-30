import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription, finalize } from 'rxjs';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import {
  ArticleDataTable,
  ArticleResponse,
} from 'src/app/shared/interfaces/article.interface';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { SupplyRequest } from 'src/app/shared/interfaces/supply-request.interface';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';
import { ArticleDataTableMapper } from 'src/app/shared/mappers/article-data-table.mapper/article-data-table.mapper';
import { SortMapper } from 'src/app/shared/mappers/sort-mapper/sort.mapper';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';

@Component({
  selector: 'app-list-articles-admin-page',
  templateUrl: './list-articles-admin-page.component.html',
  styleUrls: ['./list-articles-admin-page.component.scss'],
})
export class ListArticlesAdminPageComponent implements OnInit {
  constructor(
    private readonly articleService: ArticlePersistenceService,
    private readonly router: Router,
    private readonly loader: LoaderService,
    private readonly tableToolBarService: TableToolBarService
  ) {}

  subscription = new Subscription();

  isPopupVisible: boolean = false;
  popupPosition = { top: '0px', left: '0px' };

  articles: ArticleResponse[] = [];
  supply!: SupplyRequest;
  articlesDataTable: ArticleDataTable[] = [];
  iconAdd: IconDefinition = faPlus;

  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 5;
  sortBy: SortBy = SortBy.NAME;
  sortDirection: SortDirection = SortDirection.ASC;

  selectedArticleName: string = '';
  selectedArticleStock: number = 0;
  selectedArticleId: number | null = null;

  buttonLabelAddBrand: string = 'Agregar';
  tableTittleLabel: string = 'Listado de Artículos';

  buttonSizeM = ButtonSize.M;
  buttonSizeS = ButtonSize.S;
  buttonTypePrimary = ButtonType.PRIMARY;
  buttonTypeSecundari = ButtonType.SECUNDARY;

  headers: TableHeader[] = [
    { displayName: 'Id', key: 'id' },
    { displayName: 'Nombre', key: 'name' },
    { displayName: 'Descripción', key: 'description' },
    { displayName: 'Cantidad', key: 'quantity' },
    { displayName: 'Precio', key: 'price' },
    { displayName: 'Marca', key: 'brandName' },
    { displayName: 'Categorias', key: 'categoryNames' },
  ];

  showByOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
  ];

  sortByOptions = [
    { value: 'name:asc', label: 'nombre ASC' },
    { value: 'name:desc', label: 'nombre DESC' },
  ];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadArticles();

    const showBySubscription = this.tableToolBarService.showBy$.subscribe(
      (value) => {
        this.pageSize = Number(value);
        this.loadArticles();
      }
    );

    const sortBySubscription = this.tableToolBarService.sortBy$.subscribe(
      (value) => {
        const [sortByField, sortDirection] = value.split(':');
        this.sortBy = SortMapper.mapSortBy(sortByField);
        this.sortDirection = SortMapper.mapSortDirection(sortDirection);
        this.loadArticles();
      }
    );

    this.subscription.add(showBySubscription);
    this.subscription.add(sortBySubscription);
  }

  loadArticles(): void {
    this.loader.show();

    const pageRequest: PaginationRequest = {
      pageNumber: this.currentPage - 1,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };

    const getArticlessSubscription = this.articleService
      .getArticles(pageRequest)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (response) => {
          this.articles = response.data.content;
          this.articlesDataTable = this.articles.map((article) =>
            ArticleDataTableMapper.toDataTable(article)
          );
          this.totalPages = response.data.totalPages;
        },
      });

    this.subscription.add(getArticlessSubscription);
  }

  onAddSupply(quantity: number) {
    
    this.loader.show();
    if (this.selectedArticleId !== null) {
      this.supply = {
        articleId: this.selectedArticleId,
        quantity: quantity,
        cartIds: [],
      };
    }
    const addSuuplySubscription = this.articleService
      .addSupply(this.supply)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: () => {
          this.loadArticles();
        },
      });
    this.selectedArticleId = null;
    this.subscription.add(addSuuplySubscription);
  }

  navigateToCreateArticle(): void {
    this.router.navigate(['/admin/crear-articulo']);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadArticles();
  }

  closePopup() {
    this.isPopupVisible = false;
  }
  onGetMouseCoords($event: MouseEvent) {
    this.popupPosition = {
      top: `${$event.clientY}px`,
      left: `${$event.clientX}px`,
    };
  }

  onGetArticleSelected(article: ArticleDataTable) {
    this.selectedArticleId = article.id;
    this.selectedArticleName = article.name;
    this.selectedArticleStock = article.quantity;
    this.isPopupVisible = true;
  }
}
