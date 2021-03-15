import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeToken(accessToken, refreshToken) {
    try{
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('isLoggedIn', true)
    } catch (e) {
        console.log('storeToken went wrong', e)
    }
}

export async function getToken() {
    return AsyncStorage.getItem('accessToken')
}

export async function isLoggedIn() {
    try {
        return AsyncStorage.getItem('isLoggedIn')
    }catch (e) {
        return false
    }
}

export async function refreshToken(accessToken) {
    await AsyncStorage.setItem('accessToken', accessToken)
}

export async function logout() {
    await AsyncStorage.setItem('accessToken', '');
    await AsyncStorage.setItem('refreshToken', '');
    await AsyncStorage.setItem('isLoggedIn', false)
}

