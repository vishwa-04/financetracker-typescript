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
// import App from './App'
// import Login from "./pages/Component/login";

import reportWebVitals from "./reportWebVitals";
// import ViewTransaction from "./pages/Component/transaction";
import UpdateTransaction from "./pages/Component/update";
// import Registration from "./pages/Component/registration";
import FinanceTracker from "./pages/user/form";
// import Error from "./pages/Component/Error";
import { Cookies, CookiesProvider } from "react-cookie";
// import App from "./App";
import { FinanceStore } from "./pages/Redux/store";
import { Provider } from "react-redux";
import ShowTable from "./pages/Component/showTable";
// import ErrorBoundary from "./pages/Component/ErrorBoundary";

// const Protected = (props: any) => {
//   const login = new Cookies().get("mycookie");
//   const { isPublic, cmp } = props;
//   if (isPublic) {
//     if (!login) {
//       return cmp;
//     } else {
//       return <Navigate to="/showTable" />;
//     }
//   } else {
//     if (login) {
//       return cmp;
//     } else {
//       return <Navigate to="/login" />;
//     }
//   }
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* <Route path="login" element={<Protected isPublic cmp={<Login />} />} /> */}
      {/* <Route
        path="registration"
        element={<Protected isPublic cmp={<Registration />} />}
      /> */}
      <Route path="showTable">
        <Route path="" element={<ShowTable />} />
        {/* <Route path=":id" element={<ViewTransaction />} /> */}
        <Route path="create" element={<FinanceTracker />} />
        <Route path="update/:id" element={<UpdateTransaction />} />
      </Route>
      <Route path="" element={<Navigate to={"/showTable"} />} />
      {/* <Route path="*" element={<Protected cmp={<Error />} />} /> */}
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
