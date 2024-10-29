import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faBars,
  faSignOut,
  faStore,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ClientRoutes, MainRoutes } from 'src/app/shared/constants/routes.constants';
import { Role } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  faLogoutIcon: IconDefinition = faSignOut;
  faArticlesIcon: IconDefinition = faStore;
  menuIcon: IconDefinition = faBars;
  subscription = new Subscription();
  active: boolean = true;
  currentRoute: string = '';

  roleCleint : Role = Role.CLIENT;
  @Input() isAdmin: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
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

  roleClient = Role.CLIENT;
  roleAux = Role.WAREHOUSE_ASSISTANT;
  roleAdmin = Role.ADMIN;

  menuItems = [
    {
      label: 'Artículos',
      icon: this.faArticlesIcon,
      route: `/${MainRoutes.STORE}/${ClientRoutes.ARTICLES}`,
      roles: [this.roleClient]
    },
    {
      label: 'Cerrar Sesión',
      icon: this.faLogoutIcon,
      route: `${MainRoutes.LOGOUT}`,
      roles: [this.roleAux, this.roleAdmin, this.roleClient],
      isLogout: true 
    }
  ];
  setActive(): void {
    this.active = !this.active;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate([`/${MainRoutes.AUTH}/${MainRoutes.LOGIN}`]);
  }
}
