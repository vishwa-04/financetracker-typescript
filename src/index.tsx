import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./Components/login";
import reportWebVitals from "./reportWebVitals";
import ViewTransaction from "./Components/transaction";
import UpdateTransaction from "./Components/update";
import Registration from "./Components/registration";
import FinanceTracker from "./pages/user/form";
import Error from "./Components/Error";
import { Cookies, CookiesProvider } from "react-cookie";
import { FinanceStore } from "./Redux/store";
import { Provider } from "react-redux";
import ShowTable from "./Components/showTable";
// import ErrorBoundary from "react-error-boundary";
// import { Fallback } from "./pages/Component/fallback";

const Protected = (props: any) => {
  const login = new Cookies().get("mycookie");
  const { isPublic, cmp } = props;
  if (isPublic) {
    if (!login) {
      return cmp;
    } else {
      return <Navigate to="/showTable" />;
    }
  } else {
    if (login) {
      return cmp;
    } else {
      return <Navigate to="/login" />;
    }
  }
};
// const errorHandler = (error: any, errorInfo: any) => {
//   console.log("logging", error, errorInfo);
// };
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Navigate to={"/showTable"} />} />

      <Route
        path="login"
        element={
          // <ErrorBoundary
          //   FallbackComponent={({ error, resetErrorBoundary }) => (
          //     <Fallback error={error} resetErrorBoundary={resetErrorBoundary} />
          //   )}
          //   onError={errorHandler}
          // >
          <Protected isPublic cmp={<Login />} />
          // </ErrorBoundary>
        }
      />
      <Route
        path="registration"
        element={<Protected isPublic cmp={<Registration />} />}
      />
      <Route path="showTable">
        <Route path="" element={<Protected cmp={<ShowTable />} />} />
        <Route path=":id" element={<Protected cmp={<ViewTransaction />} />} />
        <Route path="create" element={<Protected cmp={<FinanceTracker />} />} />
        <Route
          path="update/:id"
          element={<Protected cmp={<UpdateTransaction />} />}
        />
      </Route>
      <Route path="/*" element={<Error />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CookiesProvider>
    <Provider store={FinanceStore}>
      <RouterProvider router={router} />
    </Provider>
  </CookiesProvider>
);
reportWebVitals();
