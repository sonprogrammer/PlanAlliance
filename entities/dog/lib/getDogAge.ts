import dayjs from "dayjs";

export const getDogAge = (birth_date: string | Date | undefined): string => {
    if(!birth_date) return ''

    const now = dayjs()
    const birth = dayjs(birth_date)

    const diffYear = now.diff(birth, 'year')

    if(diffYear > 0){
        return `${diffYear} 살`
    }else{
        const diffMonth = now.diff(birth, 'month')
        return `${diffMonth} 개월`
    }
}