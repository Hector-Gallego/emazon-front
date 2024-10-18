import { NgModule } from "@angular/core";
import { MainLayaoutComponent } from "./main-layaout/main-layaout.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { OrganismModule } from "../components/organism/organism.module";


@NgModule({

    declarations:[MainLayaoutComponent],
    imports: [SharedModule, AppRoutingModule, OrganismModule],
    exports: [MainLayaoutComponent]
}) export class TemplatesModule {}