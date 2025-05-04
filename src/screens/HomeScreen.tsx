import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Prompt } from '../components/Prompt';
import { useImages } from '../hooks/useImages';
import { UserProvider } from '../context/UserContext';

export const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { width } = useWindowDimensions()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        fetchPreviousPage,
        hasPreviousPage,
    } = useImages()
    const flatListRef = useRef<FlatList>()

    useEffect(() => {
        setIsLoading(!isLoading)
    }, [])

    return (
        <>
            {isLoading ? (
                <View style={styles.loadingView}>
                    <ActivityIndicator style={styles.indicator} size='large' color={'black'} />
                    <Text>Loading...</Text>
                </View>
            ) : (
                <View style={{ backgroundColor: '#212529' }}>
                    <UserProvider>
                        <Prompt flatListRef={flatListRef} />
                    </UserProvider>
                    <FlatList
                        ref={flatListRef}
                        data={data?.pages.flat()}
                        renderItem={({ item }) =>
                            <Image source={{ uri: item.url }} width={width} height={width} />
                        }
                        keyExtractor={item => item.id}
                        initialNumToRender={2}
                        onStartReached={() => {
                            if (hasPreviousPage) {
                                fetchPreviousPage()
                            }
                        }}
                        onEndReached={() => {
                            if (hasNextPage) {
                                fetchNextPage()
                            }
                        }}
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