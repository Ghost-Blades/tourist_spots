import { Avatar, Button, Icon, ListItem, Text } from "@rneui/themed"
import { useContext } from "react"
import { DataContext, Context } from "../data/settings"
import { View } from "react-native";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { useNavigation } from "@react-navigation/native";


export const User_info = () => {

    const navigation = useNavigation();
    const { User_date } = useContext(Context);
    const { Type_point, Categories_point } = useContext(DataContext);


    return <>

        <View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                <Icon name="chevron-left" size={50}
                    onPress={() => navigation.goBack()}
                    containerStyle={{ borderRadius: 50 }}
                />
            </View>

            <ListItem>
                <Avatar
                    rounded
                    size={"large"}
                    containerStyle={{
                        backgroundColor: 'lightgray',
                        borderColor: '#50A1AC',
                        borderWidth: 3
                    }}
                />
                <ListItem.Content>
                    <ListItemTitle><Text h4>{User_date["User_name"]}</Text></ListItemTitle>
                    <ListItemSubtitle style={{ color: 'lightgray' }}>{User_date["User_KEY"]}</ListItemSubtitle>
                    <ListItemSubtitle>{User_date["Login"]}</ListItemSubtitle>
                </ListItem.Content>
            </ListItem>

        </View>

    </>
}