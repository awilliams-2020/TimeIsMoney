import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useHttpClient } from "./useHttpClient"
import Config from "react-native-config"
import { useTh3sh0p } from "./useTh3Sh0p"

export const useImages = () => {
    const th3sh0p = useTh3sh0p()

    const getImages = async ({ pageParam }) => {
        const response = await th3sh0p({
            method: 'get',
            url: `/images?page=${pageParam}`
        })
        return response.data
    }
    const query = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: getImages,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined
            }
            return lastPageParam + 1
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined
            }
            return firstPageParam - 1
        },
    })

    return query
}

export const useImagesPages = () => {
    const th3sh0p = useHttpClient(Config.API_URL, 'application/json')
    const { data, isFetching, isSuccess } = useQuery({
        queryKey: ['imagePages'],
        queryFn: async () => {
            const response = await th3sh0p({
                method: 'get',
                url: '/images/pages'
            })
            return await response.data
        }
    })

    return {
        pageTotal: data,
        isFetchingPages: isFetching
    }
}