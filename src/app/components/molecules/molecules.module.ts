import { NgModule } from "@angular/core";
import { ToastComponent } from "./toast/toast.component";
import { AtomsModule } from "../atoms/atoms.module";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations:[
     ToastComponent,    
    ],
    imports:[
        AtomsModule,
        CommonModule],
    exports: [ToastComponent ]

})

export class MoleculesModule{}