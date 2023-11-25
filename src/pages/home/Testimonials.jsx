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
    const axiosSecure = useAxiosSecure();

    const url = "/reviews"
    useEffect(() => {

        axiosSecure.get(url)
            .then(data => {
                // console.log(data.data)
                setReviews(data.data)
            })

    }, [axiosSecure])


    return (
        <div>
            <SectionTitle subheading="---What Our Clients Say---" heading="TESTIMONIALS"></SectionTitle>
            <div className="flex justify-center">
            <img src={qoute}></img>
            </div>
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
                    reviews.map(review =>

                        <SwiperSlide key={review._id} className="px-28">
                            <div className="flex flex-col justify-center items-center gap-5 px-28">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <h1 className="text-xl font-bold">{review.name}</h1>
                            </div>

                        </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Testimonials;