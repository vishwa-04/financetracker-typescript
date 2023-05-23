import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../Redux/store";
import FinanceTracker from "../user/form";

export default function UpdateTransaction() {
  const { id } = useParams();
  const transaction_redux = useSelector((state: RootState) =>
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
