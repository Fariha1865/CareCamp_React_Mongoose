import { Outlet} from "react-router-dom";

import NavigationBar from "../pages/shared/Navbar";

const Root = () => {



    return (
        <div>
            <NavigationBar/>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;