import React from 'react';
import { Modal, StyleSheet, View, Text, Pressable, Image } from 'react-native';

type FloatingModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const PackagesModal = ({ isOpen, setIsOpen }: FloatingModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your Modal Content Here</Text>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setIsOpen(false)}>
                        <Image 
                            source={require('../assets/close-bold.png')} 
                            style={styles.closeIcon} 
                            resizeMode='contain' 
                        />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    closeIcon: {
        width: 24,
        height: 24,
    },
}); 