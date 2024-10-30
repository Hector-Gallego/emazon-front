import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {  ArticleDataTable } from 'src/app/shared/interfaces/article.interface';
import { DataRow } from 'src/app/shared/interfaces/data-row.interface';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T extends DataRow> {
  @Output() mouseCoords: EventEmitter<MouseEvent > = new EventEmitter();
  @Output() getDataRow: EventEmitter<T>  = new EventEmitter();

  @Input() iconCell : IconDefinition = faEdit;
  onButtonClick(event: MouseEvent) {
    this.mouseCoords.emit(event);
  }
  onGetDatRow(data: T) {
    this.getDataRow.emit(data as unknown as T);
  }
  @Input() headers: TableHeader[] = [];
  @Input() data: T[] = [];
}
