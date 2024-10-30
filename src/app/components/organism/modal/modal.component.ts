import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { InputState } from 'src/app/shared/enums/input-state.enum';
import { FormControlErrorsMapper } from 'src/app/shared/mappers/form-control-errors-mapper/form-control-errors.mapper';
import { CustomValidator } from 'src/app/shared/validators/custom-validator.validator';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  quantity: number | null = null;
  quantityControl: FormControl = new FormControl('', [Validators.required]);

  @Output() quantityAddStock = new EventEmitter<number>();
  @Input() top: string = '0px';
  @Input() left: string = '0px';
  @Output() close = new EventEmitter<void>();
  @Input() articleID: number = 0;
  @Input() articleName: string = '';
  @Input() articleStock: number = 0;
  inputTypeContentNumber: InputContentType = InputContentType.NUMBER;

  onClose() {
    this.close.emit(); 
  }

  formGroup: FormGroup;

  inputStateError: InputState = InputState.ERROR;
  InputStateDefault: InputState = InputState.DEFAULT;
  buttonTypeSecundary : ButtonType = ButtonType.SECUNDARY;
  buttonTypeSecundaryCancel : ButtonType = ButtonType.SECUNDARY_CANCEL


  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      quantity: ['', [Validators.required, CustomValidator.integer(), Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.quantityAddStock.emit(this.formGroup.value['quantity']);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
    return FormControlErrorsMapper.mapErrorMessage(control, 0, 0);
 
  }

  
}
