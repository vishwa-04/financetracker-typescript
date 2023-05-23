import { configureStore } from "@reduxjs/toolkit";
// import { type } from "@testing-library/user-event/dist/type";
import TransactionReducer from "./Transactionduck";
// import UserReducer from "./userduck";

export const FinanceStore = configureStore({
  reducer: {
    transaction: TransactionReducer,
  },
});
export type RootState = ReturnType<typeof FinanceStore.getState>
