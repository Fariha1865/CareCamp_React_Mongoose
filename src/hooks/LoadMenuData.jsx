import { useEffect, useState } from "react";
import useAxiosSecure from "./AxiosSecure";

const LoadMenuData = () => {


    const [menu, setMenu] = useState([]);
    const axiosSecure = useAxiosSecure();
    console.log(axiosSecure)

    const url = '/menu';
    useEffect(() => {

        axiosSecure.get(url)
            .then(data => {

                console.log(data)
                const menuItems = data?.data;
                setMenu(menuItems)
            })

    }, [axiosSecure])


    return [menu];
};

export default LoadMenuData;