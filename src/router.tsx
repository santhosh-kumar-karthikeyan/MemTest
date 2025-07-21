import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Signin, Signup } from "./components";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
]);
