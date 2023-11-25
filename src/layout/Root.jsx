import { Outlet} from "react-router-dom";

import NavigationBar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const Root = () => {



    return (
        <div>
            <NavigationBar/>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;