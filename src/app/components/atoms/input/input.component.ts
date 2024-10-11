import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


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

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: any) {
  
    const inputValue = event.target.value;
    this.value = inputValue;
    this.onChange(this.value);
    this.onTouched();
  }
  
}
