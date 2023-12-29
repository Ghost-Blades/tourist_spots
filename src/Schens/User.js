import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/base"
import { Avatar, Button, Icon, ListItem, Text } from "@rneui/themed"

import { useContext, useState } from "react";
import { Context } from "../data/settings";
import { TouchableOpacity, View } from "react-native";
import { URL_server } from "../data/data.json"
import { useNavigation } from "@react-navigation/native";

export const User = () => {

    const navigation = useNavigation();

    const { updateLoginStatus, User_date } = useContext(Context);
    const [expanded, setExpanded] = useState(false);
    const close = async () => {
        await AsyncStorage.removeItem('Login');
        updateLoginStatus()
    }

    const UserInfo = () => {
        navigation.navigate('UserInfo');
    }

    const Favorite_points = () => {
        navigation.navigate('Favorite_points');
    }

    return <>
        <View style={{ alignItems: 'center', paddingTop: 25 }}>
            <Avatar
                rounded
                size={"xlarge"}
                //source={{ uri: URL_server + "" + User_date["Photo"] }}
                containerStyle={{
                    backgroundColor: 'lightgray',
                    borderColor: "#50A1AC",
                    borderWidth: 2.5,
                }}
            />
            <Text h1>{User_date["User_name"]}</Text>
        </View>

        <Card>


            <ListItem.Accordion
                content={
                    <>
                        <Icon name='account-settings-outline' type="material-community" size={40} />
                        <ListItem.Content>
                            <ListItem.Title>Пользователь</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                icon={<Icon name='keyboard-arrow-up' type="material" size={40} />}
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                <TouchableOpacity onPress={UserInfo}>
                    <ListItem >
                        <ListItem.Content>
                            <ListItem.Title>Профиль</ListItem.Title>
                        </ListItem.Content>
                        <Icon name='user' type="font-awesome-5" size={30} />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Настройки пользователя</ListItem.Title>
                        </ListItem.Content>
                        <Icon name='user-cog' type="font-awesome-5" size={25} />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={Favorite_points}>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Избранное</ListItem.Title>
                        </ListItem.Content>
                        <Icon name='cards-heart' type="material-community" size={30} color={"red"} />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={close}>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Выйти</ListItem.Title>
                        </ListItem.Content>
                        <Icon name='exit-to-app' size={30} />
                    </ListItem>
                </TouchableOpacity>

            </ListItem.Accordion>

            <ListItem>
                <Icon name='settings-outline' type="ionicon" size={40} />
                <ListItem.Content>
                    <ListItem.Title>Настройки</ListItem.Title>
                </ListItem.Content>
            </ListItem>

            <ListItem>
                <Icon name='chat-question' type="material-community" size={40} />
                <ListItem.Content>
                    <ListItem.Title>Поддержка</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </Card>


    </>

}