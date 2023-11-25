import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/AxiosSecure";


const CategoryCards = ({ item }) => {

    const { image, name, recipe } = item;
    const { user } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    

    const handleAddToCart = (food) => {

        if (user && user?.email) {
            Swal.fire({
                title: "Are you sure?",

                showCancelButton: true,
                confirmButtonText: "Add to Cart",

            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
             
                    const orderedItem = {
                        foodID: food?._id,
                        userEmail: user?.email,
                        userName: user?.displayName,
                        name: food?.name,
                        price: food?.price,
                        photo: food?.image
                    }
                    axiosSecure.post("/cart",orderedItem)
                        .then(data => {
                            console.log("dataaaaa" + data.data)
                            Swal.fire("Item added to your cart successfully");
                           
                        })
                    
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        } else {
            Swal.fire({
                title: "Please login to order items !",

                showCancelButton: true,
                confirmButtonText: "Ok",

            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                } else if (result.isDenied) {
                    Swal.fire("Cancelled");
                }
            });
        }
    }
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-warning bg-slate-100 border-0 border-b-4" onClick={() => handleAddToCart(item)}>Add to Cart</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCards;