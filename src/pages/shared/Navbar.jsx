import { NavLink } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
'use client';

import { Dropdown, Navbar } from 'flowbite-react';

const NavigationBar = () => {

    const { user, logOut } = UseAuth();




    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))

    }



    const NavLinks = <>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center text-base font-extrabold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Available Camps</NavLink>
            <NavLink to="/order/pizza">Our Shop</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
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
                                    <span className="block text-sm">Bonnie Green</span>
                                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
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