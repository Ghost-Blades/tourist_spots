import { Text } from "@rneui/themed"
import axios from "axios"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { URL_server } from "../data/data.json"


export const Reviews_list = ({ User_ID }) => {

    const [Review, setReview] = useState([])

    useEffect(() => {
        const get_reviews = async () => {
            const data = await axios.get(URL_server + `/review/${User_ID}`)
            setReview(data);
        }
        get_reviews()
    }, [])



    return <>

        <View style={{ flex: 1, backgroundColor: "red" }}>

            {
                !Review == [] ?
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text h1>Отзывов пока нет</Text>
                    </View>
                    :
                    Review.map(Item => {
                        <Text h1>dfgds</Text>
                    })
            }

        </View>

    </>

}