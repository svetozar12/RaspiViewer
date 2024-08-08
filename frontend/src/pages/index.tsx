import { createBrowserRouter } from "react-router-dom";
import DevicesList from "../components/Devices/DeviceList/DevicesList";
import DevicesDetails from "../components/Devices/DeviceDetails/DeviceDetails";
import ErrorPage from "./errorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Login</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/devices",
    element: <DevicesList />,
  },
  {
    path: "/devices/:id",
    element: <DevicesDetails />,
  },
]);
