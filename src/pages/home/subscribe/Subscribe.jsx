import Swal from "sweetalert2";
import "./news.css"
import SectionTitle from "../../../Components/SectionTitle";
const Subscribe = () => {


    const handleSubscribe =()=>{
          
            document.getElementById('news').value="";
            Swal.fire(
                'Subscribed !',
                'Thank you for subscribing. Check emails to get regular updates',
                'success',
            )
    }
    return (
        <div className="mb-26">
            {/* <div className="flex justify-center mt-16 md:mt-32">
                <h1 className='button2 font-mono text-blue-700 shadow-lg shadow-blue-500 md:mt-40 lg:mt-0 text-4xl lg:text-2xl font-bold'>Subscribe to get regular camp updates</h1>
            </div> */}

            <SectionTitle heading="Subscribe to get regular camp updates"></SectionTitle>

            <div className="flex justify-center my-20">
                <div className="subscribe">
                    <p>SUBSCRIBE</p>
                    <input placeholder="Your e-mail" className="subscribe-input" name="email" type="email" id="news"/>
                    <br />
                    <div className="submit-btn" onClick={handleSubscribe}>SUBMIT</div>
                </div>
            </div>

        </div>
    );
};

export default Subscribe;