import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { MutableRefObject, useContext, useEffect, useState, RefObject } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View
} from 'react-native';
import { useOAuth } from '../hooks/useOAuth';
import { useStorage } from '../hooks/useStorage';
import { Packages } from './Packages';
import { UserContext } from '../context/UserContext';
import { useMatomo } from '../hooks/useMatomo';
import { useTh3sh0p } from '../hooks/useTh3Sh0p';

type PromptProps = {
    flatListRef: RefObject<FlatList<any>>
};
export const Prompt = ({ flatListRef }: PromptProps) => {
    const [text, setText] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const { profile, imageCredit, userSession } = useContext(UserContext)
    const { getSession } = useStorage()
    const { isLoading, signin } = useOAuth()
    const th3sh0p = useTh3sh0p()
    const queryClient = useQueryClient()
    const { trackEvent } = useMatomo();
    const google = require('../assets/google.png')

    const mutation = useMutation({
        mutationFn: async (prompt: any) => {
            const userSession = await getSession()
            return th3sh0p({
                method: 'post',
                url: '/image',
                data: prompt,
                headers: { 'Authorization': `Bearer ${userSession?.idToken}` }
            })
        },
        onError(error) {
            console.log({ error })
            ToastAndroid.show('Image not created', ToastAndroid.SHORT,);
        },
        onSuccess() {
            setText('')
            queryClient.invalidateQueries({ queryKey: ['images'] })
            flatListRef.current?.scrollToIndex({ index: 0 })
            queryClient.invalidateQueries({ queryKey: ['credit'] })
        }
    })

    const createImage = () => {
        trackEvent('image', 'click', 'create', imageCredit)
        if (!imageCredit) {
            setIsOpen(true)
        } else {
            mutation.mutate({ prompt: text })
        }
    }

    return (
        <View style={styles.view}>
            {profile ? (
                <>
                    <Pressable onPress={() => {
                        trackEvent('profile', 'click', 'open')
                        setIsOpen(true)
                    }}
                        style={styles.container}>
                        <Image source={{ uri: profile.image }} style={[styles.icon, { borderRadius: 15 }]} />
                    </Pressable>
                    <TextInput
                        readOnly={mutation.isPending}
                        onChangeText={setText}
                        value={text}
                        placeholder='Describe the image you want to create'
                        placeholderTextColor="black"
                        style={[
                            styles.input,
                            (text.length <= 4 && !mutation.isPending) && styles.inputEnd
                        ]}
                        multiline={false}
                        numberOfLines={1}
                    />
                </>
            ) : (
                <>
                    {isLoading ? (
                        <View style={styles.container}>
                            <ActivityIndicator color='white' style={styles.icon} />
                        </View>
                    ) : (
                        <Pressable
                            onPress={() => {
                                trackEvent('profile', 'click', 'signin')
                                signin()
                            }}
                            style={styles.container}>
                            <Image source={google} style={styles.icon} />
                            <Text style={styles.signup}>Sign in</Text>
                        </Pressable>
                    )}
                </>
            )}
            {mutation.isPending ? (
                <ActivityIndicator style={styles.pendingEnd} color='black' />
            ) : (
                <>
                    {text.length > 4 && (
                        <Text
                            disabled={!userSession}
                            onPress={createImage}
                            style={styles.button}>
                            Create
                        </Text>
                    )}
                </>
            )}
            <Packages isOpen={isOpen} setIsOpen={setIsOpen} />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10,
        width: 32,
        height: 32
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15
    },
    view: {
        flexDirection: 'row',
        backgroundColor: '#212529',
    },
    signup: {
        marginStart: 15,
        color: 'white'
    },
    input: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingLeft: 10,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: 'white',

    },
    pendingEnd: {
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 15,
        marginEnd: 15,
        marginBottom: 15
    },
    inputEnd: {
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15,
        marginEnd: 15,
        marginBottom: 15
    },
    button: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#198754',
        paddingRight: 15,
        paddingLeft: 15,
        verticalAlign: 'middle',
        color: 'white',
        marginTop: 15,
        marginEnd: 15,
        marginBottom: 15
    }
})