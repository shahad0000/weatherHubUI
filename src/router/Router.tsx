import { createBrowserRouter, RouterProvider } from "react-router";
import Signup from "../components/Signup";
import Weather from "../components/Weather";
import Login from "../components/Login";
import Layout from "../components/Layout";
import History from "../components/history";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    { path: "/", element: <Weather /> },
      { path: "/signin", element: <Login /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/weather", element: <Weather /> },
      { path: "/history", element: <History /> },

    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;