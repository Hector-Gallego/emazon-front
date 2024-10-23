import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputState } from 'src/app/shared/enums/input-state.enum';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent implements ControlValueAccessor {
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() options: { value: string; label: string }[] = [];
  @Input() state: InputState = InputState.DEFAULT;
  @Input() errorMessage : string = '';
  @Input() borderType: string = '';

  value: string = '';
  inputStateError : InputState = InputState.ERROR;
  onChange: (value: string) => void = () => undefined;
  onTouched: () => void = () => undefined;

  selectedValue: string = '';

  writeValue(value: string): void {
    this.selectedValue = value || '';
    this.value = this.selectedValue;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  onSelectionChange(event: Event): void {
    this.selectedValue = (event.target as HTMLSelectElement).value;
    this.onChange(this.selectedValue);
    this.onTouched();
    this.selectionChange.emit(this.selectedValue);
  }
}
