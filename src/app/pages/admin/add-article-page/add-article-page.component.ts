import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { finalize, Observable, Subscription } from 'rxjs';
import { FormComponent } from 'src/app/components/organism/form/form.component';
import { ArticleFieldLimits } from 'src/app/shared/constants/article.constant';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { FormField } from 'src/app/shared/interfaces/form-field.interface';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { CustomValidator } from 'src/app/shared/validators/custom-validator.validator';

@Component({
  selector: 'app-add-article-page',
  templateUrl: './add-article-page.component.html',
  styleUrls: ['./add-article-page.component.scss'],
})
export class AddArticlePageComponent implements OnInit, OnDestroy {
  articleFields: FormField[] = [
    {
      label: 'Nombre',
      formControlName: 'name',
      contentType: InputContentType.TEXT,
      type: InputType.INPUT,
      placeholder: 'Ingresa el nombre',
      validators: [
        Validators.required,
        Validators.maxLength(ArticleFieldLimits.MAX_LENGTH_ARTICLE_NAME_FIELD),
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
          ArticleFieldLimits.MAX_LENGTH_ARTICLE_DESCRIPTION_FIELD
        ),
      ],
    },
    {
      label: 'Precio',
      formControlName: 'price',
      contentType: InputContentType.NUMBER,
      type: InputType.INPUT,
      placeholder: 'Ingrese el precio',
      validators: [Validators.required, Validators.min(1)],
    },
    {
      label: 'Cantidad',
      formControlName: 'quantity',
      contentType: InputContentType.NUMBER,
      type: InputType.INPUT,
      placeholder: 'Ingrese la cantidad',
      validators: [
        Validators.required,
        Validators.min(1),
        CustomValidator.integer(),
      ],
    },
    {
      label: 'Marcas',
      formControlName: 'brandId',
      contentType: InputContentType.TEXT,
      type: InputType.SELECT,
      options: [],
      placeholder: 'Seleccione una marca',
      validators: [Validators.required],
    },
    {
      label: 'Categorias',
      formControlName: 'categoryIds',
      contentType: InputContentType.TEXT,
      type: InputType.MULTIPLE_SELECT,
      options: [],
      maxSelectionLimit: 3,
      minSelectionLimit: 1,
      placeholder: 'Seleccione un acategoría',
      validators: [
        Validators.required,
        CustomValidator.minSelectionLimitValidator(1),
        CustomValidator.maxSelectionLimitValidator(3),
      ],
    },
  ];

  @ViewChild(FormComponent) articleForm!: FormComponent<Brand>;
  subscription = new Subscription();
  brands: Brand[] = [];

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  constructor(
    private readonly brandService: BrandPersistenceService,
    private readonly categoryService: CategoryPersistenceService,
    private readonly loader: LoaderService,
    private readonly toastService: ToastService,
    private readonly articleService: ArticlePersistenceService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadBrands(): void {
    this.loadOptions<Brand>(
      this.brandService.getAllBrands.bind(this.brandService),
      4
    );
  }

  loadCategories(): void {
    this.loadOptions<Category>(
      this.categoryService.getAllCategories.bind(this.categoryService),
      5
    );
  }

  loadOptions<T extends Brand | Category>(
    serviceMethod: () => Observable<any>,
    fieldIndex: number
  ): void {
    this.loader.show();

    const optionSubscription = serviceMethod()
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (response) => {
          const entities = response.data;
          const options = entities.map((entity: T) => ({
            value: entity.id ? entity.id.toString() : '0',
            label: entity.name,
          }));
          this.articleFields[fieldIndex].options = options;
        },
        error: (error) => {
        
          this.toastMessage =
            error?.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE;

          this.toastType = StatesTypes.ERROR;
          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
        },
      });
    this.subscription.add(optionSubscription);
  }

  onFormSubmit(artilceDataForm: Article) {
    this.loader.show();
    artilceDataForm.categoryIds = artilceDataForm.categoryIds.map(Number);
    artilceDataForm.brandId = Number(artilceDataForm.brandId);

    const addArticleSubscription = this.articleService

      .addArticle(artilceDataForm)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (response) => {
          this.toastMessage = response.message;
          this.toastType = StatesTypes.SUCCESS;

          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
          this.articleForm.resetForm();
        },
        error: (error) => {
          this.toastMessage =
            error?.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE;

          this.toastType = StatesTypes.ERROR;
          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
        },
      });

    this.subscription.add(addArticleSubscription);
  }

  
}
