import { useForm } from "react-hook-form";


import { Button, Label, TextInput } from 'flowbite-react';
import useAxiosSecure from "../../hooks/AxiosSecure";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
const AddUpcomingCamps = () => {
    const { register, reset,handleSubmit, formState: { errors } } = useForm();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append('image', data.image[0])
        const campData = {

            CampName: data.name,
            CampFees: data.fees,
            ScheduledDateTime: data.date,
            Venue: data.venue,
            Location: data.location,
            SpecializedServices: data.services,
            TargetAudience: data.audience,
            Description: data.description,
            email: user?.email

        }
        fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json()).then((res) => {

                campData['Image'] = res?.data?.display_url;
                axiosSecure.post("/upcomingCamps", campData)
                .then(result => {
                    Swal.fire("New Upcoming camp added successfully");
                    console.log(result)
                    reset();

                })
              
               

            })

       

    }
    return (
        <div >
            <div className="mb-5 pt-5 text-center">

                <h1 className="text-4xl font-bold font-mono border-y-4 max-w-xl mx-auto text-blue-800">Add New Upcoming Health Camp</h1>
            </div>
            <div className="hero ">

                <div className="hero-content flex flex-col lg:flex-row-reverse shadow-2xl shadow-gray-700" >
                    <div className="text-center lg:text-left lg:w-1/2 w-full p-14">
                        <img src="https://i.ibb.co/rfh6BDw/camp.jpg" alt="" />
                    </div>

                    <div className="shadow-2xl bg-base-100 flex-1 h-full flex mt-12 ml-5">



                        <form className="flex flex-col gap-4 p-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-between items-center">
                                <div className="form-control">
                                <div className="mb-1">
                                        <Label htmlFor="image" value="Camp Image" />
                                    </div>
                                    <input {...register('image', { required: true })} name="image" type="file" className="file-input " />
                                    {errors.image && <span className="text-red-600 mt-2">This field is required*</span>}
                                </div>
                            </div>
                            <div className="flex justify-between">
                            <div>
                                    <div className="mb-2">
                                        <Label htmlFor="name" value="Camp Name" />
                                    </div>
                                    <TextInput {...register('name', { required: true })} id="name" type="text" name="name" placeholder="Camp Name" required />
                                    {errors.name && <span className="text-red-600 mt-2">This field is required*</span>}
                                </div>
                                <div>
                                    <div className="mb-2 ">
                                        <Label htmlFor="fees" value="Camp Fees" />
                                    </div>
                                    <TextInput {...register('fees', { required: true })} id="fees" name="fees" type="text" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="date" value="Camp date" />
                                    </div>
                                    <TextInput {...register('date', { required: true })} id="date" name="date" type="date" required />
                                </div>
                            </div>
                            <div className="flex justify-between gap-5">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="venue" value="Camp venue" />
                                    </div>
                                    <TextInput {...register('venue', { required: true })} id="venue" name="venue" type="text" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="location" value="Camp location" />
                                    </div>
                                    <TextInput {...register('location', { required: true })} id="location" name="location" type="text" required />
                                </div>
                        
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="services" value="Specialized services" />
                                    </div>
                                    <TextInput {...register('services', { required: true })} id="services" name="services" type="text" required />
                                </div>

                            </div>
                            <div >

    
                                <div>
                                    <div className="mb-2">
                                        <Label htmlFor="audience" value="Target Audience" />
                                    </div>
                                    <TextInput {...register('audience', { required: true })} id="audience" name="audience" type="text" required />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="description" />
                                </div>
                                <TextInput {...register('description', { required: true })} id="description" name="description" type="text" required />
                            </div>

                            <Button type="submit">Add Camp</Button>
                        </form>



                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddUpcomingCamps;
