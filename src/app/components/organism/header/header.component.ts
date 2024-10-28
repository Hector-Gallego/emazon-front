import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  faBars,
  faShoppingCart,
  faSignOut,
  faStore,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Role } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faIconShoppingCar: IconDefinition = faShoppingCart;
  faIconUser: IconDefinition = faUser;
  faLogoutIcon: IconDefinition = faSignOut;
  faArticlesIcon: IconDefinition = faStore;
  menuIcon: IconDefinition = faBars;
  subscription = new Subscription();
  active: boolean = true;
  currentRoute: string = '';
  roleAdmin : Role = Role.ADMIN;
  roleAux : Role = Role.WAREHOUSE_ASSISTANT;
  roleCleint : Role = Role.CLIENT;
  @Input() isAdmin: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    const subs = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd;
        this.currentRoute = navigationEndEvent.url;
      });

    this.subscription.add(subs);
  }

  onNavigateto(): void {
    this.router.navigate(['/tienda/articulos']);
  }

  setActive(): void {
    this.active = !this.active;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
