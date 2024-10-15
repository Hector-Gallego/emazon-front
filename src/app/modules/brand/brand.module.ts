import { NgModule } from "@angular/core";
import { BrandFormComponent } from "./components/organism/brand-form/brand-form.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DesignSystemModule } from "src/app/design-system/design-system.module";

@NgModule({

    declarations:[BrandFormComponent],
    imports: [SharedModule, DesignSystemModule],
    exports: [BrandFormComponent],

}) export class BrandModule{}