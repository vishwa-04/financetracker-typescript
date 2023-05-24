import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import FinanceTracker from "../user/form";

export default function UpdateTransaction() {
  const { id } = useParams();

  
  
  const transaction_redux = useAppSelector((state: RootState) =>
    state.transaction.find((ele: any) => ele.id == id)
  );

  return (
    <div>
      {
        <FinanceTracker
          id={id}
          updateFormValue={transaction_redux}
          isUpdate={true}
        />
      }
    </div>
  );
}
