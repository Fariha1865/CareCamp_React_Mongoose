import { Button, } from 'flowbite-react';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import SectionTitle from "../../Components/SectionTitle";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const ManageUpcomingCamps = () => {


    const { user } = UseAuth();
    let [campData, setCampData] = useState([]);
    const [id, setId] = useState("");
    const [participants, setParticipants] = useState([]);
    const [professionals, setProfessionals] = useState([]);


    let i = 0;

    const axiosSecure = useAxiosSecureCalls();



    useEffect(() => {
        axiosSecure.get(`/upcomingCamps/${user?.email}`)
            .then(data => {

                setCampData(data.data)

            })
        axiosSecure.get(`/growingParticipants`)
            .then(data => {

                console.log(data.data)
                setParticipants(data.data)

            })
        axiosSecure.get(`/interestedProfessionals`)
            .then(data => {
                console.log(data.data)
                setProfessionals(data.data)

            })
    }, [axiosSecure, user?.email])

    const addToPopular = (item) => {

        const id = item._id;
        item.type = "popular"
        delete item._id;
        console.log(item)

        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Publish Camp",

        })
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axiosSecure.post("/camps", item)
                        .then(result => {
                            Swal.fire("Camp added to popular camps list");
                            console.log(result)
                            axiosSecure.delete(`upcoming/${id}`)
                                .then(res => {

                                    console.log(res)
                                    axiosSecure.get(`/upcomingCamps/${user?.email}`)
                                        .then(data => {

                                            setCampData(data.data)

                                        })


                                })


                        })

                }
            });


    }
    if (campData?.length > 0) {
        campData = campData?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // default
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

        { label: "No.", renderCell: (item) => <h1 className="text-xs font-bold ">{item?.serialNumber}</h1> },
        { label: "Camp name", renderCell: (item) => <h1 title={item?.CampName} className="text-sm font-bold">{item?.CampName}</h1> },
        { label: "Camp Fees", renderCell: (item) => <h1 title={item?.CampFees} className="text-sm font-bold text-center">{item?.CampFees}</h1> },
        { label: "Location", renderCell: (item) => <h1 title={item?.Venue} className="text-sm font-bold">{item?.Venue}</h1>, resize: true },
        { label: "DateTime", renderCell: (item) => <h1 title={item?.ScheduledDateTime} className="text-sm font-bold">{item?.ScheduledDateTime}</h1> },
        { label: "Specialized Services", renderCell: (item) => <h1 className="text-sm font-bold text-center" title={item?.SpecializedServices}>{item?.SpecializedServices}</h1> },
        { label: "Venue", renderCell: (item) => <h1 className="text-sm font-bold text-center" title={item?.Venue}>{item?.Venue}</h1> },
        { label: "Participant Count", renderCell: (item) => <h1 className="text-sm font-bold text-center">{(participants.filter(p => p.campData._id === item._id)).length}</h1> },
        { label: "Interested professionals", renderCell: (item) => <h1 className="text-sm font-bold text-center">{(professionals.filter(p => p.campData._id === item._id)).length}</h1> },

        {
            label: "Action", renderCell: (item) =>
                <div>

                    <Link to={`/organizerDashboard/reviewParticipants/${item?._id}`}><Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-20">Review Participants</Button></Link>

                    <Link to={`/organizerDashboard/reviewProfessionals/${item?._id}`}><Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 mt-2 w-20">
                        Review Professionals
                    </Button></Link>
                    <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-20 mt-2"

                        disabled={!((participants.filter(p => p.campData._id === item._id)).length == 0 && (professionals.filter(p => p.campData._id === item._id)).length == 0)}
                        onClick={() => addToPopular(item)}

                    >Publish</Button>
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


        </div>
    );
};

export default ManageUpcomingCamps;


