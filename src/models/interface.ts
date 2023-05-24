export interface formKeys {
    [key:string] : any ;
}


export interface  formValue extends formKeys  {
    transDate: string;
    month: string;
    transType: string;
    frmAcc: string;
    toAcc: string;
    amount: string;
    filename: string;
    notes: string;
    id : number;
  }