import { useForm } from "react-hook-form";
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import SectionTitle from "../../Components/SectionTitle";
import Swal from "sweetalert2";

const ManageCamps = () => {


    const { user } = UseAuth();
    const { register, reset, formState: { errors } } = useForm();
    let [campData, setCampData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState("");
    const [updateCamp, setUpdateCamp] = useState({});


    let i = 0;

    const axiosSecure = useAxiosSecureCalls();
    function onCloseModal() {
        setOpenModal(false);

    }

    useEffect(() => {
        axiosSecure.get(`/camps/${user?.email}`)
            .then(data => {

                setCampData(data.data)

            })
    }, [user?.email, axiosSecure])

    const fetchDataFromMongoDB = (id) => {

        console.log(id)
        axiosSecure.get(`/camp/${id}`)
            .then(data => {

                //  console.log(data)
                setUpdateCamp(data.data[0])

            })

    }

    const handleEdit = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        console.log(formData)
        const updatedCampData = {

            CampName: formData.get('name'),
            CampFees:formData.get('fees'),
            ScheduledDateTime: formData.get('date'),
            Venue: formData.get('venue'),
            Location: formData.get('location'),
            SpecializedServices: formData.get('services'),
            HealthcareProfessionals: formData.get('professional'),
            TargetAudience: formData.get('audience'),
            Description: formData.get('description'),
            email: user?.email

        }

        console.log(updatedCampData)

        axiosSecure.put(`/updateCamps/${id}`, updatedCampData)
            .then(result => {
                Swal.fire("Camp data updated successfully");
                console.log(result)
                reset();
                onCloseModal();
                axiosSecure.get(`/camps/${user?.email}`)
                .then(data => {
    
                    setCampData(data.data)
    
                })

            })
    }




    if (campData?.length > 0) {
        campData = campData?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // default
    }
    console.log(campData)

    const handleDelete = (data) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Delete from registered list",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axiosSecure.delete(`/camps/${data?._id}`)
                    .then(data => {
                        console.log(data)
                        Swal.fire("Camp deleted from your camp list");
                        axiosSecure.get(`/camps/${user?.email}`)
                            .then(data => {
                                console.log(data.data)
                                setCampData(data.data)

                            })

                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }



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
          text-align: center;
        `,
        Cell: `
          
          max-width: 2000px; 
          word-wrap: break-word;
          white-space: normal; 
        `,


        },
    ])

    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    console.log(campData)
    campData = {

        nodes: campData?.filter((item) =>

            item?.CampName?.toLowerCase().includes(search.toLowerCase())
        ),
    };

    console.log(campData)

    const COLUMNS = [

        { label: "No.", renderCell: (item) => <h1 className="text-xs font-bold text-center">{item?.serialNumber}</h1> },
        { label: "Camp name", renderCell: (item) => <h1 title={item?.CampName} className="text-sm font-bold text-center">{item?.CampName}</h1> },
        { label: "Camp Fees", renderCell: (item) => <h1 title={item?.CampFees} className="text-sm font-bold text-center">{item?.CampFees}</h1> },
        { label: "Location", renderCell: (item) => <h1 title={item?.Venue} className="text-sm font-bold text-center">{item?.Venue}</h1>, resize: true },
        { label: "DateTime", renderCell: (item) => <h1 title={item?.ScheduledDateTime} className="text-sm font-bold text-center">{item?.ScheduledDateTime}</h1> },
        { label: "Specialized Services", renderCell: (item) => <h1 className="text-sm font-bold text-center" title={item?.SpecializedServices}>{item?.SpecializedServices}</h1> },
        { label: "Healthcare Professionals", renderCell: (item) => <h1 className="text-sm font-bold text-center" title={item?.HealthcareProfessionals}>{item?.HealthcareProfessionals}</h1> },

        {
            label: "Action", renderCell: (item) =>
             <div className="flex justify-center">
                   <div>

                    <Button onClick={() => { setId(item?._id), setOpenModal(true), fetchDataFromMongoDB(item?._id) }} gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-20">Update</Button>

                    <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 mt-2 w-20" disabled={item?.payment === "Paid"} onClick={() => handleDelete(item)}>
                        Delete
                    </Button>
                </div>
             </div>
        },

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
                <h1 className="text-center font-bold mb-5 text-blue-700">Edit Camp</h1>
                <Modal.Body>
                    <div className="">
                        <form className="flex flex-col gap-4 p-5" onSubmit={handleEdit}>
                            <div className="flex justify-between items-center">

                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="name" value="Camp Name" />
                                    </div>
                                    <TextInput {...register('name', { required: false })} defaultValue={updateCamp?.CampName} id="name" type="text" name="name" />
                                    {errors.name && <span className="text-red-600 mt-2">This field is required*</span>}
                                </div>
                                <div>
                                    <div className="mb-2 ">
                                        <Label htmlFor="fees" value="Camp Fees" />
                                    </div>
                                    <TextInput {...register('fees', { required: false })} defaultValue={updateCamp?.CampFees} id="fees" name="fees" type="text" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="date" value="Camp date" />
                                    </div>
                                    <TextInput {...register('date', { required: false })} defaultValue={updateCamp?.ScheduledDateTime} id="date" name="date" type="date" />
                                </div>
                            </div>
                            <div className="flex justify-between gap-5">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="venue" value="Camp venue" />
                                    </div>
                                    <TextInput {...register('venue', { required: false })} defaultValue={updateCamp?.Venue} id="venue" name="venue" type="text" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="location" value="Camp location" />
                                    </div>
                                    <TextInput {...register('location', { required: false })} defaultValue={updateCamp?.Location} id="location" name="location" type="text" />
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="services" value="Specialized services" />
                                    </div>
                                    <TextInput {...register('services', { required: false })} defaultValue={updateCamp?.SpecializedServices} id="services" name="services" type="text" />
                                </div>

                            </div>
                            <div className="flex justify-between gap-5">

                                <div className="w-full">
                                    <div className="mb-2 block">
                                        <Label htmlFor="professional" value="Healthcare professionals" />
                                    </div>
                                    <TextInput {...register('professional', { required: false })} defaultValue={updateCamp?.HealthcareProfessionals} id="professional" name="professional" type="text" />
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="audience" value="Target Audience" />
                                    </div>
                                    <TextInput {...register('audience', { required: false })} defaultValue={updateCamp?.TargetAudience} id="audience" name="audience" type="text" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="description" />
                                </div>
                                <TextInput {...register('description', { required: false })} defaultValue={updateCamp?.Description} id="description" name="description" type="text" />
                            </div>

                            <Button type="submit">Edit Camp</Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageCamps;
