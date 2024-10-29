import { inject, Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { TokenService } from '../../services/token-service/token.service';
import { Role } from 'src/app/shared/enums/role.enum';


export function hasRole(allowedRoles: Role[]) {
  return () => {
    const userRole = inject(TokenService).getRoleUser();
   
    if (!allowedRoles.includes(userRole)) {
      const router = inject(Router);
      const targetRoute = userRole === Role.CLIENT ? '/articulos' : '/admin';
      router.navigate([targetRoute]);
      return false;
    }
    return true;
  };
}
