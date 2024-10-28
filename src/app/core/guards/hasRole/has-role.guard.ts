import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token-service/token.service';
import { Role } from 'src/app/shared/enums/role.enum';

export function hasRole(allowedRoles: Role[]) {
  return () => {
    const userRole = inject(TokenService).getRoleUSer();
    console.log(allowedRoles);

    if (!allowedRoles.includes(userRole)) {
      const router = inject(Router);
      const targetRoute = userRole === Role.CLIENT ? '/articulos' : '/admin';
      router.navigate([targetRoute]);
      return false;
    }
    return true;
  };
}
