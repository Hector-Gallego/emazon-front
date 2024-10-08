import { Component, ViewChild } from '@angular/core';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { CategoryFormComponent } from 'src/app/components/organism/category-form/category-form.component';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ErrorMessages, StatesTypes } from 'src/app/shared/constants/commonConstants';


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
        console.log(response);
        this.toastMessage = response.message;
        this.toastType = StatesTypes.SUCCESS;
        this.toast.show();
        this.categoryForm.resetForm();
        this.loaderService.hide();
      },
      error: (error) => {

        if(error.error && error.error.message){
          this.toastMessage = error.error.message;
        }else{
          this.toastMessage = ErrorMessages.GENERIC_ERROR_MESSAGE;
        }
        
        this.toastType = StatesTypes.ERROR;
        this.toast.show();
        this.loaderService.hide();
      },
      complete:() =>{
        this.loaderService.hide();
      }

    });

  
  }
}
