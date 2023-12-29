import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext, Context } from './settings';
import axios from 'axios';
import { URL_server } from "./data.json";
import { Alert } from 'react-native';

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    const [User_date, setUser_date] = useState({});

    const checkLoginStatus = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            setIsLogin(keys.includes('Login'));
            setUser_date(JSON.parse(await AsyncStorage.getItem("Login")));
        } catch (error) {
            console.error('Ошибка при проверке состояния входа:', error);
        }
    };

    const updateLoginStatus = async () => {
        await checkLoginStatus();
    };

    useEffect(() => {
        // Вызывайте функцию проверки при монтировании компонента
        checkLoginStatus();
    }, []);

    ///


    const value = {
        isLogin,
        updateLoginStatus,
        User_date,
        setUser_date,
        // Другие методы или данные, которые вы хотите предоставить через контекст
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const Point_category = ({ children }) => {

    const [Type_point, setType_point] = useState([])
    const [Categories_point, setCategories_point] = useState([])
    const [Points, setPoints] = useState([])
    const [Favorite_point, setFavorite_point] = useState([])

    const get_favorite = async () => {
        try {
            const key = JSON.parse(await AsyncStorage.getItem("Login"))
            const { data } = await axios.get(URL_server + "/favorite/" + key.User_KEY);
            setFavorite_point(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const get_category = async () => {
        try {
            const { data } = await axios.get(URL_server + "/point/category");
            setCategories_point(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const get_type = async () => {
        try {
            const { data } = await axios.get(URL_server + "/point/type");
            setType_point(data);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    const get_point = async () => {
        try {
            const { data } = await axios.get(URL_server + "/point");
            setPoints(data);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    }

    const updateData = async () => {
        await get_point()
        await get_category();
        await get_type();
        await get_favorite();
    };

    useEffect(() => {
        updateData()
    }, [])

    const value = {
        Points,
        Type_point,
        Categories_point,
        Favorite_point,
        updateData,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>

}