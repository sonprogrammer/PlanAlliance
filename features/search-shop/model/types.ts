import { KakaoPlace } from "@/shared/types/map"

export interface FetchShopsRes{
    center: {
        lat: number,
        lon: number
    },
    places: KakaoPlace[]
}