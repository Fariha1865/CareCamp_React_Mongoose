import { Button, Modal } from "flowbite-react";
import "../home/style.css"
import Aos from "aos";
import { Link } from "react-router-dom";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import Swal from "sweetalert2";
import { useState } from "react";

const AvailableCamp = ({ camp }) => {


    const axiosSecureCalls = useAxiosSecureCalls();

    Aos.init({
        duration: 2000,
        easing: 'ease-out-cubic'
    });

    const [openModal, setOpenModal] = useState(false);


    function onCloseModal() {
        setOpenModal(false);

    }


    const handleSubmit = (campId, e) => {
        e.preventDefault();
        console.log(campId)

        const form = e.target;
        const formData = new FormData(form);

        const registeredParticipant = {

            campData: camp,
            name: formData.get('name'),
            email: formData.get('email'),
            age: formData.get('age'),
            phone: formData.get('phone'),
            gender: formData.get('gender'),
            address: formData.get('address'),
            special: formData.get('special'),
            emergency: formData.get('emergency'),
            payment: "Unpaid"
        };
        console.log(registeredParticipant)

        axiosSecureCalls.post("/joinedParticipants", registeredParticipant)
            .then(result => {
                console.log(result)
            })
        setOpenModal(false);
        Swal.fire("You joined this camp successfully");
    }



    return (
        <div className="mb-10">

            {/* <div data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"> */}
            <div data-aos="zoom-in">
                <div className="card transform hover:scale-105 transition duration-300 ease-in-out">
                    <div className="bg p-3">
                        <img src={camp?.Image} alt="" className="w-full h-36" />
                        <h1 className="text-black text-lg font-bold text-center mt-3">{camp?.CampName}</h1>
                        <h1 className="text-black font-bold text-center text-sm mt-2"><span className="text-blue-800">Date:</span> {camp?.ScheduledDateTime}, <span className="text-blue-800">Participants:</span> {camp?.Participants}</h1>
                        <div className="flex gap-10 items-center mt-1 h-10">
                            <h1 className="text-black font-bold text-xs"><span className="text-blue-800">CampFees:</span> ${camp?.CampFees}</h1>
                            <h1 className="text-black font-bold text-xs">{camp?.Venue}, {camp?.Location}</h1>
                        </div>
                        <div className="flex gap-10 items-center mt-1 h-20">
                            <h1 className="text-black font-bold text-xs"><span className="text-blue-800 underline mb-3">Specialized Services:</span><br /> {camp?.SpecializedServices}</h1>
                            <h1 className="text-black font-bold text-xs"><span className="text-blue-800 underline mb-3">Healthcare Professionals:</span><br /> {camp?.HealthcareProfessionals}</h1>

                        </div>
                        <h1 className="text-black font-bold text-xs mt-2"><span className="text-blue-800">Target Audience:</span> {camp?.TargetAudience}</h1>
                        <div className="flex mt-5 justify-end">

                            <Link to={`/details/${camp?._id}`}><Button onClick={() => setOpenModal(true)} gradientDuoTone="greenToBlue" >Details</Button></Link>
                            {/* <Button onClick={() => setOpenModal(true)} gradientDuoTone="greenToBlue" >Join Camp</Button> */}
                        </div>
                    </div>
                    <div className="blob">

                    </div>

                </div>
            </div>





            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <h1 className="text-center font-bold mb-5 text-blue-700">Register to join {camp?.CampName} !</h1>
                <Modal.Body>
                    <div className="">
                        <form className="h-[600px]" onSubmit={(e) => handleSubmit(camp?._id, e)}>
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

export default AvailableCamp;