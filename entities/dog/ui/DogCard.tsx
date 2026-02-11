import { Dog } from "@/entities/dog/model/types"
import { ChevronRight, ChessQueen } from "lucide-react"


export function DogCard({ dog }: {dog: Dog}) {
    console.log('dog', dog)
    
    

    return (
 
        <div className="bg-white rounded-[2.5rem] p-6 border border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-4 relative">
                <div className=" w-16 h-16 rounded-full overflow-hidden bg-orange-50">
                    {/* //TODO 만약 대표 애견이면 왕관 나오게 */}
                    <ChessQueen className="absolute left-[-8] top-[-8] text-yellow-400 -rotate-20"/>
                    <img
                    // TODO 임시데이터로 해논거라 바꿔나야함, 이건 애견이 여러마리일수도 있어서 배열로 둠
                        src={dog.imageUrl || "/icon.png"}
                        alt={dog.name}
                    />
                </div>

                <div>
                    <p className="text-lg font-black text-slate-800">
                        {dog.name}
                    </p>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full">
                                        {dog.breed}
                                    </span>
                    <label></label>
                    <p className="text-sm text-slate-500">
                        몸무게 {dog.weight}kg
                    </p>
                </div>
            </div>

            <button
                // onClick={onEdit}
                className="p-2 cursor-pointer rounded-full hover:bg-orange-100 group bg-orange-50 transition-colors"
            >
                <ChevronRight className="w-6 h-6 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    )
}