import { Component, OnInit, ViewChild } from '@angular/core';
import { error } from 'console';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { CategoryFormComponent } from 'src/app/components/organism/category-form/category-form.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss']
})
export class AddCategoryPageComponent{

  constructor(private categoryService: CategoryService, private loaderService: LoaderService){}
  @ViewChild(ToastComponent) toast!: ToastComponent;
  @ViewChild(CategoryFormComponent) categoryForm! : CategoryFormComponent;

  toastMessage: string = '';
  toastType: any;
 

  onFormSubmit(formData: any){
    
    this.loaderService.show();
    this.categoryService.addCategory(formData).subscribe({

      
      next: (response) =>{
        this.toastMessage = '¡Categoría agregada exitosamente!';
        this.toastType = 'success';
        console.log("formuario enviado: ", formData)
        this.toast.show();
        this.categoryForm.resetForm();
        this.loaderService.hide();
      },
      error: (error) => {
        this.toastMessage = 'Ha ocurrido un error, porfavor intentalo nuevamente.';
        this.toastType = 'error';
        this.toast.show();
        this.loaderService.hide();
        console.log(error);
      },
      complete:() =>{
        this.loaderService.hide();
      }

    });

  
  }
}
