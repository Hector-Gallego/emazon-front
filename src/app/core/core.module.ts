import { NgModule } from "@angular/core";
import { ShowForRolesDirective } from "./directives/show-for-roles/show-for-roles.directive";
import { CommonModule } from "@angular/common";

@NgModule({

    declarations: [ShowForRolesDirective],
    imports: [CommonModule],
    exports: [ShowForRolesDirective],

}) export class CoreModule{}