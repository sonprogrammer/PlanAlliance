import { fetchDogs } from "@/features/dog/api/fetchDogs";
import { useQuery } from "@tanstack/react-query";


export const useGetMyDogs = (userId: string | null | undefined) => {
    return useQuery({
        queryKey: ['my-dogs', userId],
        queryFn: () => fetchDogs(userId!),
        enabled: !!userId
    })
}