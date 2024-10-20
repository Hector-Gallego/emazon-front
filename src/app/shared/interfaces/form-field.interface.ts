import { ValidatorFn } from "@angular/forms";
import { InputType } from "../enums/inputs-type.enum";
import { InputContentType } from "../enums/input-content-type.enum";

export interface FormField {
  label: string;
  formControlName: string;
  type: InputType; 
  contentType: InputContentType;
  placeholder?: string;
  options?: { value: string, label: string }[]; 
  selectionLimit?: number; 
  validators?: ValidatorFn[]; 
}
