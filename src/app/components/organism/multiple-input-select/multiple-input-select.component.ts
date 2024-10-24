import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  faAdd,
  faClose,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { InputState } from 'src/app/shared/enums/input-state.enum';

@Component({
  selector: 'app-multiple-input-select',
  templateUrl: './multiple-input-select.component.html',
  styleUrls: ['./multiple-input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleInputSelectComponent),
      multi: true,
    },
  ],
})
export class MultipleInputSelectComponent implements ControlValueAccessor {
  value: string[] = [];
  onChange: (value: string[]) => void = () => undefined;
  onTouched: () => void = () => undefined;

  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() errorMessage: string = '';
  @Input() state: InputState = InputState.DEFAULT;
  @Output() selectionChange: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  inputSatateError: InputState = InputState.ERROR;
  selectedValues: string[] = [];
  faCloseIcon: IconDefinition = faClose;
  faAddIcon: IconDefinition = faAdd;
  buttonSize: ButtonSize = ButtonSize.S;

  writeValue(value: string[]): void {
    this.selectedValues = value || [];
    this.value = this.selectedValues;
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  onSelectionChange(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.selectedValues = Array.from(selectedOptions).map(
      (option) => option.value
    );

    this.onChange(this.selectedValues);
    this.onTouched();
    this.selectionChange.emit(this.selectedValues);
  }

  getOptionLabel(value: string): string {
    const option = this.options.find((opt) => opt.value === value);
    return option ? option.label : '';
  }

  isSelected(value: string): boolean {
    return this.selectedValues.includes(value);
  }

  addSelection(value: string): void {
    if (!this.isSelected(value)) {
      this.selectedValues.push(value);
      this.updateSelections();
    }
  }

  updateSelections(): void {
    this.value = [...this.selectedValues];
    this.onChange(this.selectedValues);
    this.onTouched();
    this.selectionChange.emit(this.selectedValues);
  }

  removeSelection(value: string): void {
    this.selectedValues = this.selectedValues.filter((v) => v !== value);
    this.updateSelections();
  }
}
