import { FetchShopsRes } from "@/features/search-shop/model/types"
import { KakaoPlace } from "@/shared/types/map"

export const fetchNearByShops = (): Promise<FetchShopsRes> => {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation){
            return reject(new Error('geolocation is not surporting'))
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude}

            if(!window.kakao?.maps.services){
                return reject(new Error('kakao map is not loading'))
            }

            const ps = new window.kakao.maps.services.Places()
            ps.keywordSearch('애견 카페', (res, status) => {
                if(status === window.kakao.maps.services.Status.OK){
                    console.log('res from usegetNearbyshops', res)
                    resolve({center: coords, places: res as KakaoPlace[]})
                }else{
                    reject(new Error('search failed'))
                }
            },{
                location: new window.kakao.maps.LatLng(coords.lat, coords.lon),
                radius: 2000,
                category_group_code: 'CE7'
            })
        }, reject)
    })
}