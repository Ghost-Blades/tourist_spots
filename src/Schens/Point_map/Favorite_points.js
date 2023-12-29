import { Card, Icon, Text } from "@rneui/themed"
import { useCallback, useContext, useEffect, useState } from "react"
import { Context, DataContext } from "../../data/settings"
import { useNavigation } from "@react-navigation/native"
import { RefreshControl, ScrollView, TouchableOpacity, View } from "react-native"
import { Alert } from "react-native"
import { remove_Favorite } from "../../data/Request"


export const Favorite_point = () => {

    const navigate = useNavigation();
    const { Points, Favorite_point, updateData } = useContext(DataContext);
    const { User_date } = useContext(Context);

    const KEY = User_date.User_KEY;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await updateData();
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const get_Favorites = () => {
        return Favorite_point.map((item) => {
            const data = Points.find((body) => body.ID === item.Point);
            return <Card_favorite_Point key={data.ID} data={data} />;
        });
    };

    const Card_favorite_Point = ({ data }) => {
        return (
            <TouchableOpacity>
                <Card>
                    <View
                        style={{ justifyContent: "space-between", width: '100%', display: "flex", flexDirection: "row" }}>
                        <Text
                            style={{ color: "lightgrey" }}
                        >{data.ID}</Text>
                        <Icon
                            name="close"
                            onPress={() => {
                                removeFavorite(data.ID);
                            }}
                        />
                    </View>

                    <Text h4>{data.Name_point}</Text>
                    <Text
                        style={{ color: "grey" }}
                    >{data.Adress_point}</Text>
                </Card>
            </TouchableOpacity>
        );
    };

    const removeFavorite = remove_Favorite();

    return (
        <>
            <View style={{
                width: "100%",
                height: 80,
                padding: 15,
                justifyContent: "flex-start",
                display: "flex",
                flexDirection: "row"
            }}>
                <Icon name="arrow-back-ios" onPress={() => navigate.goBack()} size={40} />
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {get_Favorites()}
            </ScrollView>
        </>
    );

}