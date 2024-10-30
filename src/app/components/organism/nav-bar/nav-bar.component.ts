import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faList,
  faTags,
  faBox,
  IconDefinition,
  faBars,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { Role } from 'src/app/shared/enums/role.enum';
import {
  AdminRoutes,
  MainRoutes,
} from 'src/app/shared/constants/routes.constants';

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
  faAddUser: IconDefinition = faUserPlus;

  menuTittle: string = 'Menú';
  currentRoute: string = '';
  secundaryButton: ButtonType = ButtonType.SECUNDARY;
  isSidebarOpen: boolean = false;
  screenWidth: number;

  roleAdmin: Role = Role.ADMIN;
  roleAux: Role = Role.WAREHOUSE_ASSISTANT;
  roleClient: Role = Role.CLIENT;
  subscription = new Subscription();

  menuItems = [
    {
      label: 'Categorías',
      icon: this.faList,
      route: `/${MainRoutes.ADMIN}/${AdminRoutes.CATEGORIES}`,
      roles: [this.roleAdmin, this.roleAux],
    },
    {
      label: 'Marcas',
      icon: this.faTags,
      route: `/${MainRoutes.ADMIN}/${AdminRoutes.BRANDS}`,
      roles: [this.roleAdmin, this.roleAux],
    },
    {
      label: 'Artículos',
      icon: this.faBox,
      route: `/${MainRoutes.ADMIN}/${AdminRoutes.ARTIClES}`,
      roles: [this.roleAdmin, this.roleAux],
    },
    {
      label: 'Auxiliar',
      icon: this.faAddUser,
      route: `/${MainRoutes.ADMIN}/${AdminRoutes.CREATE_WAREHOUSE_ASSISTANT}`,
      roles: [this.roleAdmin],
    },
  ];

  constructor(private readonly router: Router) {
    this.screenWidth = window.innerWidth;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.currentRoute = this.router.url;
    
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
