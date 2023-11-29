
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

const RegisteredCamps = () => {


    const { user } = UseAuth();
    let [campData, setCampData] = useState([]);


    let i = 0;

    const axiosSecure = useAxiosSecureCalls();


    useEffect(() => {
        axiosSecure.get(`/registeredUser/${user?.email}`)
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

    const handleDelete = (data) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Delete from registered list",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axiosSecure.delete(`/joinedParticipants/${data?._id}`)
                    .then(data => {
                        console.log(data)
                        Swal.fire("Camp deleted from your registered list");
                        axiosSecure.get(`/registeredUser/${user?.email}`)
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
          text-align: center
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


    campData = {

        nodes: campData?.filter((item) =>

            item?.campData?.CampName?.toLowerCase().includes(search.toLowerCase())
        ),
    };

    console.log(campData)

    const COLUMNS = [

        { label: "No.", renderCell: (item) => <h1 className="text-xs font-bold text-center">{item?.serialNumber}</h1> },
        { label: "Camp name", renderCell: (item) => <h1 title={item?.campData?.CampName} className="text-sm font-bold text-center">{item?.campData?.CampName}</h1> },
        { label: "Camp Fees", renderCell: (item) => <h1 title={item?.campData?.CampFees} className="text-sm font-bold text-center">{item?.campData?.CampFees}</h1> },
        { label: "Location", renderCell: (item) => <h1 title={item?.campData?.Venue} className="text-sm font-bold text-center">{item?.campData?.Venue}</h1>, resize: true },
        { label: "DateTime", renderCell: (item) => <h1 title={item?.campData?.ScheduledDateTime} className="text-sm font-bold text-center">{item?.campData?.ScheduledDateTime}</h1> },
        { label: "Payment status", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.payment}</h1> },
        { label: "Confirmation Status", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.status}</h1> },
        {
            label: "Actions", renderCell: (item) =>
               <div className="flex justify-center">
                 <div>
                    <Link to={`/participantDashboard/payment/${item?.campData?._id}`}>
                        <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-20" disabled={item?.payment === "Paid"}>Pay</Button>
                    </Link>
                    <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 mt-2 w-20" disabled={item?.payment === "Paid"} onClick={()=>handleDelete(item)}>
                        Cancel
                    </Button>
                </div>
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

export default RegisteredCamps;