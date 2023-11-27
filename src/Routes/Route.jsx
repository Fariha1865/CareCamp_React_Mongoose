import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
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
import OrganiserDashboard from "../layout/OrganiserDashboard";
import OrganiserProfile from "../pages/organiserDashboard/OrganiserProfile";
import AddCamp from "../pages/organiserDashboard/AddCamp";





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
  {
    path: "/organizerDashboard",
    element: <OrganiserDashboard/>,
    children: [

        {
            path: "organizer",
            element: <OrganiserProfile/>
        },
 
        {
            path: "addCamp",
            element: <AddCamp/>
        },
 
    ]
  },
]);

export default router;