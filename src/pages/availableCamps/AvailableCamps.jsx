import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import UseCampsData from "../../hooks/UseCampsData";
import SectionTitle from "../../Components/SectionTitle";
import AvailableCamp from "./AvailableCamp";
import { Helmet } from 'react-helmet';


const AvailableCamps = () => {
    AOS.init({
        // Customize your settings here, such as duration, easing, etc.
        duration: 2000,
        easing: 'ease-out-cubic'
    });

    let [camps] = UseCampsData();

    const [allCamps, setAllCamps] = useState([]);
    const [sortAscending, setSortAscending] = useState(true);

    useEffect(() => {

        setAllCamps([...camps])
    }, [camps])

    const handleSort = () => {
        const sorted = [...allCamps].sort((campA, campB) => {
            const sortOrder = sortAscending ? -1 : 1; // Toggle sort order
            return sortOrder * (campA.Participants - campB.Participants);
        });

        setAllCamps(sorted);
        setSortAscending(!sortAscending);

    }
    return (
        <div className="pt-20 bg-[url('https://i.ibb.co/dLfZGkP/resul-mentes-Dbw-YNr8-RPbg-unsplash.jpg')] bg-cover bg-center min-h-screen">


            <Helmet>
                <title>CareCamp || All Available Camps</title>
            </Helmet>
            <SectionTitle subheading="---Explore All the medical camps offering diverse services---" heading="Available Camps"></SectionTitle>

            <div className="flex justify-center pt-5" >
                <div data-aos="zoom-in">
                    <div>
                        <Button gradientDuoTone="greenToBlue" onClick={handleSort} className='border-4 border-solid border-blue-700'>Sort by Participants</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-14">
                {
                    allCamps?.map(camp => <AvailableCamp key={camp._id} camp={camp}></AvailableCamp>)
                }
            </div>

        </div>
    );
};
export default AvailableCamps;