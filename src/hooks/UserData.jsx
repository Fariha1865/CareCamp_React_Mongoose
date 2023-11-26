import {
    useQuery,
} from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/Authprovider';
import useAxiosSecure from './AxiosSecure';



const UserData = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);



    const { data: userData = [] ,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {

            const res = await axiosSecure.get(`user/${user?.email}`);
            return res.data;
        },


    })


    return [userData,refetch];
};

export default UserData;