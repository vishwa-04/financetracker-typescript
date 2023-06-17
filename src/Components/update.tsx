import React from "react";
import { useParams } from "react-router-dom";
import { formValue } from "../models/interface";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
// import { InitValue } from "../Redux/Transactionduck";
import FinanceTracker from "../pages/user/form";
import Error from "./Error";

export default function UpdateTransaction() {
  const { id } = useParams();

  const transaction_redux = useAppSelector((state: RootState) =>
    // eslint-disable-next-line eqeqeq
    state.transaction.find((ele: formValue) => ele.id == id)
  );

  return (
    <div>
      {transaction_redux ? (
        <FinanceTracker id={Number(id)} updateFormValue={transaction_redux} />
      ) : (
        <Error />
      )}
    </div>
  );
}
