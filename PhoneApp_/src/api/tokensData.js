import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "./helpers";
import {LOGIN_URL} from "./endpoints";

export function loginAsync(username, password) {
    axiosInstance.post(LOGIN_URL, {
        username: username,
        password: password
    }).then(async (respData)=>{
        if (respData.status === 200){
            const data = respData.data;
            await AsyncStorage.setItem('accessToken', data.access);
            await AsyncStorage.setItem('refreshToken', data.refresh);
            await AsyncStorage.setItem('isLoggedIn', true);
            return true
        } else {
            return false
        }
    })
}

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
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        return {
            isLoggedIn: isLoggedIn,
            accessToken: accessToken ? accessToken : '',
            refreshToken: refreshToken ? refreshToken: ''
        }
    }catch (e) {
        return {
            isLoggedIn: false,
            accessToken: '',
            refreshToken: ''
        }
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

