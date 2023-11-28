import { Button, } from 'flowbite-react';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecureCalls from "../../hooks/AxiosSecureCalls";
import SectionTitle from "../../Components/SectionTitle";
import Swal from "sweetalert2";

const ReviewParticipants = () => {


    const { user } = UseAuth();
    let [campData, setCampData] = useState([]);


    let i = 0;

    const axiosSecure = useAxiosSecureCalls();


    useEffect(() => {
        axiosSecure.get(`/growingParticipants`)
            .then(data => {

                console.log(data.data)
                setCampData(data.data)

            })
    }, [axiosSecure])

    // const fetchDataFromMongoDB = (id) => {

    //     console.log(id)
    //     axiosSecure.get(`/camp/${id}`)
    //         .then(data => {

    //             //  console.log(data)
    //             setUpdateCamp(data.data[0])

    //         })

    // }
    if (campData?.length > 0) {
        campData = campData?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // default
    }

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
                                const datas = data.data.filter((cell,index)=>index != (data.data.length)-1)
                                setCampData(datas)

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
        { label: "Name", renderCell: (item) => <h1  className="text-sm font-bold">{item?.name}</h1> },
        { label: "Email", renderCell: (item) => <h1  className="text-sm font-bold text-center">{item?.email}</h1> },
        { label: "Age", renderCell: (item) => <h1 className="text-sm font-bold">{item?.age}</h1> },
        { label: "Phone", renderCell: (item) => <h1 className="text-sm font-bold">{item?.phone}</h1> },
        { label: "Address", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.address}</h1> },
        { label: "Health Information", renderCell: (item) => <h1 className="text-sm font-bold text-center">{item?.special}</h1> },
        { label: "Action", renderCell: () =>  <Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-32 p-2">Accept Participant</Button> }

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

