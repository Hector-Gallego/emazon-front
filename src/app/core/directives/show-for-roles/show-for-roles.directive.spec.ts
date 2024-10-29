import { ShowForRolesDirective } from './show-for-roles.directive';
import { TokenService } from '../../services/token-service/token.service';
import { ViewContainerRef, TemplateRef } from '@angular/core';
import { Role } from 'src/app/shared/enums/role.enum';

describe('ShowForRolesDirective', () => {
  let directive: ShowForRolesDirective;
  let mockTokenService: Partial<TokenService>;
  let mockViewContainerRef: Partial<ViewContainerRef>;
  let mockTemplateRef: Partial<TemplateRef<any>>;

  beforeEach(() => {
    mockTokenService = {
      getRoleUser: jest.fn(),
    };
    mockViewContainerRef = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn(),
    };
    mockTemplateRef = {};

    directive = new ShowForRolesDirective(
      mockTokenService as TokenService,
      mockViewContainerRef as ViewContainerRef,
      mockTemplateRef as TemplateRef<any>
    );
  });

  it('debería crear una instancia', () => {
    expect(directive).toBeTruthy();
  });

  it('debería mostrar la vista para roles permitidos', () => {
    const userRole = Role.ADMIN;
    const allowRoles = [Role.ADMIN, Role.CLIENT];

    (mockTokenService.getRoleUser as jest.Mock).mockReturnValue(userRole);
    directive.allowRoles = allowRoles;

    directive.ngOnInit();

    expect(mockViewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
      mockTemplateRef
    );
  });

  it('debería limpiar la vista para roles no permitidos', () => {
    const userRole = 'guest';
    const allowRoles = [Role.ADMIN, Role.CLIENT];

    (mockTokenService.getRoleUser as jest.Mock).mockReturnValue(userRole);
    directive.allowRoles = allowRoles;
    directive.ngOnInit();

    expect(mockViewContainerRef.clear).toHaveBeenCalled();
  });
});
