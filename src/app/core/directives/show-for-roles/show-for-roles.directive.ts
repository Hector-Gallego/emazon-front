import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from 'src/app/shared/enums/role.enum';
import { TokenService } from '../../services/token-service/token.service';

@Directive({
  selector: '[appShowForRoles]',
})
export class ShowForRolesDirective implements OnInit {
  @Input('appShowForRoles') allowRoles?: Role[];
  constructor(
    private readonly tokenService: TokenService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    const userRole = this.tokenService.getRoleUser();

    if (this.allowRoles && this.allowRoles.includes(userRole)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
