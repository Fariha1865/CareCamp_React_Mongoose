import { NavLink } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
'use client';

import { Dropdown, Navbar } from 'flowbite-react';
import UserData from "../../hooks/UserData";
import useAxiosSecure from "../../hooks/AxiosSecure";
import { useEffect, useState } from "react";

const NavigationBar = () => {

    const { user, logOut } = UseAuth();
    const [userData] = UserData();
    const axiosSecure = useAxiosSecure();
    const [userRole, setUserRole] = useState(null);



    useEffect(() => {

        axiosSecure.get(`user/${user?.email}`)
            .then(res => {
                const role = res?.data[0]?.role;
                setUserRole(role);
            })
            .catch(error => {
                console.error("Error fetching user role:", error);
            });
    }, [axiosSecure, user?.email]);


    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))

    }



    const NavLinks = <>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center text-base font-extrabold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/allCamps">Available Camps</NavLink>
            <NavLink to="/order/pizza">Our Shop</NavLink>
            {
                userRole === "Participant" ? 

                <NavLink to="participantDashboard/participant">PDashboard</NavLink>

                :
                userRole === "Organizer" ? 

                <NavLink to="organizerDashboard/organizer">ODashboard</NavLink>
                :
                userRole === "Healthcare Professional" ? 
                <NavLink to="professionalsDashboard/professional">HDashboard</NavLink>
                :
                <NavLink to="adminDashboard/admin">Dashboard</NavLink>
            }

        </div>
    </>
    return (

        <>
            <Navbar fluid rounded className="fixed z-10 w-screen bg-[#00546a] bg-opacity-30 text-white font-bold text-2xl">
                <Navbar.Brand>
                    <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="" />

                </Navbar.Brand>


                <div className="flex md:order-2 lg:mr-10">
                    {
                        user ?
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <img alt="User settings" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className="w-14 h-14 border-solid border-blue-700 border-4 rounded-full" />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm mb-3">{user?.displayName}</span>
                                    <span className="block truncate text-sm font-medium mb-3">{user?.email}</span>
                                    <span className="block truncate text-sm font-bold text-blue-800">Role: {userData[0]?.role}</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                {/* <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item> */}
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                            </Dropdown>
                            : <div className="flex gap-10">
                                <NavLink to="/login">Sign In</NavLink>
                                <NavLink to="/register">Sign Up</NavLink>
                            </div>
                    }
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    {NavLinks}
                </Navbar.Collapse>
            </Navbar>
        </>

    );
};

export default NavigationBar;