
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";



import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import { Button } from "flowbite-react";
import SectionTitle from "../../Components/SectionTitle";
import { Link } from "react-router-dom";

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

    // const handleDelete = (user) => {
    //     Swal.fire({
    //         title: "Are you sure?",

    //         showCancelButton: true,
    //         confirmButtonText: "Delete from cart",

    //     }).then((result) => {
    //         /* Read more about isConfirmed, isDenied below */
    //         if (result.isConfirmed) {

    //             axiosSecure.delete(`/users/${user?._id}`)
    //                 .then(data => {
    //                     console.log(data)
    //                     Swal.fire("Item deleted from your cart successfully");
    //                     refetch();
    //                 })

    //         } else if (result.isDenied) {
    //             Swal.fire("Changes are not saved", "", "info");
    //         }
    //     });
    // }

   

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

        //     Cell: `
        //     text-overflow: ellipsis;;
        //     height: 100px 

       
         
        // `,
    //     Table: `
    //     width: 100%;
    //     max-width: 1200px; 
    //     overflow-x: auto;
    //     word-wrap: break-word;
    //   `,

        // HeaderCell: `
        //     width: 135px;
        //     font-size: 9;


        //      `,




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

        { label: "No.", renderCell: (item) => <h1  className="text-xs font-bold ">{item?.serialNumber}</h1> , resize: true},
        { label: "Camp name", renderCell: (item) => <h1 title={item?.campData?.CampName} className="text-sm font-bold">{item?.campData?.CampName}</h1>, resize: true },
        { label: "Camp Fees", renderCell: (item) => <h1 title={item?.campData?.CampFees} className="text-sm font-bold text-center">{item?.campData?.CampFees}</h1>, resize: true  },
        { label: "Location", renderCell: (item) => <h1  title={item?.campData?.Venue} className="text-sm font-bold">{item?.campData?.Venue}</h1> , resize: true },
        { label: "DateTime", renderCell: (item) => <h1 title={item?.campData?.ScheduledDateTime} className="text-sm font-bold">{item?.campData?.ScheduledDateTime}</h1> , resize: true },
        { label: "Payment status", renderCell: () => <h1 className="text-sm font-bold text-center">Unpaid</h1> },
        { label: "Confirmation Status", renderCell: () => <h1 className="text-sm font-bold">Pending...</h1> },
        { label: "Payment status", renderCell: (item) => <Link to={`/participantDashboard/payment/${item?.campData?._id}`}><Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800" >Pay</Button></Link> },

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