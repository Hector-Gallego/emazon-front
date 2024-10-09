import { Component, OnInit } from '@angular/core';
import { faList, faTags, faBox } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    { label: 'Categorias', icon: this.faList, route: '/categorias' },
    { label: 'Marcas', icon: this.faTags, route: '/marcas' },
    { label: 'Productos', icon: this.faBox, route: '/productos'}
  ];

  currentRoute: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navigationEndEvent = event as NavigationEnd;
        this.currentRoute = navigationEndEvent.url; 
      });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

}
