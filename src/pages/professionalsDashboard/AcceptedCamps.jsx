import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import SectionTitle from "../../Components/SectionTitle";
import { Button, Modal } from "flowbite-react";
import UserData from "../../hooks/UserData";
import Swal from "sweetalert2";


const AcceptedCamps = () => {


    const { user } = UseAuth();
    let [campData, setCampData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [userData,refetch] = UserData();
    function onCloseModal() {
        setOpenModal(false);

    }

    let i = 0;

    const axiosSecure = useAxiosSecureCalls();

    useEffect(() => {
        axiosSecure.get(`/interestedProfessionals/${user?.email}`)
            .then(data => {

                const accepted = data?.data?.filter(prof => prof.status === "Accepted")
                setCampData(accepted)

            })
    }, [user?.email, axiosSecure])






    if (campData?.length > 0) {
        campData = campData?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // default
    }
    console.log(campData)





    const theme = useTheme([
        getTheme(),
        {
            HeaderRow: `
            background-color: #eaf5fd;
            
          `,
            Row: `
            &:nth-of-type(odd) {
              background-color: #95ddf0;
              color: black;
              font-weight: 600;
            }
    
            &:nth-of-type(even) {
              background-color: #21c8f2;
              color: black;
              font-weight: 600;
            }
          `,
          Table: `
          width: 2000px; 
     
          overflow-x: auto; 
        `,
        HeaderCell: `
        
          max-width: 2000px; 
          word-wrap: break-word; 
          white-space: normal; 
          text-align:center
        `,
        Cell: `
          
          max-width: 2000px; 
          word-wrap: break-word;
          white-space: normal; 
        `,


        },
    ])

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
            specialty:formData.get('specialty'),
            certification:formData.get('certification')

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

    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    console.log(campData)
    campData = {

        nodes: campData?.filter((item) =>

            item?.name?.toLowerCase().includes(search.toLowerCase())
        ),
    };

    console.log(campData)

    const COLUMNS = [

        { label: "No.", renderCell: (item) => <h1 className="text-xs font-bold text-center">{item?.serialNumber}</h1> },
        { label: "Name", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.name}</h1> },
        { label: "Email", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.email}</h1> },
        { label: "Age", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.age}</h1> },
        { label: "Phone", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.phone}</h1> },
        { label: "Specialization", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.specialization}</h1> },
        { label: "Area of Interests", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.areaInterest}</h1> },
        { label: "Status", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.status}</h1> },
        { label: "Status", renderCell: () => <div className="flex justify-center"><Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-32 p-2" onClick={() => setOpenModal(true)}>Update Profile</Button></div>}

    ];
    return (



        <div>
            <div className="flex justify-evenly mb-8">
                <SectionTitle subheading="---Find all your camps here---" heading="Manage Camps"></SectionTitle>

            </div>
            <div className="max-w-6xl mx-auto md:p-10 px-1">
                <div className="mb-14">
                    <label htmlFor="search" className="text-xl font-bold text-blue-900">
                        Search by Camp-Name:&nbsp;
                        <input id="search" type="text" value={search} onChange={handleSearch} className="outline-2 outline-blue-700 border-solid border-blue-500 border-2" />
                    </label>
                </div>
                <br />

                <div className="overflow-auto" style={{ width: '100%', maxWidth: '1200px' }}>

                    <CompactTable columns={COLUMNS} data={campData} theme={theme} />

                </div>

                <br />
            </div>
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
                                    <label htmlFor="age">Medical specialty:</label>
                                    <textarea
                                        id="specialty"
                                        name="specialty"
                                        rows={2}
                                        cols={32}
                                        placeholder="Enter your specialty"
                                        defaultValue={userData[0]?.specialty}

                                    />
                                </div>
                                <div>
                                    <label htmlFor="age">Certifications:</label>
                                    <textarea
                                        id="certification"
                                        name="certification"
                                        rows={2}
                                        cols={32}
                                        placeholder="Enter your certifications"
                                        defaultValue={userData[0]?.certification}

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

export default AcceptedCamps;

