import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss']
})
export class DataCellComponent implements OnInit {

  @Input() data : string | number | boolean | string[] | undefined = '';
  @Input() icon : IconDefinition = faEdit;
  @Input() isConCell: boolean = false;

  
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent) {
      this.buttonClick.emit(event);
  }

}
