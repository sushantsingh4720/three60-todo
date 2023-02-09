import React, { useEffect, useState } from 'react'
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useAppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = () => {
    const {token,setToken} = useAppContext();
    const prepare = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(value);
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      prepare()
    },[])
  return (
    token?<MainStack/>:<AuthStack/>
    )
}

export default AppStack