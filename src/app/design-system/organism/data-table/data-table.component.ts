import { Component, Input } from '@angular/core';
import { DataRow } from 'src/app/shared/interfaces/data-row.interface';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T extends DataRow> {
  @Input() headers: TableHeader[] = [];
  @Input() data: T[] = [];
}
