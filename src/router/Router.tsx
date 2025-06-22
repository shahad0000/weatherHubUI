import { createBrowserRouter, RouterProvider } from "react-router";
import Signup from "../components/Signup";
import Weather from "../components/Weather";
import Login from "../components/Login";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    { path: "/", element: <Weather /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/weather", element: <Weather /> },
    
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;