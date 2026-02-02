'use client'

import { useGetNearByShops } from "@/features/search-shop/model/useGetNearByShops";
import { useSearchShops } from "@/features/search-shop/model/useSearchShops";
import { useState } from "react";

export function useAroundLogic(){
    const [showMap, setShowMap]= useState<boolean>(false)
    const [keyword, setKeyword] = useState<string>('')
    
    
    // * 주변 애견카페
    const { data: nearByData, isPending: nearByPending} = useGetNearByShops()
    // * 검색 애견카페
    const { data: searchData, isPending: searchPending} = useSearchShops(keyword)

    const isSearching = !!keyword
    const displayShops = (isSearching ? searchData : nearByData?.places) ?? []
    const displayCenter = (() => {
        if(isSearching && searchData?.[0]){
            return{lat: Number(searchData[0].y), lon: Number(searchData[0].x)}
        }
        return nearByData?.center ?? { lat: 37.5665, lon: 126.9780 }
    })()

    const handleToggleMap = () => {
        if(!showMap && isSearching && displayShops.length === 0){
            setKeyword('')
            setShowMap(true)
            return
        }
        setShowMap(prev => !prev)
    }
    
    
    return{
        showMap,
        setShowMap,
        keyword,
        setKeyword,
        handleToggleMap,
        displayCenter,
        displayShops,
        isPending: isSearching ? searchPending : nearByPending
    }
}