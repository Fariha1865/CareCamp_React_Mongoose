
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";



import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/AxiosSecure";
import UserData from "../../hooks/UserData";

const Users = () => {

   


   let [users,refetch] = UserData();
    console.log(users)

    let i = 0;

    const axiosSecure = useAxiosSecure();


    if (users?.length > 0) {
        users = users?.map((item) => ({
            ...item,
            serialNumber: i++,
        }))
    } else {
        // cart = [{ "serialNumber":"", "name": "", "photo": "", "price": "", "userName": "" }]
    }
  
    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",

            showCancelButton: true,
            confirmButtonText: "Delete from cart",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user?._id}`)
                    .then(data => {
                        console.log(data)
                        Swal.fire("Item deleted from your cart successfully");
                        refetch();
                    })

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const handleUserRole = (user) =>{
        
        Swal.fire({
            title: "Are you sure to make this user Admin?",

            showCancelButton: true,
            confirmButtonText: "Make Admin",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${user?._id}`)
                    .then(data => {
                        console.log(data)
                        Swal.fire("User role updated as Admin successfully");
                        refetch();
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
              background-color: #D99904;
              color: black;
              font-weight: 600;
            }
    
            &:nth-of-type(even) {
              background-color: #D1A054;
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

    users = {
        nodes: users?.filter((item) =>
            item?.name?.toLowerCase().includes(search.toLowerCase())
        ),
    };


    const COLUMNS = [

        { label: "Serial Number", renderCell: (item) => item?.serialNumber },
        { label: "Item Image", renderCell: (item) => item?.name },
        { label: "Item Name", renderCell: (item) => item?.email },
        { label: "User Name", renderCell: (item) => item?.role =='admin' ? "Admin" : <h1 className="bg-blue-500 p-2 w-20 rounded-md cursor-pointer text-white transform hover:scale-110 transition duration-300 ease-in-out" onClick={() => handleUserRole(item)}>Role</h1> },
        { label: "Action", renderCell: (item) => <h1 className="bg-blue-500 p-2 w-20 rounded-md cursor-pointer text-white transform hover:scale-110 transition duration-300 ease-in-out" onClick={() => handleDelete(item)}>Delete</h1> },
    ];
    return (



        <div>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-4xl">Items: {users?.length}</h2>
                {/* <h2 className="text-4xl">Total Price: {totalPrice}</h2> */}
                <button className="btn bg-yellow-700 text-white hover:bg-yellow-400">Pay</button>

            </div>
            <div className="max-w-6xl mx-auto md:p-10 px-1">
                <div className="mb-14">
                    <label htmlFor="search" className="text-xl font-bold text-yellow-900">
                        Search by Blog-Title:&nbsp;
                        <input id="search" type="text" value={search} onChange={handleSearch} className="outline-2 outline-yellow-700 border-solid border-yellow-500 border-2" />
                    </label>
                </div>
                <br />

                <div className="overflow-auto">

                    <CompactTable columns={COLUMNS} data={users} theme={theme} />

                </div>

                <br />
            </div>
        </div>
    );
};

export default Users;