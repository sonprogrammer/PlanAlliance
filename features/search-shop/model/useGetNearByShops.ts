'use client'

import { fetchNearByShops } from "@/features/search-shop/api/fetchNearByShops"
import { useQuery } from "@tanstack/react-query"


export const useGetNearByShops = () =>{
    return useQuery({
        queryKey: ['nearByShops'],
        queryFn: fetchNearByShops,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        retry: 2,
        refetchOnWindowFocus: false
    })

}