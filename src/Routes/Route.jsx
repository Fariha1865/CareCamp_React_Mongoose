import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import MenuPage from "../pages/Menu/MenuPage";
import Order from "../pages/order/Order";
import Dashboard from "../layout/Dashboard";
import Users from "../pages/dashboard/Users";
import PrivateRoute from "./Privateroute";
import AdminRoute from "./AdminRoute";
import Login2 from "../pages/login/Login2";
import Register from "../pages/register/Register";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/menu",
            element: <MenuPage/>
        },
        {
            path: "/order/:category",
            element: <Order/>
        },
        {
            path: "/login",
            element: <Login2/>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [

        {
            path: "users",
            element: <Users/>
        },
       
    ]
  },
]);

export default router;