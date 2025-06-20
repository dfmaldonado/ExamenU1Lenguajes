import { useQuery } from "@tanstack/react-query";
import { countsAction } from "../../core/actions/statistics/counts.action";

export const useStatistics = () => {

    const { data, isLoading, error } = useQuery ({
        queryKey: ['statistics/count'], //Unique Key
        queryFn: () => countsAction(), //Function to fetch data
        staleTime: 1000 * 60 * 60 * 24, //24 hours cache
        refetchOnWindowFocus: false,
    });

    return {
        //Properties
        data,
        isLoading,
        error
        //Methods
    }

};