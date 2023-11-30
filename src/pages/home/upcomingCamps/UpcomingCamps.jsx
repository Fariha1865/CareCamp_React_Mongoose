import PageCovers from "../../../Components/PageCovers";
import AOS from 'aos';
import 'aos/dist/aos.css';
import banner from "../../../assets/home/bannerUp.jpg"


import SectionTitle from "../../../Components/SectionTitle";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/AxiosSecure";
import UpcomingCamp from "./UpcomingCamp";
import Marquee from "react-fast-marquee";

const UpcomingCamps = () => {
    const axiosSecure = useAxiosSecure();
    const [camps,setCamps] = useState();
    
    AOS.init({
        // Customize your settings here, such as duration, easing, etc.
        duration: 2000,
        easing: 'ease-out-cubic'
    });

    // let [camps] = UseCampsData();
    useEffect(()=>{
        axiosSecure.get('/upcomingCamps')
        .then(res=>{
           
           setCamps(res?.data?.slice(0, 8))
            
        })
              
        

    },[axiosSecure])

    const [allCamps, setAllCamps] = useState([]);




    useEffect(()=>{
   
         setAllCamps(camps)
    },[camps])

    console.log(allCamps)


    return (
        <div>
            <div>
                <PageCovers image={banner} title="Upcoming Medical Camps Near You!" subTitle="Dive into a curated selection of sought-after medical camps featuring specialized services. Engage with skilled healthcare professionals, access expert advice, and prioritize your well-being. Convenient schedules and locations make proactive healthcare accessible for everyone"></PageCovers>
            </div>

            <SectionTitle subheading="---Explore Upcoming medical camps offering diverse services---" heading="Upcoming Camps"></SectionTitle>


            <Marquee pauseOnHover>
            <div className="flex">
                {
                    allCamps?.map(camp => <UpcomingCamp key={camp._id} camp={camp}></UpcomingCamp>)
                }
            </div>
            </Marquee>

        </div>
    );
};

export default UpcomingCamps;

