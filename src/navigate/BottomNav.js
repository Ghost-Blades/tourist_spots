import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "@rneui/themed";
import { Context, theme } from "../data/settings";
import { Search } from "../Schens/Point_map/Search";
import { useContext } from "react";
import { Point_map, Users } from "./StateNav";


const BottomNav = createBottomTabNavigator();

export const BottomTabNav = () => {

    const { isLogin } = useContext(Context);

    return <BottomNav.Navigator
        //initialRouteName="Home"
        //inactiveColor="#fff"
        //activeColor="#3e2465"
        initialRouteName="Home_bottom"
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
        <BottomNav.Screen name="Search_bottom" component={Search}
            options={{

                tabBarIcon: ({ focused, name, color }) => {
                    return focused ?
                        <Icon type="ionicon" name="search" size={30} color={"#0C6B7F"} />
                        :
                        <Icon type="ionicon" name="search" size={30} />
                }
            }}
        />
        {/*<BottomNav.Screen name="Reviews_bottom" component={User}
            options={{
                tabBarIcon: ({ focused, name, color }) => {
                    return focused ?
                        <Icon type="font-awesome-5" name="pencil-alt" size={30} color={"#0C6B7F"} />
                        :
                        <Icon type="font-awesome-5" name="pen" size={30} />
                }
            }}
        />*/}


        <BottomNav.Screen name="Home_bottom" component={Point_map}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, name, color }) => {
                    return focused ?
                        <Icon raised type="ionicon" name="home" size={30} color={"#0C6B7F"} />
                        :
                        <Icon reverse type="ionicon" name="home-outline" size={30} />
                }
            }}
        />

        {/*<BottomNav.Screen name="Favorite_bottom" component={User}
            options={{
                tabBarIcon: ({ focused, name, color }) => {
                    return focused ?
                        <Icon name="bookmark" size={30} color={"#E22117"} />
                        :
                        <Icon name="bookmark-border" size={30} />
                }
            }}
        />*/}


        <BottomNav.Screen name="User_bottom" component={Users}
            options={{
                tabBarIcon: ({ focused, name, color }) => {
                    return focused ?
                        <Icon type="font-awesome-5" name="user-alt" size={30} color={"#0C6B7F"} />
                        :
                        <Icon type="font-awesome-5" name="user" size={30} />
                }
            }}
        />

    </BottomNav.Navigator>

}