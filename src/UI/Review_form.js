import { Button } from "@rneui/themed"
import { TextInput, View } from "react-native"
import { AirbnbRating, Rating } from "react-native-ratings";

export const Reciew_form = () => {

    return <>
        <View style={{ marginBottom: 25 }}>
            <View style={{ alignItems: "flex-start" }}>
                <Rating
                    ratingCount={5}
                    size={40}
                    ratingContainerStyle={{ width: "100%", alignItems: "flex-start", paddingHorizontal: 5 }}
                />
                <TextInput
                    multiline
                    autoFocus={true}
                    style={{
                        borderColor: "#50A1AC",
                        borderWidth: 2,
                        borderRadius: 15,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        width: "100%",
                        height: 90,
                        textAlignVertical: "top",
                        marginVertical: 15,
                        fontSize: 18,
                    }}
                    placeholder="Написать отзыв"
                />
            </View>
            <Button>fds</Button>
        </View>
    </>

}