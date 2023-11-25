import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import slide1 from "../../assets/home/slide1.jpg"
import slide2 from "../../assets/home/slide2.jpg"
import slide3 from "../../assets/home/slide3.jpg"
import slide4 from "../../assets/home/slide4.jpg"
import slide5 from "../../assets/home/slide5.jpg"
import slide6 from "../../assets/home/slide6.jpg"
import SectionTitle from '../../Components/SectionTitle';


const Category = () => {
    return (
        <div className='max-w-3xl mx-auto mb-20 mt-32 p-10 text-[#00546a]'>
            <SectionTitle subheading="---Explore Our Diverse Medical Camp Categories---" heading="Camp Categories"></SectionTitle>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 20,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[Autoplay,EffectCoverflow, Pagination]}
                className="bodySlide mySwiper m-20"
            >
                <SwiperSlide>

                    <img src={slide1} alt="Slide 1" className='h-[450px]'/>
                    <h1 className="bg-black bg-opacity-50 text-3xl font-bold left-[30%] text-[#12bbe6] p-5 shadow-xl shadow-red-400 absolute bottom-0 z-10">Health and Wellness Camp</h1>

                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} className='h-[450px]'/>
                    <h1 className="bg-black bg-opacity-50 text-3xl font-bold text-[#12bbe6] p-5 left-[30%] shadow-xl shadow-red-400 absolute bottom-0  z-10">Pediatric Health Camp</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} className='h-[450px]'/>
                    <h1 className="bg-black bg-opacity-50 text-3xl font-bold text-[#12bbe6] p-5 left-[30%] shadow-xl shadow-red-400 absolute bottom-0  z-10">Heart Health Awareness Camp</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} className='h-[450px]'/>
                    <h1 className="bg-black bg-opacity-50 text-3xl font-bold text-[#12bbe6] p-5 left-[30%] shadow-xl shadow-red-400 absolute bottom-0  z-10">Diabetes Management Workshop</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} className='h-[450px]'/>
                    <h1 className="bg-black bg-opacity-50 text-3xl font-bold text-[#12bbe6] p-5 left-[30%] shadow-xl shadow-red-400  absolute bottom-0  z-10">Womens Health Clinic</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide6} className='h-[450px]'/>
                    <h1 className="bg-black bg-opacity-50 text-3xl font-bold text-[#12bbe6] p-5 left-[30%] shadow-xl shadow-red-400  absolute bottom-0  z-10">Mental Health Awareness Seminar</h1>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Category;