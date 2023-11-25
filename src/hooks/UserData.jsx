import {
    useQuery,
} from '@tanstack/react-query'
import useAxiosSecureCalls from './AxiosSecureCalls';



const UserData = () => {

    const axiosSecureCalls = useAxiosSecureCalls();



    const { data: users = [] ,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {

            const res = await axiosSecureCalls.get('/users');
            return res.data;
        },


    })


    return [users,refetch];
};

export default UserData;