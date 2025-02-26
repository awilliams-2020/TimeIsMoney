import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { GeneratedImage } from '../screens/HomeScreen';
import { useHttpClient } from '../hooks/useHttpClient';

export const Prompt = () => {
    const request = useHttpClient()
    const queryClient = useQueryClient()
    const [text, setText] = useState('');
    const mutation = useMutation({
        mutationFn: (prompt: any) => {
            return request({
                method: 'post',
                url: '/image',
                data: prompt
            })
        },
        onError(error, prompt) {
            console.log("onError: " + prompt)
            ToastAndroid.show('Image not created', ToastAndroid.SHORT,);
        },
        onSuccess({data}, prompt, context) {
            setText('')
            console.log("onSuccess: " + JSON.stringify(data.image))
            queryClient.setQueryData(['images'], (old: Array<GeneratedImage>) => [data.image, ...old])
        }
    })

    return (
        <View style={styles.view}>
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
            {/* mutation.isPending */}
            {mutation.isPending ? (
                <ActivityIndicator style={styles.pendingEnd} color='black' />
            ) : (
                <>
                    {text.length > 4 && (
                        <Text
                            onPress={() => mutation.mutate({ prompt: text })}
                            style={styles.button}>
                            Create
                        </Text>
                )}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        backgroundColor: '#212529',
    },
    input: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingLeft: 10,
        marginTop: 15,
        marginStart: 15,
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