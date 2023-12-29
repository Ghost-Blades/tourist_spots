import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { Context } from "../data/settings";
import { Auth } from "../Schens/Auth";
import { User } from "../Schens/User";
import { User_info } from "../Schens/User_info";
import { Points } from "../Schens/Point_map/Points";
import { Home } from "../Schens/Point_map/Home";
import { Favorite_point } from "../Schens/Point_map/Favorite_points";
import { Point_item } from "../Schens/Point_map/Point_item";

const Stack = createStackNavigator();

export const Point_map = () => {

    return <Stack.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,

            headerShown: false,
            tabBarShowLabel: false,

            headerStyle: {
                backgroundColor: '#50A1AC',
            },

            headerTitleStyle: {
                color: "white"
            },

            tabBarStyle: {
                position: 'absolute',
                bottom: 0
            },
            cardStyle: { backgroundColor: 'white' }
        }}
    >

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Points" component={Points} />
        <Stack.Screen name="Point_item" component={Point_item} options={({ route }) => ({
            title: route.params.data.Name_point,
        })} />

    </Stack.Navigator>

}

export const Users = () => {

    const { isLogin } = useContext(Context);


    return <Stack.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,

            headerShown: false,
            tabBarShowLabel: false,

            tabBarStyle: {
                position: 'absolute',
                bottom: 0
            }
        }}
    >

        <Stack.Screen name="User" component={isLogin ? User : Auth} />
        <Stack.Screen name="UserInfo" children={User_info} />
        <Stack.Screen name="Favorite_points" children={Favorite_point} />
        <Stack.Screen name="Point_item" component={Point_item} options={({ route }) => ({
            title: route.params.data.Name_point,
        })} />
    </Stack.Navigator>

}
