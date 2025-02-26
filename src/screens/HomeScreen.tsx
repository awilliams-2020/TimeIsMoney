import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, useWindowDimensions, View, ViewabilityConfig } from 'react-native';
import { Prompt } from '../components/Prompt';
import { GeneratedImage } from '../components/GeneratedImage';

export type GeneratedImage = {
    id: string
    url: string
}
function useImages() {
    return useQuery({
        queryKey: ['images'],
        queryFn: async (): Promise<Array<GeneratedImage>> => {
            const response = await fetch('https://th3-sh0p.com/v1/images')
            return await response.json()
        }
    })
}
export const HomeScreen = () => {
    const { width } = useWindowDimensions()
    const { data, isFetching, isSuccess } = useImages()
    const flatListRef = useRef<FlatList>()

    useEffect(() => {
        if (isSuccess) {
            flatListRef?.current?.scrollToIndex({index: 0})
        }
    })

    return (
        <>
            {isFetching ? (
                <View style={styles.loadingView}>
                    <ActivityIndicator style={styles.indicator} size='large' color={'black'} />
                    <Text>Loading...</Text>
                </View>
            ) : (
                <View style={{backgroundColor: '#212529'}}>
                    <Prompt />
                    <FlatList
                        ref={flatListRef}
                        data={data}
                        renderItem={({ item }) =>
                            <Image source={{ uri: item.url }} width={width} height={width} />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    },
    indicator: {
        height: 40,
        marginBottom: 15
    }
})