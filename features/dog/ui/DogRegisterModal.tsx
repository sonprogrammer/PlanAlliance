'use client'

import { DogRegisterForm, DogRegisterModalProps } from "@/features/dog/model/types"
import { useRegisterDog } from "@/features/dog/model/useRegisterDog"
import { Camera, X } from "lucide-react"
import { useRef, useState } from "react"


export function DogRegisterModal({ isOpen, onClose, profile }: DogRegisterModalProps) {
    const [formData, setFormData] = useState<DogRegisterForm>({ name: '', breed: '', weight: '', description: '', birthDate: '' })
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // console.log('profile', profile)
    const { mutate, isPending } = useRegisterDog()


    if (!isOpen) {
        return null
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            setImageFile(file)
            reader.onload = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!profile?.id){
            alert('로그인 정보가 없습니다. 다시 로그인해주세요. from dogRegisterModal.tsx')
            return
        }
        mutate({ formData, image: imageFile, userId: profile.id }, {
            onSuccess: () => {
                alert('등록 성공')
                onClose()
                setFormData({ name: '', breed: '', weight: '', description: '', birthDate: '' })
                setImageFile(null)
                setImagePreview(null)
            }
        })
    }

    return (
        <div 
            className="fixed h-full inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => onClose()}
            >
            <div
                className="w-full h-[80%] overflow-y-auto max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* //*헤더 */}
                <div className="flex justify-between items-center p-6 border-b border-orange-50">
                    <h2 className="text-xl font-black text-slate-800">애완견 등록</h2>
                    <button
                        className="p-2 hover:bg-orange-50 rounded-full transition-color"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6 " />
                    </button>
                </div>

                {/*//* 제출 폼 */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* //* 강아지 사진 */}
                    <div className="flex flex-col items-center justify-center">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-32 h-32 rounded-[2.5rem] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden group"
                        >
                            <img
                                src={imagePreview || "/icon.png"}
                                alt="dog-profile"
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${!imagePreview ? 'opacity-30' : 'opacity-100'}`}
                            />

                            <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
                                <Camera className={`w-8 h-8 ${imagePreview ? 'text-white drop-shadow-md' : 'text-slate-400'} mb-1`} />
                                <span className={`text-[10px] font-bold ${imagePreview ? 'text-white drop-shadow-md' : 'text-slate-400'}`}>
                                    {imagePreview ? '사진 변경' : '사진 추가'}
                                </span>
                            </div>

                            {imagePreview && (
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>


                    {/* //*강아지 이름 */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">이름</label>
                        <input
                            type="text"
                            placeholder="강아지 이름을 입력해주세요"
                            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 text-slate-800 outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-5">

                        {/* //* 품종 */}
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">품종</label>
                            <input
                                type="text"
                                value={formData.breed}
                                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                placeholder="예: 말티즈"
                                className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>
                        {/* //* 무게 */}
                        <div className="flex-2">
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">몸무게(kg)</label>
                            <input
                                type="number"
                                placeholder="0.0"
                                step="0.1"
                                className="w-full text-end p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 text-slate-800 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-1.5 ml-1 text-slate-600">생일 *</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                    className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 outline-none text-slate-800"
                                />
                            </div>
                        </div>


                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">특징</label>
                        <textarea
                            rows={3}
                            placeholder="성격이나 건강 상태 등 특이사항을 적어주세요"
                            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 text-slate-800 outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-orange-400 text-white font-black rounded-2xl hover:bg-orange-500 transition-transform active:scale-[0.98] shadow-lg shadow-orange-100"
                    >
                        {isPending ? '등록 중...' : '등록 하기'}
                    </button>
                </form>
            </div>
        </div>
    )
}