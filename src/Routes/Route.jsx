import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Order from "../pages/order/Order";
import PrivateRoute from "./Privateroute";
import Login2 from "../pages/login/Login2";
import Register from "../pages/register/Register";
import CampDetails from "../pages/campDetails/CampDetails.";
import AvailableCamps from "../pages/availableCamps/AvailableCamps";
import ParticipantDashboard from "../layout/ParticipantDashboard";
import UserProfile from "../pages/participantDashboard/UserProfile";
import RegisteredCamps from "../pages/participantDashboard/RegisteredCamps";
import Payment from "../pages/participantDashboard/payment/Payment";
import PaymentHistory from "../pages/participantDashboard/PaymentHistory";
import Testimonials from "../pages/participantDashboard/Testimonials";





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
            path: "/allCamps",
            element: <AvailableCamps/>
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
        {
            path: "/details/:id",
            element: <CampDetails/>
        },
    ]
  },
  {
    path: "/participantDashboard",
    element: <ParticipantDashboard/>,
    children: [

        {
            path: "participant",
            element: <UserProfile/>
        },
        {
            path: "registeredCamps",
            element: <RegisteredCamps/>
        },
        {
            path: "payment/:id",
            element: <Payment/>
        },
        {
            path: "paymentHistory",
            element: <PaymentHistory/>
        },
        {
            path: "testimonials",
            element: <Testimonials/>
        },
       
    ]
  },
]);

export default router;