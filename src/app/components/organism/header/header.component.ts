import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faShoppingCart, faSignOut, faStore, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

  faIconShoppingCar : IconDefinition = faShoppingCart;
  faIconUser : IconDefinition = faUser;
  faLogoutIcon : IconDefinition = faSignOut;
  faArticlesIcon : IconDefinition = faStore;
  menuIcon : IconDefinition = faBars;
  subscription = new Subscription();
  active : boolean = true;
  currentRoute: string = '';
  @Input() isAdmin: boolean = false;

  constructor(private readonly router: Router){}
  ngOnInit(): void {
    const subs = this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event) => {
      const navigationEndEvent = event as NavigationEnd;
      this.currentRoute = navigationEndEvent.url;
    });

  this.subscription.add(subs);
  }

  onNavigateto(): void{
    this.router.navigate(['/articulos']);
  }

  setActive() : void {
    this.active = !this.active;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
