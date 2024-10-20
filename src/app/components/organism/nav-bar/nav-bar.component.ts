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
import { ScreenSizeService } from 'src/app/shared/services/screen-size/screen-size.service';

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

  constructor(
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {
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

    const screenSizeSubscription =
      this.screenSizeService.screenWidth$.subscribe((width) => {
        this.screenWidth = width;
      });
    this.subscription.add(screenSizeSubscription);

    this.subscription.add(subs);
    this.subscription.add(screenSizeSubscription);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }


  isLargeScreen(): boolean {
    return this.screenSizeService.isLargeScreen(this.screenWidth);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
