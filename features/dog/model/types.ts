import { UserProfile } from "@/entities/user/model/useUserStore";

//*안쓰는 타입임
export interface EditDogBtnProps{
    onClick: () => void;
}

export interface DogRegisterModalProps{
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile | null
}

export interface DogRegisterForm{
    name: string;
    breed: string;
    weight: string;
    description: string;
    birthDate: string;
}