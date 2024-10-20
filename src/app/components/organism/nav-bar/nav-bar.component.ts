import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faList,
  faTags,
  faBox,
  IconDefinition,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  faList: IconDefinition = faList;
  faTags: IconDefinition = faTags;
  faBox: IconDefinition = faBox;
  faBars: IconDefinition = faBars;

  menuTittle: string = 'Menú';
  currentRoute: string = '';
  secundaryButton: ButtonType = ButtonType.SECUNDARY;
  isSidebarOpen: boolean = false;
  screenWidth: number;

  subscription = new Subscription();

  menuItems = [
    { label: 'Categorias', icon: this.faList, route: '/categorias' },
    { label: 'Marcas', icon: this.faTags, route: '/marcas' },
    { label: 'Productos', icon: this.faBox, route: '/crear-articulo' },
  ];

  constructor(private readonly router: Router) {
    this.screenWidth = window.innerWidth;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const subs = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd;
        this.currentRoute = navigationEndEvent.url;
      });

    this.subscription.add(subs);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
