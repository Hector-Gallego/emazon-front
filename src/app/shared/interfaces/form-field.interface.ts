import { ValidatorFn } from "@angular/forms";
import { InputType } from "../enums/inputs-type.enum";

export interface FormField {
  label: string;
  formControlName: string;
  type: InputType; 
  placeholder?: string;
  options?: { value: string, label: string }[]; 
  selectionLimit?: number; 
  validators?: ValidatorFn[]; 
}
