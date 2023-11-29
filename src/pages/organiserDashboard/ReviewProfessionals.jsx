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

const ReviewProfessionals = () => {


    const { user } = UseAuth();
    let [campData, setCampData] = useState([]);
    const {id} = useParams();

    let i = 0;

    const axiosSecure = useAxiosSecureCalls();


    useEffect(() => {
        axiosSecure.get(`/interestedProfessionals`)
            .then(data => {

                const professionals = data?.data?.filter(p => p.campData._id === id);
                setCampData(professionals)

            })
    }, [axiosSecure,id])


    if (campData?.length > 0) {
        campData = campData?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // default
    }

    const acceptProfessionals = (profid) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Accept this professional for this camp",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axiosSecure.patch(`/acceptProfessional/${profid}`)
                    .then(data => {
                        console.log(data)
                        Swal.fire("The professional is successfully accepted for this camp");
                        axiosSecure.get(`/interestedProfessionals`)
                            .then(data => {

                                const professionals = data?.data?.filter(p => p.campData._id === id);
                                setCampData(professionals)

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
          text-align:center
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
        { label: "Action", renderCell: (item) => <div className='flex justify-center'><Button gradientDuoTone="greenToBlue" className="border-2 border-blue-800 w-32 p-2" disabled={item?.status==="Accepted"} onClick={() => acceptProfessionals(item?._id)}>Accept Professional</Button></div> }

    ];
    return (



        <div>
            <div className="flex justify-evenly mb-8">
                <SectionTitle subheading="---Find all joined participants in the selected upcoming camp here---" heading="Review Professionals"></SectionTitle>

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

export default ReviewProfessionals;
