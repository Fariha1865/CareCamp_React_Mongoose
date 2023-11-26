import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/AxiosSecure";
import "./details.css"
import { Button } from "flowbite-react";
import SectionTitle from "../../Components/SectionTitle";
import banner from "../../assets/banner2.gif"
import UserData from "../../hooks/UserData";
import {Modal} from 'flowbite-react';
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import Swal from "sweetalert2";



const CampDetails = () => {

    const [openModal, setOpenModal] = useState(false);


    function onCloseModal() {
        setOpenModal(false);

    }

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [camp, setCamp] = useState([]);
    const [userData] = UserData();
    const axiosSecureCalls = useAxiosSecureCalls();


    const url = `/details/${id}`

    useEffect(() => {

        axiosSecure.get(url)
            .then(result => {

                console.log(result)
                setCamp(result?.data[0])
            })

    }, [axiosSecure, url])

    const handleSubmit = e => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const registeredParticipant = {
            name: formData.get('name'),
            email: formData.get('email'),
            age: formData.get('age'),
            phone: formData.get('phone'),
            gender: formData.get('gender'),
            address: formData.get('address'),
            special: formData.get('special'),
            emergency: formData.get('emergency'),
        };
        console.log(registeredParticipant)

        axiosSecureCalls.post("/joinedParticipants",registeredParticipant)
        .then(result=>{
            console.log(result)
        })
        setOpenModal(false);
        Swal.fire("Invalid login credentials");
    }

    return (
        <div className="max-w-6xl mx-auto pt-24">
            <SectionTitle subheading="" heading={camp?.CampName}></SectionTitle>
            <div className="flex flex-col lg:flex-row items-center  justify-between">
                <img src={camp?.Image} alt="" className="border-solid border-2 border-blue-900 w-[710px] h-[350px]" />


                <div className="card2">
                    <div className="content2">
                        <div className="back">
                            <div className="back-content">
                                <div className="flex flex-col gap-3 border-blue-300 border-solid border-2 py-20 px-3">
                                    <h1><span className="text-lg text-blue-800 font-bold underline mr-5">Camp Name:</span> {camp?.CampName}</h1>
                                    <h1><span className="text-lg text-blue-800 font-bold underline mr-5">Location:</span> {camp?.Venue}, {camp?.Location}</h1>
                                    <h1><span className="text-lg text-blue-800 font-bold underline mr-5">Date & Time:</span> {camp?.ScheduledDateTime}</h1>
                                    <h1><span className="text-lg text-blue-800 font-bold underline mr-5">Target Audience:</span> {camp?.TargetAudience}</h1>
                                    <h1><span className="text-lg text-blue-800 font-bold underline mr-5">Total Registered Participants:</span> {camp?.Participants}</h1>
                                    <h1><span className="text-lg text-blue-800 font-bold underline mr-5">Camp Fees:</span> {camp?.CampFees}</h1>

                                    {
                                        userData[0]?.role === "Participant" ?
                                            <Button onClick={() => setOpenModal(true)} gradientDuoTone="greenToBlue" className="mt-4">Join This Camp</Button>
                                            :
                                            ""
                                    }

                                </div>

                            </div>
                        </div>
                        <div className="front">

                            <div className="img">
                                <div className="circle">
                                </div>
                                <div className="circle" id="right">
                                </div>
                                <div className="circle" id="bottom">
                                </div>
                            </div>

                            <div className="front-content">
                                <small className="badge">Interested ?</small>
                                <div className="description">
                                    <div className="title">
                                        {
                                            userData[0]?.role === "Participant" ?
                                                <Button onClick={() => setOpenModal(true)} gradientDuoTone="greenToBlue" className="mt-4">Join This Camp</Button>
                                                :
                                                ""
                                        }

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h1 className="mt-10 font-serif text-lg shadow-2xl p-5">{camp?.Description}</h1>

            <div className="mb-20 mt-28">
                <div className="flex flex-col md:flex-row justify-between items-center ">
                    <div>
                        <h1 className="text-black font-bold text-xl"><span className="text-blue-800 underline mb-3">Specialized Services:</span><br /> </h1>
                        <ul className="list-disc list-inside mt-3">
                            {camp?.SpecializedServices?.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))}
                        </ul>
                    </div>
                    <img src={banner} alt="" className="w-[300px] h-[100px]" />
                    <div>
                        <h1 className="text-black font-bold text-xl"><span className="text-blue-800 underline mb-3">Healthcare Professionals:</span><br /> </h1>
                        <ul className="list-disc list-inside mt-3">
                            {camp?.HealthcareProfessionals?.map((service, index) => (
                                <li key={index}>{service?.Name}, {service?.Specialty}</li>
                            ))}
                        </ul>
                    </div>


                </div>
            </div>


            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <h1 className="text-center font-bold mb-5 text-blue-700">Register to join {camp?.CampName} !</h1>
                <Modal.Body>
                    <div className="">
                        <form className="h-[600px]" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4 p-6">
                                <div className="flex gap-5">
                                    <div className="relative h-11 ">
                                        <input type="name" name="name" required
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Enter Your Name*
                                        </label>
                                    </div>
                                    <div className="relative h-11  ">
                                        <input type="email" name="email" required
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Enter Your Email*
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="relative h-11 ">
                                        <input type="age" name="age" required
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Enter Your Age*
                                        </label>
                                    </div>
                                    <div className="relative h-11  ">
                                        <input type="phone" name="phone" required
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Your Phone Number*
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div>
                                        <select className="rounded-md border border-blue-700" required name="gender">
                                            <option value="">Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>


                                        </select>


                                    </div>
                                    <div className="relative h-11  ">
                                        <input type="phone" name="phone" value={camp?.CampFees} readOnly
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Fees
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message">Enter Your Address*:</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={2} // Set the number of rows you want
                                        cols={32} // Set the number of columns you want
                                        placeholder="Enter your message here"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message">Specific Health Information:</label>
                                    <textarea
                                        id="special"
                                        name="special"
                                        rows={2}
                                        cols={34}
                                        placeholder="Diabetes, Blood pressure, Kidney Disease or any other health complexity ?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message">Your Emergency Contact:</label>
                                    <textarea
                                        id="emergency"
                                        name="emergency"
                                        rows={2}
                                        cols={34}
                                        placeholder="Emergency Contact Information"
                                    />
                                </div>

                            </div>

                            <div className="p-0">
                                <input type="submit" value="Join Camp" className="block w-full select-none rounded-lg bg-blue-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                />



                            </div>

                        </form>
                    </div>
                </Modal.Body>
            </Modal>



        </div>
    );
};

export default CampDetails;