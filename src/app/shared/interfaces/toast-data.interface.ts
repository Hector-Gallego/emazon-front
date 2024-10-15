import { StatesTypes } from "../constants/commonConstants";

export interface ToastData {
    message: string;
    duration: number;
    type: StatesTypes;
  }
  