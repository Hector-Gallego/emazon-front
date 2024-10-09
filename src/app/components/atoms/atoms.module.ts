import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button/button.component";
import { DivisorComponent } from "./divisor/divisor.component";
import { IconComponent } from "./icon/icon.component";
import { InputComponent } from "./input/input.component";
import { LoaderComponent } from "./loader/loader.component";
import { LogoComponent } from "./logo/logo.component";
import { NavigationBarButtonComponent } from "./navigation-bar-buttom/navigation-bar-button.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@NgModule({
    declarations:[
        ButtonComponent,
        DivisorComponent,
        IconComponent,
        InputComponent,
        LoaderComponent,
        LogoComponent,
        NavigationBarButtonComponent
    ],
    imports:[
        FontAwesomeModule,
        FormsModule,
        CommonModule],
    exports: [  ButtonComponent,
        DivisorComponent,
        IconComponent,
        InputComponent,
        LoaderComponent,
        LogoComponent,
        NavigationBarButtonComponent]

})

export class AtomsModule{}