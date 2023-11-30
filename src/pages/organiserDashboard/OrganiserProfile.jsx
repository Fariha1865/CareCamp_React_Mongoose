import { Button, Modal } from "flowbite-react";
import UseAuth from "../../hooks/UseAuth";
import UserData from "../../hooks/UserData";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";

const OrganiserProfile = () => {

    const { user } = UseAuth();
    const [userData,refetch] = UserData();
    const [openModal, setOpenModal] = useState(false);
    const axiosSecure = useAxiosSecureCalls();


    function onCloseModal() {
        setOpenModal(false);

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const updatedUser = {


            name: formData.get('name'),
            phone: formData.get('phone'),
            gender: formData.get('gender'),
            interest: formData.get('interest'),
            age: formData.get('age'),
            success: formData.get('success'),

        };

        axiosSecure.put(`/user/${user?.email}`, updatedUser)
            .then(data => {
                console.log(data.data)

                if (data.data.modifiedCount > 0) {
                    Swal.fire(
                        'User Info Updated!',
                        'Profile has been updated successfully',
                        'success',
                    )
                    refetch();
                    onCloseModal();
                    // form.reset();
                }
            })
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="relative">
                <img src={user?.photoURL} alt="" className="h-[450px] w-full absolute" />

                <div className="">
                    <div className="max-w-6xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  z-10 relative top-96">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                        <div >
                            <div className="flex justify-around items-start">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <label className="w-1/4 font-bold">Name:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{user?.displayName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="font-bold">Email:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{user?.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-1/4 font-bold">Role:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{userData[0]?.role}</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center mb-5">
                                        <label className=" font-bold"> Organised Camps:</label>
                                        {/* <span className="text-blue-700 font-semibold ml-5">{user?.totalRegisteredCamps}</span> */}
                                    </div>
                                    <div className="flex items-center">
                                        <label className=" font-bold">Phone Number:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{userData[0]?.phone}</span>
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <label className=" font-bold">Gender:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{userData[0]?.gender}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center mb-5">
                                        <label className="font-bold">Participants Feedbacks:</label>
                                        {/* <span className="text-blue-700 font-semibold ml-5">{user?.attendedCamps}</span> */}
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <label className=" font-bold">Age:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{userData[0]?.age}</span>
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <label className=" font-bold">Success Stories:</label>
                                        <span className="text-blue-700 font-semibold ml-5">{userData[0]?.successStory}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button gradientDuoTone="greenToBlue" className="top-28 left-12 " onClick={() => setOpenModal(true)}>Edit Profile</Button>

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <h1 className="text-center font-bold mb-5 text-blue-700">Edit Profile</h1>
                <Modal.Body>
                    <div className="">
                        <form className="h-[400px]" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4 p-6">
                                <div className="flex gap-5">
                                    <div className="relative h-11 mb-5">
                                        <input type="name" name="name" defaultValue={user?.displayName}
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Enter Your Name*
                                        </label>
                                    </div>
                                    <div className="relative h-11 ">
                                        <input type="email" name="email" readOnly defaultValue={user?.email}
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Enter Your Email*
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-5 mb-5">
                                    <div className="relative h-11  ">
                                        <input type="phone" name="phone" defaultValue={userData[0]?.phone}
                                            className="peer h-full w-full rounded-md border border-blue-700 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Your Phone Number*
                                        </label>
                                    </div>
                                    <div>
                                        <select className="rounded-md border border-blue-700" required name="gender" defaultValue={userData[0]?.gender}>
                                            <option value="">Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>


                                        </select>


                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="age">Success Story:</label>
                                    <textarea
                                        id="success"
                                        name="success"
                                        rows={2} 
                                        cols={32} 
                                        placeholder="Enter your success story"
                                        defaultValue={userData[0]?.successStory}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="age">Age:</label>
                                    <textarea
                                        id="age"
                                        name="age"
                                        rows={2} 
                                        cols={32} 
                                        placeholder="Enter your age"

                                    />
                                </div>


                            </div>

                            <div className="p-0">
                                <input type="submit" value="Edit Profile" className="block w-full select-none rounded-lg bg-blue-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                />



                            </div>

                        </form>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default OrganiserProfile;
