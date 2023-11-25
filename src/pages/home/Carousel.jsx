
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Parallax, Pagination, Navigation, Autoplay } from 'swiper/modules';

import img1 from "../../assets/home/01.jpg"
import img2 from "../../assets/home/02.png"
import img3 from "../../assets/home/03.jpg"
import img4 from "../../assets/home/04.jpg"
import img5 from "../../assets/home/05.jpg"
import img6 from "../../assets/home/06.jpg"

const Carousel = () => {

    const imageUrls = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
    ];
    const titles = [
        'Transforming Lives',
        'Milestones of Impact',
        'Empowering Healthcare Access',
        'From Challenges to Triumphs',
        ' Beyond Borders',
        ' Impactful Innovations',
       
    ];
    const descriptions = [
        'Our medical camps provide essential screenings, treatments, and education, touching countless lives in remote areas and fostering healthier communities',
        'Each camp reduces disease prevalence, increases awareness, and serves as a catalyst for change, leaving a lasting mark on healthcare disparities',
        'Our camps provide vital treatments, vaccinations, and education, paving the way for a healthier, more informed future in communities',
        'Witness stories of resilience and hope from our camps, addressing endemic health issues and fostering proactive healthcare cultures',
        'Our camps transcend geographical barriers, collaborating to improve health across diverse populations and delivering healthcare where its needed most',
        'Technology elevates camp impact, optimizing resources and data management for maximum positive outcome',
       
    ];


    return (
        <div className='bodySlide2 h-[500px]'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                speed={600}
                parallax={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Parallax, Pagination, Navigation]}
                className="mySwiper"
            >
                {imageUrls.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <div
                            slot="container-start"
                            className="parallax-bg"
                            style={{
                                'background-image': `url(${imageUrl})`,
                            }}
                            data-swiper-parallax="-50%"
                        ></div>
                        <div className='bg-black bg-opacity-50 w-0 md:w-[700px] md:px-5 pt-40'>
                            <div className="title mt-40 text-xl md:text-4xl my-5 ml-10" data-swiper-parallax="-300">
                                {titles[index]}
                            </div>
                            <div className="md:text-xl bg-black bg-opacity-50 md:w-[700px] px-5 py-4 ml-10" data-swiper-parallax="-100%">
                                <p className='w-[200px] md:w-full'>
                                    {descriptions[index]}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;