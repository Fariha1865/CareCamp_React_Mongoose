import { Button } from "flowbite-react";
import "../home/style.css"
import Aos from "aos";
import { Link } from "react-router-dom";

const AvailableCamp = ({ camp }) => {
    Aos.init({
        duration: 2000,
        easing: 'ease-out-cubic'
    });



    return (
        <div>

            {/* <div data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"> */}
            <div data-aos="zoom-in">
                <div className="card transform hover:scale-105 transition duration-300 ease-in-out">
                    <div className="bg p-3">
                        <img src={camp?.Image} alt="" className="w-full h-36" />
                        <h1 className="text-black text-lg font-bold text-center mt-3">{camp?.CampName}</h1>
                        <h1 className="text-black font-bold text-center text-sm mt-2"><span className="text-blue-800">Date:</span> {camp?.ScheduledDateTime}, <span className="text-blue-800">Participants:</span> {camp?.Participants}</h1>
                        <div className="flex gap-10 items-center mt-3 h-10">
                            <h1 className="text-black font-bold "><span className="text-blue-800">CampFees:</span> {camp?.CampFees}</h1>
                            <h1 className="text-black font-bold text-xs">{camp?.Venue}, {camp?.Location}</h1>
                        </div>
                        <div className="flex gap-10 items-center mt-3 h-20">
                            <h1 className="text-black font-bold text-xs"><span className="text-blue-800 underline mb-3">Specialized Services:</span><br /> <li>{camp?.SpecializedServices[0]}</li><li>{camp?.SpecializedServices[1]}</li></h1>
                            <h1 className="text-black font-bold text-xs"><span className="text-blue-800 underline mb-3">Healthcare Professionals:</span><br /> <li>{camp?.HealthcareProfessionals[0].Name},{camp?.HealthcareProfessionals[0].Specialty}</li><li>{camp?.HealthcareProfessionals[1].Name},{camp?.HealthcareProfessionals[1].Specialty}</li></h1>

                        </div>
                        <div className="flex mt-5 justify-between">
                            <h1 className="text-black font-bold text-xs mt-3"><span className="text-blue-800">Target Audience:</span> {camp?.TargetAudience}</h1>
                            <Link to={`/details/${camp?._id}`}><Button gradientDuoTone="greenToBlue" >Details</Button></Link>
                        </div>
                    </div>
                    <div className="blob">

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AvailableCamp;