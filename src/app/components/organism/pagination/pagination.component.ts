import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { ScreenSizeService } from 'src/app/shared/services/screen-size/screen-size.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Input() maxPagesToShow: number = 4;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  subscription: Subscription = new Subscription();
  buttonSizeM = ButtonSize.M;
  buttonSizeS = ButtonSize.S;

  butonTypePrimary = ButtonType.PRIMARY;
  buttonTypeSeCundary = ButtonType.SECUNDARY;

  buttonLabelNext: string = 'Siguiente';
  buttonLabelPrev: string = 'Anterior';

  screenWidth: number;
  constructor(private screenSizeService: ScreenSizeService) {
    this.screenWidth = window.innerWidth;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.validatePage();

    const screenSizeSubscription =
      this.screenSizeService.screenWidth$.subscribe((width) => {
        this.screenWidth = width;
      });
    this.subscription.add(screenSizeSubscription);
  }

  get startPage(): number {
    return Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
  }

  get endPage(): number {
    return Math.min(this.totalPages, this.startPage + this.maxPagesToShow - 1);
  }

  validatePage(): void {
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  isLargeScreen(): boolean {
    return this.screenSizeService.isLargeScreen(this.screenWidth);
  }
}
