import { createSlice } from "@reduxjs/toolkit";
import { DefaultJson } from "../../defaultvalue";
import { formValue } from "../../models/interface";

export type InitValue = formValue[];
const initialState: InitValue = DefaultJson;
export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      if (state.length === 0) {
        return (state = action.payload);
      } else {
        state.push(action.payload);
      }
    },
    updateTransaction: (state, action) => {
      const { formValues, id } = action.payload;
      const index = state.findIndex((ele) => ele.id === parseInt(id));

      state[index] = formValues;
    },
    deleteTransaction: (state, action) => {
      const id = action.payload;

      let filterReduxData = state;
      const filterDeleteData = filterReduxData.filter((element, index) => {
        return element.id !== id;
      });
      return filterDeleteData;
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  TransactionSlice.actions;

export default TransactionSlice.reducer;
