import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Image } from "react-native"
import { useHttpClient } from "./useHttpClient"

export const useImages = () => {
    const request = useHttpClient()

    const getImages = async ({pageParam}) => {
        const response = await request({
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
    const request = useHttpClient()
    const { data, isFetching, isSuccess } = useQuery({
        queryKey: ['imagePages'],
        queryFn: async () => {
            const response = await request({
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