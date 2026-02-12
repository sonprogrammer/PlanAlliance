'use client'

import { useDogStore } from "@/entities/dog/model/types"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { useImageUpload } from "@/features/dog/lib/useImageUpload"
import { DogDetailModalProps } from "@/features/dog/model/types"
import { useUpdateMyDogs } from "@/features/dog/model/useUpdateMyDogs"
import { DogFormFields } from "@/features/dog/ui/DogFormFields"
import { Camera, Ellipsis, X } from "lucide-react"
import { useState } from "react"

export function DogDetailModal({ dog, isOpen, onClose }: DogDetailModalProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const setSelectedDog = useDogStore(state => state.setSelectedDog)
    const selectedDog = useDogStore(state=> state.selectedDog)
    const profile = useUserStore(state => state.profile)
    console.log('profile', profile)

    const { imagePreview, imageFile, fileInputRef, handleImageChange} = useImageUpload(dog?.image_url)
    const {mutate: updatedMutate} = useUpdateMyDogs()

    console.log('dafads', dog)
    if (!isOpen) return null

    const handleEdit = () => {
        setIsEdit(false)
        if (!dog?.id || !profile?.id || !selectedDog) {
            alert("데이터를 불러오는 중입니다.");
            return;
        }
        updatedMutate({dogId: dog?.id, imageFile, formData: {
            name: selectedDog?.name,
            breed: selectedDog?.breed,
            weight: selectedDog?.weight,
            description: selectedDog?.description,
            birth_date: selectedDog?.birth_date,
            image_url: selectedDog?.image_url
        }, userId: profile?.id})
    }

    return (
        <div className="fixed h-screen inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => {onClose(); setIsEdit(false)}}
        >
            <div className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-center p-8 pb-4">
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                        <X className="w-6 h-6" />
                    </button>

                    {isEdit ? (
                        <button onClick={() => setIsEdit(false)} className="text-sm font-bold text-slate-400 underline underline-offset-4">
                            취소
                        </button>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className="p-2 hover:bg-orange-50 rounded-full text-slate-400">
                            {/* TODO 클릭시 삭제 혹은 수정 드롭다운 */}
                            <Ellipsis className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="p-8 pt-0 space-y-6 max-h-[70vh] overflow-y-auto">

                    {isEdit && dog ? (
                        <DogFormFields 
                        formData={{
                            name: dog.name,
                            breed: dog.breed,
                            weight: dog.weight,
                            birth_date: dog.birth_date,
                            description: dog.description,
                            image_url: dog.image_url
                        }} 
                        setFormData={(newData) => {
                            setSelectedDog({
                                ...dog,
                                ...newData,
                                weight: isNaN(Number(newData.weight)) ? dog.weight : Number(newData.weight)
                            });
                        }}
                        imagePreview={imagePreview}
                        onImageChange={handleImageChange}
                        fileInputRef={fileInputRef}
                        />
                    ) :
                        (
                            <>
                                {/* //*사진 섹션 */}
                                <div className="flex flex-col items-center mb-4">
                                    <div className="relative w-28 h-28 rounded-[2.5rem] bg-orange-50 overflow-hidden shadow-inner">
                                        <img src={dog?.image_url || "/icon.png"} className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {/* //*이름 */}
                                    <div>
                                        <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">강아지 이름</label>
                                        <p className="text-xl font-black text-slate-800 ml-1">{dog?.name}</p>
                                    </div>

                                    <div className="flex-1">
                                        <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">품종</label>
                                        <p className="text-xl font-black text-slate-800 ml-1">{dog?.breed}</p>
                                    </div>

                                    {/* //*몸무게 */}
                                    <div>
                                        <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">몸무게</label>
                                        <p className="text-lg font-bold text-slate-700 ml-1">{dog?.weight} kg</p>
                                    </div>

                                    {/* //*생일 */}
                                    <div>
                                        <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">생일</label>
                                        <p className="text-lg font-bold text-slate-700 ml-1">{dog?.birth_date}</p>
                                    </div>
                                </div>
                                {/* //* 성격등  */}
                                <div>
                                    <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">특이사항</label>
                                    <p className="text-sm text-slate-500 leading-relaxed ml-1 bg-slate-50 p-4 rounded-2xl italic">
                                        {`"${dog?.description || '작성된 특징이 없습니다.'}"`}
                                    </p>
                                </div>
                            </>
                        )}

                {isEdit && (
                    <button
                        onClick={handleEdit}
                     className="w-full py-5 bg-orange-400 text-white font-black rounded-3xl shadow-lg shadow-orange-100 animate-in slide-in-from-bottom-2">
                        변경사항 저장하기
                    </button>
                )}
                </div>


            </div>

        </div >
    )
}