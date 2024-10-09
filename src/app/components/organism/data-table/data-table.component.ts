import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() headers: { displayName: string, key: string }[] = [];
  @Input() data: any[] = [];
  
  constructor() { }
  ngOnInit(): void {
  }

}
