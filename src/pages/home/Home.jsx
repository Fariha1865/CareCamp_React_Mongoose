import { Helmet } from "react-helmet";
import Carousel from "./Carousel";
import Category from "./Category";
// import CheckMenu from "./CheckMenu";
// import MenuItems from "./MenuItems";
// import Testimonials from "./Testimonials";
import { useInView } from 'react-intersection-observer';
import PopularCamps from "./popularCamps/PopularCamps";
import Testimonials from "./Testimonials";
import UpcomingCamps from "./upcomingCamps/UpcomingCamps";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";







const Home = () => {
    const { ref, inView } = useInView({

        threshold: 0.25,
    });

    return (
        <div className="">
            <Helmet>
                <title>CareCamp || Home</title>
            </Helmet>

            <Carousel></Carousel>
            <Category></Category>
            <PopularCamps></PopularCamps>
            
            <div className="flex justify-center my-10">
            <Link to='/allCamps'><Button gradientDuoTone="greenToBlue" >See All</Button></Link>
            </div>

            <UpcomingCamps></UpcomingCamps>
            <Testimonials></Testimonials>


            {/* 
            <div className="">
                <div className="flex items-center justify-center relative">
                    <div
                        className="h-96 w-96 flex flex-col items-start justify-start"
                        ref={ref}
                    >
                        <img
                            src="https://i.ibb.co/8bBRtT1/ast.png"
                            alt="Image 1"
                            className={`transform w-72 -translate-x-full z-5 transition-transform duration-1000 ${inView ? 'translate-x-0' : ''
                                }`}
                        />
                        <img
                            src="https://i.ibb.co/GsxC7mR/sephora.jpg"
                            alt="Image 2"
                            className={`absolute w-64 transform -translate-x-full z-10 transition-transform duration-700 ${inView ? 'translate-x-0' : ''
                                }`}
                        />
                        <img
                            src="https://i.ibb.co/nMpjs2v/sea.jpg"
                            alt="Image 3"
                            className={`absolute w-60 transform -translate-x-full z-20 transition-transform duration-500 ${inView ? 'translate-x-0' : ''
                                }`}
                        />
                        <img
                            src="https://i.ibb.co/8bBRtT1/ast.png"
                            alt="Image 1"
                            className={`absolute w-56 z-25 transform -translate-x-full z-5 transition-transform duration-300 ${inView ? 'translate-x-0' : ''
                                }`}
                        />
                        <img
                            src="https://i.ibb.co/GsxC7mR/sephora.jpg"
                            alt="Image 2"
                            className={`absolute w-52 z-30 transform -translate-x-full transition-transform duration-200 ${inView ? 'translate-x-0' : ''
                                }`}
                        />
                        <img
                            src="https://i.ibb.co/nMpjs2v/sea.jpg"
                            alt="Image 3"
                            className={`absolute w-48 z-35 transform -translate-x-full  transition-transform duration-150 ${inView ? 'translate-x-0' : ''
                                }`}
                        />
                    </div>
                </div>



              
            </div> */}
        </div>
    );
};

export default Home;