import { DogRegisterToSever } from './types';
import { updateDogs } from "../api/updateDogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMyDogs = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({userId, formData, dogId, imageFile}: {userId: string, formData: DogRegisterToSever, dogId: string, imageFile?: File |null}) => updateDogs({dogId, formData, userId, imageFile}),
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', variables.userId]})
            console.log('data form update hooks', data)
            alert('수정 성공')
        },
        onError: (err) => {
            console.error(err)
            alert('수정 실패')
        }
    })
}