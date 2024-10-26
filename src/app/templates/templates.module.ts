import { NgModule } from "@angular/core";
import { MainLayaoutComponent } from "./main-layaout/main-layaout.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { OrganismModule } from "../components/organism/organism.module";
import { ClientLayaoutComponent } from './client-layaout/client-layaout.component';


@NgModule({

    declarations:[MainLayaoutComponent, ClientLayaoutComponent],
    imports: [SharedModule, AppRoutingModule, OrganismModule],
    exports: [MainLayaoutComponent, ClientLayaoutComponent]
}) export class TemplatesModule {}