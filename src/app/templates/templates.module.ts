import { NgModule } from "@angular/core";
import { MainLayaoutComponent } from "./main-layaout/main-layaout.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { DesignSystemModule } from "../design-system/design-system.module";

@NgModule({

    declarations:[MainLayaoutComponent],
    imports: [SharedModule, AppRoutingModule, DesignSystemModule],
    exports: [MainLayaoutComponent]
}) export class TemplatesModule {}