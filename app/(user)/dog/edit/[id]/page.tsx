import { DogFormModal } from "@/features/dog/ui/DogFormModal";

export default function DogDetailModal() {
    return(
        <div>
            <DogFormModal mode="edit" dog={dogData}/>
        </div>
    )
}