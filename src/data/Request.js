import axios from "axios";
import { useContext, useState } from "react";
import { URL_server } from './data.json';
import { Context, DataContext } from "./settings";
import { Alert } from "react-native";
import reactNativeBcrypt from "react-native-bcrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthSignIn = async (Login, Password) => {

    try {
        const { data } = await axios.get(URL_server + "/user")

        for (let i = 0; i < data.length; i++) {
            if (data[i].Login === Login && reactNativeBcrypt.compareSync(Password, data[i].Password)) {
                //console.log(JSON.stringify(data[i]));
                //return JSON.stringify(data[i]);
                return data[i];
            }
        }
        return { "success": false, "message": 'Invalid credentials' };
    } catch (error) {
        // Обработка ошибок, например, вывод в консоль
        console.error('Error during authentication:', error);
        return { "success": false, "message": 'Error during authentication' };
    }

}

export const AuthSignUp = async (User_name, Login, Password) => {

    try {
        const requestData = {
            User_name: User_name,
            Login: Login,
            Password: Password
        }

        await axios.put(URL_server + '/user', requestData)
            .then(function (response) {
                return { "success": true };
            })
            .catch(function (error) {
                console.error('Error during authentication:', error);
                return { "success": false, "message": 'Invalid credentials' };
            })

        return { "success": true };

    } catch (error) {
        // Обработка ошибок, например, вывод в консоль
        console.error('Error during authentication:', error);
        return { "success": false, "message": 'Error during authentication' };
    }



}

export const categories = (type) => {

    const [data, setData] = useState([])

    //const datas = [
    //    { label: 'Item 1', value: '1' },
    //    { label: 'Item 2', value: '2' },
    //    { label: 'Item 3', value: '3' },
    //    { label: 'Item 4', value: '4' },
    //    { label: 'Item 5', value: '5' },
    //    { label: 'Item 6', value: '6' },
    //    { label: 'Item 7', value: '7' },
    //    { label: 'Item 8', value: '8' },
    //];

    for (let index = 0; index < 12; index++) {
        setData([...data, { label: 'Item ' + index.toString(), value: '' + index.toString() }])
    }


    return data

}

export const add_Favorite = () => {
    const { updateData } = useContext(DataContext);

    const addFavorite = async (Point_ID) => {
        try {
            const key = JSON.parse(await AsyncStorage.getItem("Login"));
            const requestData = {
                User_ID: key.User_KEY,
                Point_ID: Point_ID,
            };

            await axios.put(URL_server + '/favorite', requestData);

            // Обновите данные и верните сообщение об успешном выполнении
            await updateData();
            return { success: true, message: 'Точка успешно добавлена в избранное' };
        } catch (error) {
            // Обработайте конкретные ошибки или залогируйте их
            console.error('Ошибка при добавлении в избранное:', error);

            return { success: false, message: 'Ошибка при добавлении точки в избранное' };
        }
    };

    return addFavorite;
}


export const remove_Favorite = () => {
    const { updateData } = useContext(DataContext)

    const removeFavorite = async (Point_ID) => {
        try {
            const key = JSON.parse(await AsyncStorage.getItem("Login"));

            const requestData = {
                User_ID: key.User_KEY,
                Point_ID: Point_ID,
            };

            await axios.delete(URL_server + '/favorite/' + JSON.stringify(requestData));

            // Update data and return a success message
            await updateData();
            return { success: true, message: 'Point removed from favorites successfully' };
        } catch (error) {
            // Handle specific errors or log them
            console.error('Error during favorite removal:', error);

            return { success: false, message: 'Error removing point from favorites' };
        }
    };

    return removeFavorite;

}