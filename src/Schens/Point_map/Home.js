import { Avatar, Button, Card, Icon, Image, Text } from "@rneui/themed"
import { useContext, useEffect, useState } from "react";
import { Alert, ImageBackground, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context, DataContext } from "../../data/settings";
import { Overlay_Auth } from "../../UI/Overlay_Auth";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {

    const navigation = useNavigation();

    const [isVisible, setIsVisible] = useState(false);
    const { User_date, isLogin, updateLoginStatus } = useContext(Context);
    const { Type_point } = useContext(DataContext);

    const close = async () => {
        await AsyncStorage.removeItem('Login');
        updateLoginStatus()
    }

    const title = "ds";

    return <>

        <Overlay_Auth isVisible={isVisible} setIsVisible={setIsVisible} />

        <ScrollView
            style={{
                width: '100%',
                height: '100%',
            }}
        >

            <View style={{
                backgroundColor: '#50A1AC',
                width: '100%',
                height: 'auto',
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 15
            }}>
                <View
                    style={{
                        width: "90%",
                        alignItems: "flex-end",
                        paddingRight: 10,
                        marginBottom: 15,
                    }}
                >
                    {
                        !isLogin ?
                            <Avatar
                                rounded
                                icon={{ type: 'font-awesome-5', name: "users", color: '#0C6B7F', size: 25 }}
                                onPress={() => { setIsVisible(!isVisible) }}
                                size={'medium'}
                                containerStyle={{ backgroundColor: "white", borderColor: "#0C6B7F", borderWidth: 2 }}
                            />
                            :
                            <Avatar
                                rounded
                                title={title[0]}
                                titleStyle={{ color: 'black', fontWeight: "900", }}
                                onPress={() => navigation.navigate("User_bottom")}
                                size={'medium'}
                                containerStyle={{ backgroundColor: "white", borderColor: "#0C6B7F", borderWidth: 2 }}
                            />
                    }
                </View>

                <View style={{
                    width: '100%',
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: 'space-between',
                    flexDirection: "row",
                    gap: 5,
                    paddingHorizontal: 5

                }}>

                    {
                        Type_point == ([] || undefined || null) ? (<Text>ffd</Text>) :
                            Type_point.map(item => (
                                <Button
                                    key={item.ID}
                                    type="clear"
                                    buttonStyle={{
                                        borderWidth: 2,
                                        borderColor: "#459DA1",
                                        backgroundColor: "#176D84",
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        borderRadius: 50,
                                    }}
                                    containerStyle={{
                                        width: 190
                                    }}
                                    titleStyle={{
                                        color: "#E5E5E5",
                                        fontSize: 18,
                                        fontWeight: "900"
                                    }}
                                    onPress={() => navigation.navigate("Points", {
                                        data: item
                                    })}
                                >{item.Name_Type}</Button>
                            ))
                    }
                </View>

            </View>

            <ImageBackground
                resizeMode="cover"
                style={{ width: '100%', height: 550 }}
                source={{ uri: "https://mebellka.ru/wp-content/uploads/b/8/7/b87b0e04630ad74ad48ce7108a9a5246.jpeg" }}
            >
            </ImageBackground>
        </ScrollView >


    </>

}