import PageCovers from "../../../Components/PageCovers";
import UseCampsData from "../../../hooks/UseCampsData";
import PopularCamp from "./PopularCamp";
import AOS from 'aos';
import 'aos/dist/aos.css';
import banner from "../../../assets/home/banner2.jpg"


import SectionTitle from "../../../Components/SectionTitle";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
const PopularCamps = () => {
    AOS.init({
        // Customize your settings here, such as duration, easing, etc.
        duration: 2000,
        easing: 'ease-out-cubic'
    });

    let [camps] = UseCampsData();

    const [allCamps, setAllCamps] = useState([]);
    const [sortAscending, setSortAscending] = useState(true); 

    camps = camps.slice(0, 8);

    useEffect(()=>{
   
         setAllCamps([...camps])
    },[camps])

    const handleSort = () => {
        const sorted = [...allCamps].sort((campA, campB) => {
            const sortOrder = sortAscending ? -1 : 1; // Toggle sort order
            return sortOrder * (campA.Participants - campB.Participants);
        });

        setAllCamps(sorted);
        setSortAscending(!sortAscending);

    }
    return (
        <div>
            <div>
                <PageCovers image={banner} title="Popular Medical Camps Near You!" subTitle="Dive into a curated selection of sought-after medical camps featuring specialized services. Engage with skilled healthcare professionals, access expert advice, and prioritize your well-being. Convenient schedules and locations make proactive healthcare accessible for everyone"></PageCovers>
            </div>

            <SectionTitle subheading="---Explore popular medical camps offering diverse services---" heading="Popular Camps"></SectionTitle>

            <div className="flex justify-center mt-5" >
                <div data-aos="zoom-in">
                    <div>
                        <Button gradientDuoTone="greenToBlue" onClick={handleSort}>Sort by Participants</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-14">
                {
                    allCamps?.map(camp => <PopularCamp key={camp._id} camp={camp}></PopularCamp>)
                }
            </div>

        </div>
    );
};

export default PopularCamps;