import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { PhoneScreen } from '../screens/onboarding/PhoneScreen';
import { OtpScreen } from '../screens/onboarding/OtpScreen';
import { NameScreen } from '../screens/onboarding/NameScreen';
import { DoneScreen } from '../screens/onboarding/DoneScreen';
import { TabNavigator } from './TabNavigator';
import { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList & { Main: undefined }>();

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Phone" component={PhoneScreen} />
    <Stack.Screen name="Otp" component={OtpScreen} />
    <Stack.Screen name="Name" component={NameScreen} />
    <Stack.Screen name="Done" component={DoneScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);
