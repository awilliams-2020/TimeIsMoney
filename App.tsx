import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useTh3sh0p } from './src/hooks/useTh3Sh0p';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const th3sh0p = useTh3sh0p()
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const { data } = await th3sh0p({
      method: 'GET',
      url: '/pub-key'
    });
    setPublishableKey(data);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
    >
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
            <StatusBar />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'TIM' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </StripeProvider>
  );
}

export default App;
