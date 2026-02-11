'use client'

import { Dog } from "@/entities/dog/model/types";
import { DogCard } from "@/entities/dog/ui/DogCard";
import { ChevronLeft, Clock, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function MyPetsPage() {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const router = useRouter();
    const MOCK_DOGS = [
        {
          id: "dog_1",
          name: "초코",
          breed: "푸들",
          weight: 4.5,
          birthDate: "2021-05-12",
          imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop", // 갈색 푸들 느낌
          totalHours: 40,
          usedHours: 27.5,
          status: "유치원 등원 완료",
          recentActivities: ["2/11 산책 완료", "2/10 간식 급여"]
        },
        {
          id: "dog_2",
          name: "밀키",
          breed: "비숑 프리제",
          weight: 5.2,
          birthDate: "2022-11-20",
          imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop", // 하얀 비숑 느낌
          totalHours: 20,
          usedHours: 5,
          status: "집에서 휴식 중",
          recentActivities: ["2/11 목욕 완료", "2/09 병원 검진"]
        },
        {
          id: "dog_3",
          name: "탄이",
          breed: "시바견",
          weight: 8.7,
          birthDate: "2020-03-15",
          imageUrl: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop", // 시바견 느낌
          totalHours: 60,
          usedHours: 58, // 거의 다 쓴 상태 (빨간색 경고 보여주기용)
          status: "유치원 이용 종료 임박",
          recentActivities: ["2/11 사회화 훈련", "2/10 산책 완료"]
        }
      ];

    return (
        <main className="min-h-screen bg-[#FFFAF0] p-6 pb-24">
            <header className="flex justify-between items-center mb-10">
                <button onClick={() => router.back()} className="p-2 -ml-2">
                    <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                <h1 className="text-xl font-black text-slate-800 tracking-tight">MY PETS</h1>
                <button className="text-sm font-bold text-slate-400 hover:text-red-400 transition-colors">
                    편집
                </button>
            </header>

            {/* //* 강아지 없을때 */}
            <AnimatePresence>
                {MOCK_DOGS.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <button
                            className="w-full py-12 flex flex-col items-center justify-center gap-4 bg-white/50 rounded-[2.5rem] border-4 border-dashed border-orange-100 hover:border-orange-300 hover:bg-white transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Plus className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-extrabold text-slate-700">새 식구 등록하기</p>
                                <p className="text-sm text-slate-400 mt-1">우리 아이의 소중한 기록을 시작하세요</p>
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* //* 강아지 리스트 */}
            <div className="space-y-6">
                {MOCK_DOGS.map((dog, index) => (
                    <motion.div 
                        key={dog.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-white rounded-[2.5rem] p-6 shadow-[0_10px_30px_rgba(255,165,0,0.05)] border border-orange-50 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8 opacity-50" />

                        <div className="flex items-center gap-5 relative z-10">
                            <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-slate-100 shadow-inner">
                                <img 
                                    src={dog.imageUrl || "/icon.png"} 
                                    alt={dog.name}
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-black text-slate-800">{dog.name}</h2>
                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full">
                                        {dog.breed}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm font-medium mt-1">
                                    {dog.weight}kg · {dog.birthDate}
                                </p>
                            </div>

                            <button onClick={() => router.push(`/pet-edit/${dog.id}`)} className="p-3 bg-slate-50 rounded-2xl hover:bg-orange-50 transition-colors">
                                <Trash2 className="w-5 h-5 text-slate-300 hover:text-red-400" />
                            </button>
                        </div>

                        {/* 유치원 시간 프로그레스 바 */}
                        <div className="mt-8 relative z-10">
                            <div className="flex justify-between items-end mb-3">
                                <div className="flex items-center gap-1.5 text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-bold">유치원 잔여 시간</span>
                                </div>
                                <span className="text-orange-500 font-black text-lg">12h 30m</span>
                            </div>

                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "65%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-linear-to-r from-orange-300 to-orange-500 h-full rounded-full"
                                />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-2 text-right font-medium">
                                총 40시간 중 27시간 30분 사용 완료
                            </p>
                        </div>
                    </motion.div>
                ))}

                {/* 리스트가 있을 때 하단에 추가 버튼 (플로팅 버튼 대신 리스트 끝에 배치) */}
                {dogs.length > 0 && (
                    <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center gap-2 text-slate-400 hover:bg-white hover:border-orange-200 transition-all">
                        <Plus className="w-5 h-5" />
                        <span className="font-bold">다른 아이 등록하기</span>
                    </button>
                )}
            </div>
        </main>
    )
}