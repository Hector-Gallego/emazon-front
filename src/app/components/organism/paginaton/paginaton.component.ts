import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-paginaton',
  templateUrl: './paginaton.component.html',
  styleUrls: ['./paginaton.component.scss']
})
export class PaginatonComponent implements OnInit {

  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Input() maxPagesToShow: number = 4; 
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  screenWidth: number;
  constructor(){
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.validatePage();
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


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  isLargeScreen(): boolean {
    return this.screenWidth >= 768; 
  }
}
