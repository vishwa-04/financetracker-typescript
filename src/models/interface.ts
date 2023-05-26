export interface formValue {
  [key: string]: any;
  transDate: string;
  month: string;
  transType: string;
  frmAcc: string;
  toAcc: string;
  amount: string;
  filename: string;
  notes: string;
  id?: number;
}
export interface loginReduxValue {
  username: string;
  email: string;
  password: string;
  id: number;
}
