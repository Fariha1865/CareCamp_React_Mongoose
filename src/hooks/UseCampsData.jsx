import {
    useQuery,
} from '@tanstack/react-query'
import useAxiosSecure from './AxiosSecure';



const UseCampsData = () => {

    const axiosSecure = useAxiosSecure();



    const { data: camps = []} = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {

            const res = await axiosSecure.get('/camps');
            return res.data;
        },


    })


    return [camps];
};

export default UseCampsData;