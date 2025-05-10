import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { PackagesModal } from './PackagesModal';

export const FloatingActionButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.fab,
                    {
                        transform: [{ scale: pressed ? 0.9 : 1 }],
                    },
                ]}
                onPress={() => setIsModalOpen(true)}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
            >
                <View style={styles.plusIcon}>
                    <View style={styles.plusHorizontal} />
                    <View style={styles.plusVertical} />
                </View>
            </Pressable>
            <PackagesModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fab: {
        backgroundColor: '#212529',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    plusIcon: {
        width: 24,
        height: 24,
        position: 'relative',
    },
    plusHorizontal: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 20,
        height: 3,
        top: 10.5,
        left: 2,
    },
    plusVertical: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 3,
        height: 20,
        left: 10.5,
        top: 2,
    },
}); 