import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { Article, ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { SortMapper } from 'src/app/shared/mappers/sort-mapper/sort.mapper';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss'],
})
export class ListArticlesComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly articleService: ArticlePersistenceService,
    private readonly toastService: ToastService,
    private readonly loaderService: LoaderService,
    private readonly tableToolBarService: TableToolBarService
  ) {}

  onNavigateDetail(id: number) {
    this.router.navigate(['/detalle-articulo', id]);
  }

  showByOptions = [
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
  ];

  sortByOptions = [
    { value: 'name:asc', label: 'nombre ASC' },
    { value: 'name:desc', label: 'nombre DESC' },
    { value: 'brand_name:asc', label: 'Marca ASC' },
    { value: 'brand_name:desc', label: 'Marca DESC' },
    { value: 'category_name:asc', label: 'Categoría ASC' },
    { value: 'category_name:desc', label: 'Categoría DESC' },
    
  ];
  articles: ArticleResponse[] = [];
  subscription = new Subscription();
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 10;
  sortBy: SortBy = SortBy.NAME;
  sortDirection: SortDirection = SortDirection.ASC;

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

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
    this.loaderService.show();

    const pageRequest: PaginationRequest = {
      pageNumber: this.currentPage - 1,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };

    const getArticlesSubscription = this.articleService
      .getArticles(pageRequest)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (response) => {
          this.articles = response.data.content;
          this.totalPages = response.data.totalPages;
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

      this.subscription.add(getArticlesSubscription);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadArticles();
  }
}
