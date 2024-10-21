import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BrandFieldLimits } from 'src/app/shared/constants/brand.constant';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';

@Component({
  selector: 'app-add-article-page',
  templateUrl: './add-article-page.component.html',
  styleUrls: ['./add-article-page.component.scss']
})
export class AddArticlePageComponent implements OnInit {


  articleFields: FormField[] = [
    {
      label: 'Nombre',
      formControlName: 'name',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingresa el nombre',
      validators: [
        Validators.required,
        Validators.maxLength(BrandFieldLimits.MAX_LENGTH_BRAND_NAME_FIELD),
      ],
    },
    {
      label: 'Descripción',
      formControlName: 'description',
      contentType: InputContentType.TEXT,
      type: InputType.TEXTAREA,
      placeholder: 'Ingresa la descripción',
      validators: [
        Validators.required,
        Validators.maxLength(
          BrandFieldLimits.MAX_LENGTH_BRAND_DESCRIPTION_FIELD
        ),
      ],
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(artilceDataForm: Article){

  }

}
