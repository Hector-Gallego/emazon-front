import { NgModule } from "@angular/core";
import { AdminTemplateComponent } from "./admin-template/admin-template.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { OrganismModule } from "../components/organism/organism.module";
import { ClientTemplateComponent } from './client-template/client-template.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';



@NgModule({

    declarations:[AdminTemplateComponent, ClientTemplateComponent, AuthTemplateComponent],
    imports: [SharedModule, AppRoutingModule, OrganismModule],
    exports: [AdminTemplateComponent, ClientTemplateComponent]
}) export class TemplatesModule {}