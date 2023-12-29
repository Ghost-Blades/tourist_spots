import { useNavigation } from "@react-navigation/native";
import { Button, Card, Icon, Overlay, Skeleton, Text } from "@rneui/themed"
import { useState } from "react";
import { Alert, ImageBackground, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { URL_server } from "../../data/data.json"
import { Rating } from "react-native-ratings";
import { Image } from "react-native";
import { Reviews_list } from "../../UI/Reviews_list";
import { Reciew_form } from "../../UI/Review_form";
import { add_Favorite, remove_Favorite } from "../../data/Request";


export const Point_item = ({ route }) => {

    const item = route.params.data;
    const favorite = route.params.favorites;
    const navigation = useNavigation();

    const [isVisible, setIsWisble] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorite.some(items => items.Point === item.ID))

    const images = () => {
        if (item.Foto_point == null) {
            return <Skeleton animation="none" width={'100%'} height={550} />
        } else {
            try {
                const image_item = JSON.parse(item.Foto_point);
                if (Array.isArray(image_item)) {
                    return <Carousel
                        data={image_item}
                        renderItem={({ item }) => (
                            <Image
                                resizeMode="cover"
                                height={550}
                                style={{ margin: "0px 0px 15px" }}
                                source={{ uri: URL_server + "/image/" + item }}
                            />
                        )}
                        containerCustomStyle={{ backgroundColor: "#79B9BB", marginHorizontal: 5 }}
                        sliderWidth={400}
                        itemWidth={400}

                        layout={'stack'}
                        layoutCardOffset={18}
                    />
                }
            } catch {
                return <ImageBackground
                    blurRadius={15}
                    style={{ width: '100%', height: 550 }}
                    source={{ uri: URL_server + "/image/" + item.Foto_point }}
                >
                    <Image
                        resizeMode="cover"
                        height={550}
                        style={{ margin: "0px 0px 15px" }}
                        source={{ uri: URL_server + "/image/" + item.Foto_point }}
                    />
                </ImageBackground>
            }

        }
    }
    const addFavorite = add_Favorite();
    const removeFavorite = remove_Favorite();

    const dates = JSON.parse(item.Description_point)

    return <>

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 2,
        }}
        >
            <Icon name="chevron-left" size={45}
                onPress={() => navigation.goBack()}
                containerStyle={{ borderRadius: 50 }}
            />

            <Icon
                type="material-community"
                name={isFavorite ? "map-marker-check" : "map-marker"}
                color={isFavorite ? "green" : "#50A1AC"} size={45}
                onPress={() => {
                    if (!isFavorite) {
                        addFavorite(item.ID)
                    } else {
                        removeFavorite(item.ID)
                    }
                    setIsFavorite(!isFavorite)
                }}
                containerStyle={{ borderRadius: 50 }}
            />

        </View>

        <ScrollView style={{ paddingBottom: 25 }}>

            {
                images()
            }

            <View style={{ paddingHorizontal: 5 }}>
                <Text h1>{item.Name_point}</Text>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", alignSelf: 'flex-start' }}>
                    <Rating
                        readonly
                        fractions={1}
                        startingValue={item.Rating_point}
                        type="star"
                        showReadOnlyText={false}
                        imageSize={30}
                        style={{ alignItems: 'flex-end', margin: 5, right: 0, backgroundColor: "transparent" }}
                    />
                    <TouchableOpacity onPress={() => setIsWisble(true)}>
                        <Text h4 h4Style={{ fontSize: 20, textDecorationLine: "underline" }}>{item.Koll_Rating} отзыва</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Card>
                <Text>
                    <Text h4 h4Style={{ fontSize: 18 }}>Адрес: </Text>
                    {"\n"}{item.Adress_point}
                </Text>

                {
                    dates.hasOwnProperty('URL') ?
                        <Text>
                            <Text h4 h4Style={{ fontSize: 18 }}>Сайт: </Text>
                            {"\n"}{dates.URL}
                        </Text>
                        : null
                }
                {
                    dates.hasOwnProperty('phone') ?
                        <Text>
                            <Text h4 h4Style={{ fontSize: 18 }}>Телефон: </Text>
                            {"\n"}{dates.phone}
                        </Text>
                        : null
                }

            </Card>

            <View style={{ height: 60 }} />

        </ScrollView>

        <Overlay
            isVisible={isVisible}
            fullScreen={true}
            overlayStyle={{ alignSelf: 'flex-start' }}
        >
            <View style={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: 15,

            }}>
                <Icon
                    name="keyboard-arrow-down"
                    size={40}
                    onPress={() => setIsWisble(false)}
                    containerStyle={{
                        borderRadius: 50,
                        borderColor: "#50A1AC",
                        borderWidth: 2
                    }}
                />
            </View>

            <ScrollView style={{ width: "100%", height: "100%" }}>

                <Reciew_form />

                <Reviews_list User_ID={item.ID} />

            </ScrollView>

        </Overlay>


    </>

}