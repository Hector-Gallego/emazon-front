export interface FormField {
  label: string;
  formControlName: string;
  type: 'input' | 'textarea' | 'select' | 'text'; 
  placeholder?: string;
  options?: { value: any, label: string }[]; 
  selectionLimit?: number; 
  validators?: any[]; 
}
