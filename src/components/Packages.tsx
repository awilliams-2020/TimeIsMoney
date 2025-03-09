import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import React, { StyleSheet, Modal, View, Text, Image, Button, Pressable, ActivityIndicator, ToastAndroid } from 'react-native';
import { useStorage } from '../hooks/useStorage';
import { useHttpClient } from '../hooks/useHttpClient';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { isPast } from 'date-fns';
import { UserContext } from '../context/UserContext';

type PackagesProps = {
  isOpen: boolean,
  setIsOpen: any,
};
export const Packages = ({ isOpen, setIsOpen }: PackagesProps) => {
  const { getSession } = useStorage()
  const request = useHttpClient()
  const { setImageCredit } = useContext(UserContext)
  const [isSelected, setIsSelected] = useState(0)
  const [paymentIntent, setPaymentIntent] = useState('')
  const [enabled, setEnabled] = useState(false)
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async (imagePack: any) => {
      const userSession = await getSession()
      return request({
        method: 'post',
        url: '/image-pack',
        data: imagePack,
        headers: { 'Authorization': `Bearer ${userSession?.idToken}` }
      })
    },
    onError(error) {
      console.log({ error })
      ToastAndroid.show('There was a problem', ToastAndroid.SHORT,);
    },
    onSuccess({ data }) {
      setPaymentIntent(data.paymentIntent)
    }
  })

  const { isLoading, data } = useQuery({
    queryKey: ['credit'],
    queryFn: async () => {
        const userSession = await getSession()
        const resp = await request({
            method: 'get',
            url: '/user-credit',
            headers: {'Authorization': `Bearer ${userSession?.idToken}`}
        })
        return resp.data
    },
    enabled
})

  const createPaymentIntent = (pack) => {
    mutation.mutate({ imagePack: `pack_${pack}` })
    setIsSelected(pack)
  }

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "TimeIsMoney",
      paymentIntentClientSecret: paymentIntent,
    });
    if (error) {
      console.log(`error: ${error}`)
    }

    const { error: sheetError } = await presentPaymentSheet();
    if (sheetError) {
      console.log(`Error code: ${sheetError.code}`, sheetError.message);
    } else {
      queryClient.invalidateQueries({ queryKey: ['credit'] })
      setIsOpen(false)
      console.log('Success', 'Your order is confirmed!');
    }
  }

  useEffect(() => {
    if (isSelected && !mutation.isPending) {
      setIsSelected(0)
      initializePaymentSheet()
    }
  }, [mutation.isPending])

  useEffect(() => {
    getSession()
        .then(userSession => {
            if (userSession && !isPast(new Date(userSession.accessTokenExpirationDate))) {
                setEnabled(true)
            }
        })
  }, [])

  useEffect(() => {
    if (enabled && !isLoading && data) {
      setImageCredit(data.imageCredit)
    }
  }, [isLoading, data])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen} >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {isLoading || !enabled ? (
            <ActivityIndicator size='large' color='black' />
          ) : (
            <Text style={styles.credit}>
              <Text style={{ fontWeight: 'bold' }}>{data.imageCredit} </Text>images
            </Text>
          )}
          <View style={styles.hr}></View>
          <Pressable style={styles.imagePack} onPress={() => createPaymentIntent(1)}>
            {isSelected === 1 ? (
              <ActivityIndicator size='large' color='white' style={styles.coin} />
            ) : (
              <Image source={require('../assets/money-coin.png')} style={styles.coin} resizeMode='contain' />
            )}
            <Text style={styles.cost}>$1.00 / 20 images</Text>
          </Pressable>
          <Pressable style={styles.imagePack} onPress={() => createPaymentIntent(2)}>
            {isSelected === 2 ? (
              <ActivityIndicator size='large' color='white' style={styles.coin} />
            ) : (
              <Image source={require('../assets/money-cash.png')} style={styles.coin} resizeMode='contain' />
            )}
            <Text style={styles.cost}>$3.00 / 60 images</Text>
          </Pressable>
          <Pressable style={styles.imagePack} onPress={() => createPaymentIntent(3)}>
            {isSelected === 3 ? (
              <ActivityIndicator size='large' color='white' style={styles.coin} />
            ) : (
              <Image source={require('../assets/money-bag.png')} style={styles.coin} resizeMode='contain' />
            )}
            <Text style={styles.cost}>$5.00 / 100 images</Text>
          </Pressable>
          <Pressable
            style={[styles.closeButton]}
            onPress={() => setIsOpen(false)}>
            <Image source={require('../assets/close-bold.png')} style={styles.closeIcon} resizeMode='contain' />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  hr: {
    borderWidth: 1,
    marginBottom: 25,
    width: 300
  },
  coin: {
    width: 75,
    height: 75
  },
  imagePack: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#212529',
    width: 280,
    boxShadow: '10px 5px 5px rgba(0, 0, 0, 0.2)'
  },
  cost: {
    fontSize: 18,
    paddingStart: 16,
    color: 'white'
  },
  credit: {
    fontSize: 30,
    marginBottom: 12
  },
  closeButton: {
    marginTop: 36
  },
  closeIcon: {
    width: 35,
    height: 35
  }
});