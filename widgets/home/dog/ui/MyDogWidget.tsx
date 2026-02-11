'use client'

import { DogCard } from "@/entities/dog/ui/DogCard"
import { Dog } from "@/entities/dog/model/types"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { useGetMyDogs } from "@/features/dog/model/useGetMyDogs"
const MOCK_DOGS = [
    {
      id: "dog_1",
      name: "초코",
      breed: "푸들",
      weight: 4.5,
      birthDate: "2021-05-12",
      imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop", // 갈색 푸들 느낌
    },
    {
      id: "dog_2",
      name: "밀키",
      breed: "비숑 프리제",
      weight: 5.2,
      birthDate: "2022-11-20",
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop", // 하얀 비숑 느낌
    },
    {
      id: "dog_3",
      name: "탄이",
      breed: "시바견",
      weight: 8.7,
      birthDate: "2020-03-15",
      imageUrl: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop", // 시바견 느낌
    }
  ];

export function MyDogWidget({registerClick}: {registerClick: () => void}) {
    const router = useRouter()
    const profile = useUserStore(state => state.profile)

    const { data: dogs, isPending} = useGetMyDogs(profile?.id)
  

    const handleEdit = () => {
        //* 애견을 등록한게 있으면 마이펫페이지로 이동(수정, 확인 가능), 등록한적이 없으면 모달
        if(dogs){
            router.push('/my-pets')
        }else{
            registerClick()

        }
        console.log('수정 버튼 클릭')
    }

    if (isPending) return <div className="h-24 animate-pulse bg-slate-100 rounded-[2.5rem]" />
    
    if (!MOCK_DOGS || MOCK_DOGS.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] p-6 border-2 border-dashed border-orange-100 flex items-center justify-between">
                <div>
                    <p className="text-lg font-bold text-slate-700">
                        강아지를 등록해주세요 
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                        우리 아이 정보를 등록하면 더 편해져요
                    </p>
                </div>

                <button
                    onClick={handleEdit}
                    className="px-4 py-2 rounded-full bg-orange-400 text-white text-sm font-semibold cursor-pointer"
                >
                    등록
                </button>
            
            </div>
        )
    }
    
    return(
        // <DogCard dog={dogs ?? null} onEdit={handleEdit} />
        <div className="my-dog-swiper w-full">
            <Swiper
                modules={[Pagination]}
                spaceBetween={16} 
                slidesPerView={1}
                centeredSlides={true} 
                pagination={{ clickable: true }}
                className="pb-10" 
            >
            
                {MOCK_DOGS.map((item) => (
                    <SwiperSlide key={item.id}>
                        <DogCard dog={item} />
                    </SwiperSlide>
                ))}

                
                <SwiperSlide>
                    <button
                        onClick={registerClick}
                        className="w-full h-26 flex items-center justify-center gap-4 bg-orange-50/50 rounded-[2.5rem] border-2 border-dashed border-orange-200"
                    >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-400 font-bold shadow-sm">+</div>
                        <span className="font-bold text-orange-400/80">새 식구 등록</span>
                    </button>
                </SwiperSlide>
            </Swiper>

            <style jsx global>{`
                .my-dog-swiper .swiper-pagination-bullet-active {
                    background: #fb923c !important;
                }
                .my-dog-swiper .swiper-slide {
                    transition: transform 0.3s;
                }
                .my-dog-swiper .swiper-slide-active {
                    transform: scale(1); 
                }
            `}</style>
        </div>
    )
}