import { Button, Card, CheckBox, Icon, Overlay, Text } from "@rneui/themed"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { DataContext } from "../../data/settings"
import axios from "axios";
import { URL_server } from "../../data/data.json"
import { Alert, RefreshControl, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { categories } from "../../data/Request";
import { Card_point } from "../../UI/Card_point";
import { useNavigation } from "@react-navigation/native";


export const Points = ({ route }) => {

    const navigate = useNavigation();

    const { data } = route.params;
    const ID = data.ID.toString();
    const { Categories_point, Points, Favorite_point, updateData } = useContext(DataContext)

    const [isVisibleFilter, setIsVisibleFilter] = useState(false);

    const title = ["Показать все", "Скрыть все"];

    const [value, setValue] = useState([])
    const [isAll, setIsAll] = useState(true)

    const isAllPoint = () => {
        if (isAll) {
            setValue([])
        }
        setIsAll(!isAll)
    }

    useEffect(() => {
        updateData()
        if (Categories_point !== undefined || Categories_point.length > 0) {
            setValue(Categories_point.filter(item => item.Type_Point === ID).map(item => item.ID));
        }


    }, [isAll])

    const getCategorii = () => {

        return Categories_point == ([] || undefined || null) ? <Text>Error</Text> :

            Categories_point.map((item) => (

                !(item.Type_Point == ID) ? null :
                    <>
                        <Button
                            key={item.ID}
                            type="clear"
                            buttonStyle={{ justifyContent: 'flex-start', paddingVertical: 10 }}
                            onPress={() => {
                                if (value.includes(item.ID)) {
                                    setValue(value.slice(0, value.indexOf(item.ID)).concat(value.slice(value.indexOf(item.ID) + 1)));
                                }
                                else {
                                    setValue([...value, item.ID])
                                }
                            }}
                            icon={
                                <CheckBox
                                    key={item.ID}
                                    checked={value.includes(item.ID)}
                                    containerStyle={{ backgroundColor: "transparent", margin: 0 }}

                                    checkedIcon={<Icon name="check-box" color={"green"} />}
                                    uncheckedIcon={<Icon name="check-box-outline-blank" color={"gray"} />}
                                />
                            }
                            title={item.Name_Categories}
                            titleStyle={{ color: 'black' }}
                        />
                    </>
            ))
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        updateData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return <>
        <View style={{
            width: '100%',
            height: 50,
            backgroundColor: 'gray',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 10,
        }}>
            <Icon name="arrow-back-ios" color={"white"} size={30} onPress={() => navigate.goBack()} />
            <Icon name="filter-list" size={30} color={'white'} onPress={() => setIsVisibleFilter(true)} />
        </View >
        <ScrollView style={{
            marginBottom: 70
        }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {
                Points == ([] || undefined || null) ? <Text>Error</Text> :
                    Points.map((item) =>
                    (
                        value.includes(item.Categories_Point) ? <Card_point key={item.ID} data={item} favorites={Favorite_point} /> : <></>
                    )
                    )
            }
        </ScrollView>
        <Overlay
            isVisible={isVisibleFilter}
            overlayStyle={{ width: '100%' }}
        >
            <View style={{ width: '100%', height: '100%', }}>
                <View style={{
                    alignItems: "flex-end",
                    marginBottom: 15,
                    paddingBottom: 5,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 2,
                }}>
                    <Icon name="close" color={"black"} onPress={() => setIsVisibleFilter(false)} size={40} />
                </View>
                <ScrollView>
                    <View style={{ gap: 8 }}>
                        <Text h3>Категории</Text>
                        <Button
                            type="clear"
                            icon={
                                <CheckBox
                                    checked={(value.length > 0) ? true : false}
                                    checkedIcon={<Icon name="indeterminate-check-box" color={'darkred'} />}
                                    uncheckedIcon={<Icon name="check-box-outline-blank" color={'grey'} />}
                                    containerStyle={{ backgroundColor: "transparent", margin: 0 }}
                                />
                            }
                            title={(value.length > 0) ? title[1] : title[0]}
                            onPress={isAllPoint}
                            buttonStyle={{ justifyContent: 'flex-start', paddingVertical: 10 }}
                            titleStyle={{ color: 'black' }}
                        />
                        {
                            getCategorii()
                        }
                    </View>
                </ScrollView>
            </View>
        </Overlay>
    </>
}