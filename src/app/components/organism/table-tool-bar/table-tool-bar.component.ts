import { Component, Input, OnInit } from '@angular/core';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';

@Component({
  selector: 'app-table-tool-bar',
  templateUrl: './table-tool-bar.component.html',
  styleUrls: ['./table-tool-bar.component.scss'],
})
export class TableToolBarComponent {
  constructor(private tableToolBarService: TableToolBarService) {}
  @Input() showByoptions: { value: string; label: string }[] = [];
  @Input() sortByoptions: { value: string; label: string }[] = [];

  onShowByChange(value: string): void {
    this.tableToolBarService.updateShowBy(value);
  }

  onSortByChange(value: string): void {
    this.tableToolBarService.updateSortBy(value);
  }
}
