import { Injectable } from '@angular/core';
import {
  CanLoad,
  Router,
} from '@angular/router';

import { TokenService } from '../../services/token-service/token.service';

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
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
