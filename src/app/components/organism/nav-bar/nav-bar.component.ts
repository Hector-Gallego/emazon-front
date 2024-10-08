import { Component, OnInit } from '@angular/core';
import { faList, faTags, faBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  faList = faList;
  faTags = faTags;
  faBox = faBox;

  menuItems = [
    { label: 'Categorias', icon: this.faList },
    { label: 'Marcas', icon: this.faTags },
    { label: 'Productos', icon: this.faBox }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
