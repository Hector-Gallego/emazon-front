import { Injectable } from '@angular/core';
import {
  CanLoad,
  Router,
} from '@angular/router';

import { TokenService } from '../../services/token-service/token.service';
import { MainRoutes } from 'src/app/shared/constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanLoad {
  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}
  canLoad(): boolean {
    const isValidToken = this.tokenService.isValidToken();
   
    if (!isValidToken) {
      this.router.navigate([`/${MainRoutes.AUTH}/${MainRoutes.LOGIN}`]);
      return false;
    }
    return true;
  }
}
