import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App/index.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);
const rootComponent = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootComponent).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
