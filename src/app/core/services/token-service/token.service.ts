import { Injectable } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Role } from 'src/app/shared/enums/role.enum';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token');

    return token;
  }

  removeToken() {
    removeCookie('token');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();

      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
  
  getRoleUSer(): Role {
    const token = this.getToken();

    if (token) {
      const decodeToken = jwtDecode<CustomJwtPayload>(token);
      if (decodeToken?.role) {
        const role = decodeToken.role;
        console.log(role);
        switch (role) {
          case 'ADMIN':
            return Role.ADMIN;
          case 'WAREHOUSE_ASSISTANT':
            return Role.WAREHOUSE_ASSISTANT;
          case 'CLIENT':
            return Role.CLIENT;
          default:
            return Role.NO_ROLE;
        }
      }
      
    }
    return Role.NO_ROLE;
  }
}
