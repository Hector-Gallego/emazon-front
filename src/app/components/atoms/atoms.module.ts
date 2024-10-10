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
import { LabelComponent } from './label/label.component';
@NgModule({
    declarations:[
        ButtonComponent,
        DivisorComponent,
        IconComponent,
        InputComponent,
        LoaderComponent,
        LogoComponent,
        NavigationBarButtonComponent,
        LabelComponent
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
        NavigationBarButtonComponent,
        LabelComponent]

})

export class AtomsModule{}