import { FaBook, FaEnvelope, FaHome, FaList, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";




const OrganiserDashboard = () => {


    // // TODO: get isAdmin value from the database
    // // const [isAdmin] = useAdmin();
    // const [isAdmin] = useAdmin();
    // const [users] = UserData();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-blue-200">
                <ul className="menu p-4 mt-10">


                    <li className="flex gap-2 items-center">
                        <FaHome></FaHome>
                        <NavLink to="/organizerDashboard/organizer">

                            Organizer Profile</NavLink>
                    </li>
                    <li className="mt-5 flex gap-2 items-center">
                        <FaUtensils></FaUtensils>
                        <NavLink to="/organizerDashboard/addCamp">

                            Add Camp</NavLink>
                    </li>
                    <li className="mt-5 flex gap-2 items-center">
                        <FaList></FaList>
                        <NavLink to="/organizerDashboard/manageCamp">

                            Manage Camps</NavLink>
                    </li>
                    <li className="mt-5 mb-5 flex gap-2 items-center">
                        <FaBook></FaBook>
                        <NavLink to="/organizerDashboard/manageRegisteredCamp">

                            Manage Registered Camps
                        </NavLink>
                    </li>


                    <hr className="border-solid border-2 border-blue-400"></hr>

                    <div className="divider mt-10"></div>
                    <li className="flex gap-2 items-center">
                        <FaHome></FaHome>
                        <NavLink to="/">

                            Home</NavLink>
                    </li>

                    <li className="mt-5 flex gap-2 items-center">
                        <FaEnvelope></FaEnvelope>
                        <NavLink to="">

                            Contact</NavLink>
                    </li>
                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );

};

export default OrganiserDashboard;
