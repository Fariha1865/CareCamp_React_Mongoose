
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";



import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import { Button } from "flowbite-react";
import SectionTitle from "../../Components/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {


    const { user } = UseAuth();
    let [campData, setCampData] = useState([]);


    let i = 0;

    const axiosSecure = useAxiosSecureCalls();


    useEffect(() => {
        axiosSecure.get(`/registeredCamps/${user?.email}`)
            .then(data => {
                console.log(data.data)
                setCampData(data.data)

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

    const handleConfirmation = (id) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Confirm registration of this participant",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/confirmRegistration/${id}`)
                .then(res=>{
                    console.log(res)
                    axiosSecure.get(`/registeredCamps`)
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
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Cancel registration of this participant",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosSecure.patch(`/cancelRegistration/${id}`)
                .then(res=>{
                    console.log(res)
                    axiosSecure.get(`/registeredCamps`)
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
            font-size: 10px;
            font-weight: 900;
            
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


        },
    ])

    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };


    campData = {

        nodes: campData?.filter((item) =>

            item?.campData?.CampName?.toLowerCase().includes(search.toLowerCase())
        ),
    };

    console.log(campData)

    const COLUMNS = [

        { label: "No.", renderCell: (item) => <h1 className="text-xs font-bold ">{item?.serialNumber}</h1> },
        { label: "Camp name", renderCell: (item) => <h1 title={item?.campData?.CampName} className="text-sm font-bold">{item?.campData?.CampName}</h1> },
        { label: "Participant", renderCell: (item) => <h1 title={item?.campData?.CampFees} className="text-sm font-bold text-center">{item?.email}</h1> },
        { label: "Camp Fees", renderCell: (item) => <h1 title={item?.campData?.CampFees} className="text-sm font-bold text-center">{item?.campData?.CampFees}</h1> },
        { label: "Location", renderCell: (item) => <h1 title={item?.campData?.Venue} className="text-sm font-bold">{item?.campData?.Venue}</h1>, resize: true },
        { label: "DateTime", renderCell: (item) => <h1 title={item?.campData?.ScheduledDateTime} className="text-sm font-bold">{item?.campData?.ScheduledDateTime}</h1> },
        { label: "Payment status", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.payment}</h1> },
        { label: "Confirmation Status", renderCell: (item) => 
    
            <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-20" disabled={item?.payment != "Paid" || item?.status === "Cancelled"} onClick={()=>handleConfirmation(item?._id)}>{item?.status === "Pending" || item?.status === "Cancelled" ? "Pending" : "Confirmed"}</Button>

        },
        {
            label: "Actions", renderCell: (item) =>
                <div>
                    <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 mt-2 w-20" disabled={item?.payment != "Paid" || item?.status === "Confirmed"} onClick={()=>handleCancel(item?._id)}>
                    {item?.status === "Pending" || item?.status === "Confirmed" ? "Cancel" : "Cancelled"}
                    </Button>
                </div>
        },

    ];
    return (



        <div>
            <div className="flex justify-evenly mb-8">
                <SectionTitle subheading="---Find all your registered camps here---" heading="Registered Camps"></SectionTitle>

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
        </div>
    );
};

export default ManageRegisteredCamps;
