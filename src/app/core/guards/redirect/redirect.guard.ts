import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token-service/token.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}


  canActivate() : boolean{
    const isValidToken = this.tokenService.isValidToken();

    if(isValidToken){
      this.router.navigate(['/page/articulos']);
    }
    return true;
  }
  
}
