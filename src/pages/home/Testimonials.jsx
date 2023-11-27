import SectionTitle from "../../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

import qoute from "../../assets/home/qoute.svg"
import useAxiosSecure from "../../hooks/AxiosSecure";


const Testimonials = () => {

    const [reviews, setReviews] = useState([]);
    const [campData, setcampData] = useState([]);
    const axiosSecure = useAxiosSecure();


    const url = "/reviews"
    useEffect(() => {

        axiosSecure.get(url)
            .then(data => {
                // console.log(data.data)
                setReviews(data.data)

                const promises = data?.data?.map(review => {
                    return axiosSecure.get(`/details/${review?.campId}`)
                        .then(result => result.data[0]);
                });

                // Wait for all promises to resolve
                Promise.all(promises)
                    .then(campDataResults => {
                        setcampData(campDataResults);
                    })



            })



    }, [axiosSecure])


    return (
        <div>


            {
                console.log(campData)
            }
            <SectionTitle subheading="---What Our Clients Say---" heading="TESTIMONIALS"></SectionTitle>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >




                {
                    reviews.map((review, index) =>

                        <SwiperSlide key={review._id} className="px-28">
                            <h1 className="text-xl font-bold my-5 text-center">{review?.name}</h1>
                            {
                                review?.image ?
                                    <div className="w-40 max-w-4xl mx-auto">
                                        <img src={review?.image} className=""></img>
                                        <h1 className="text-center">Shared event image</h1>
                                    </div>
                                    :
                                    <div className="flex justify-center w-40 max-w-4xl mx-auto">
                                        <img src={qoute} className=""></img>
                                    </div>
                            }
                            <div className="flex flex-col justify-center items-center gap-5 px-28 mb-32 mt-6">

                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review?.rating}
                                    readOnly
                                />
                                <h1 className="text-blue-800 font-bold ">{campData[index]?.CampName}</h1>
                                <h1><span className="text-blue-800 font-bold mr-3">Camp Date:</span>{campData[index]?.ScheduledDateTime}</h1>
                                <p>{review?.feedback}</p>
                                <p><span className="text-blue-800 font-bold mr-3">Testimonial:</span> {review?.testimonial}</p>

                            </div>

                        </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Testimonials;