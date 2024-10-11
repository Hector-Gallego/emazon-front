import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor  {

  @Input() placeholder!: string;
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() state: 'default' | 'error' = 'default';
  @Input() inputClass!: string;
  @Input() isTextarea: boolean = false;
  @Input() errorMessage: string = '';

  value: string = '';
  disabled: boolean = false;

  onChange: (value: string) => void = () => undefined;
  onTouched: () => void = () => undefined;

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
    
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(this.value);
    this.onTouched();
  }
  
}
