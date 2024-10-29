import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { TokenService } from '../../services/token-service/token.service';
import { Role } from 'src/app/shared/enums/role.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.tokenService.getRoleUser();
    const allowedRoles = route.data?.['allowRoles'];
  
    if (!allowedRoles.includes(userRole)) {
    
      const targetRoute = userRole === Role.CLIENT ? '/articulos' : '/admin';
      this.router.navigate([targetRoute]);
      return false;
    }
    return true;
  }
}
