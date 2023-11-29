import { Button, } from 'flowbite-react';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import SectionTitle from "../../Components/SectionTitle";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

const ReviewParticipants = () => {


    const { user } = UseAuth();
    const { id } = useParams();
    let [campData, setCampData] = useState([]);


    let i = 0;

    const axiosSecure = useAxiosSecureCalls();


    useEffect(() => {
        axiosSecure.get(`/growingParticipants`)
            .then(data => {

                console.log(data.data)
                const participants = data.data.filter(p => p.campData._id === id);
                setCampData(participants)

            })
    }, [axiosSecure])

    if (campData?.length > 0) {
        campData = campData?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // default
    }

    const handleAccept = (item) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Accept this participant",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axiosSecure.delete(`deleteGrowingParticipants/${item?._id}`)
                    .then(res => {
                        console.log(res)
                    })

                const datas = {
                    campData: item?.campData,
                    name: item?.name,
                    email: item?.email,
                    age: item?.age,
                    phone: item?.phone,
                    gender: item?.gender,
                    special: item?.special,
                    emergency: item?.emergency,
                    payment: "Unpaid",
                    status: "Pending"

                }

                axiosSecure.post(`/joinedParticipants`, datas)
                    .then(data => {
                        console.log(data)
                        Swal.fire("Participant added to registered camp list");
                        axiosSecure.get(`/growingParticipants`)
                            .then(data => {

                                const participants = data.data.filter(p => p.campData._id === id);
                                setCampData(participants)

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


        },
    ])

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

        { label: "No.", renderCell: (item) => <h1 className="text-xs font-bold ">{item?.serialNumber}</h1> },
        { label: "Name", renderCell: (item) => <h1 className="text-sm font-bold">{item?.name}</h1> },
        { label: "Email", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.email}</h1> },
        { label: "Age", renderCell: (item) => <h1 className="text-sm font-bold">{item?.age}</h1> },
        { label: "Phone", renderCell: (item) => <h1 className="text-sm font-bold">{item?.phone}</h1> },
        { label: "Address", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.address}</h1> },
        { label: "Health Information", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.special}</h1> },
        { label: "Action", renderCell: (item) => <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-32 p-2" onClick={() => handleAccept(item)}>Accept Participant</Button> }

    ];
    return (

        <div>
            <div className="flex justify-evenly mb-8">
                <SectionTitle subheading="---Find all joined participants in the selected upcoming camp here---" heading="Review Participants"></SectionTitle>

            </div>
            <div className="max-w-6xl mx-auto md:p-10 px-1">
                <div className="mb-14">
                    <label htmlFor="search" className="text-xl font-bold text-blue-900">
                        Search by Participant-Name:&nbsp;
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

export default ReviewParticipants;

