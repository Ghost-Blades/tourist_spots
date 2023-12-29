import React, { useEffect, useState } from "react";
import { Card, Icon } from "@rneui/themed";
import { URL_server } from "../data/data.json";
import { Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Rating } from "react-native-ratings";
import Tags from "react-native-tags";
import { add_Favorite, remove_Favorite } from "../data/Request";
import { useNavigation } from "@react-navigation/native";

export const Card_point = ({ data, favorites }) => {

    const navigate = useNavigation();

    const [isFavorite, setIsFavorite] = useState(favorites.some(item => item.Point === data.ID));

    const Image_point = (Foto_point) => {
        return <Image
            resizeMode="cover"
            height={150}
            width={150}
            style={{ margin: "0px 0px 15px", borderRadius: 15, backgroundColor: "#79B9BB" }}
            source={{ uri: URL_server + "/image/" + Foto_point }}
        />
    }

    const Map_image_point = () => {
        try {
            const parsedData = JSON.parse(data.Foto_point);

            if (!Array.isArray(parsedData)) {
                // Single Image
                return (
                    Image_point(data.Foto_point)
                );
            } else {
                // Carousel
                return (
                    Image_point(parsedData[0])
                );
            }
        } catch (error) {
            return (
                Image_point(data.Foto_point)
            );
        }
    }

    const addFavorite = add_Favorite();
    const removeFavorite = remove_Favorite();

    return <TouchableOpacity onPress={() => navigate.navigate("Point_item", {
        data: data,
        favorites: favorites
    })}>

        <Card containerStyle={{ paddingVertical: 15, paddingHorizontal: 15 }}>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", gap: 15 }}>
                <View style={{ position: "relative" }}>
                    {
                        Map_image_point()
                    }
                    <TouchableOpacity style={{
                        position: "absolute",
                        backgroundColor: "white",
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        margin: 5,
                        borderRadius: 50,
                        left: 0,
                    }}
                        onPress={() => {
                            if (!isFavorite) {
                                addFavorite(data.ID)
                            } else {
                                removeFavorite(data.ID)
                            }
                            setIsFavorite(!isFavorite)
                        }}
                    >
                        <Icon type="material-community" name={isFavorite ? "map-marker-check" : "map-marker"} color={isFavorite ? "green" : "black"} size={25} />
                    </TouchableOpacity>
                </View>
                <View>

                    <Text style={{ fontSize: 16, fontWeight: "900" }} numberOfLines={2} ellipsizeMode="tail">{
                        data.Name_point.length > 17 ?
                            (data.Name_point).substring(0, 16) + "..." :
                            (data.Name_point)
                    }</Text>

                    <Rating
                        //showRating
                        readonly
                        fractions={1}
                        startingValue={data.Rating_point}
                        type="star"
                        showReadOnlyText={false}
                        imageSize={30}
                        style={{ alignItems: 'flex-end', margin: 5, right: 0, backgroundColor: "transparent" }}
                    />

                    <Tags
                        readonly={true}
                        initialTags={["dog", "cat", "chicken", "chicken"]}
                        containerStyle={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 5,
                            borderTopColor: 'gray',
                            borderTopWidth: 2,
                            marginTop: 10,
                            paddingTop: 5,
                        }}
                        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                            index < 3 ?
                                tag.length < 5 ?
                                    <TouchableOpacity
                                        key={`${tag}-${index}`}
                                        onPress={onPress}
                                        style={{
                                            backgroundColor: "lightgray",
                                            borderRadius: 15,
                                            paddingHorizontal: 8,
                                            paddingVertical: 2.5,
                                        }}>

                                        <Text h4 h4Style={{ fontSize: 12 }}>#{tag}</Text>


                                    </TouchableOpacity> : null :
                                <TouchableOpacity
                                    key={`${tag}-${index}`}
                                    onPress={onPress}
                                    style={{
                                        backgroundColor: "lightgray",
                                        borderRadius: 15,
                                        paddingHorizontal: 18,
                                        paddingVertical: 2.5,
                                    }}>

                                    <Text h4 h4Style={{ fontSize: 12 }}>...</Text>


                                </TouchableOpacity>
                        )}
                    />

                </View>

            </View>





        </Card >
    </TouchableOpacity>

};