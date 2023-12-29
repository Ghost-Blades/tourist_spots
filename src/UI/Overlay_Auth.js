import { Button, Icon, Overlay, SocialIcon } from "@rneui/themed"
import { ScrollView, View } from "react-native";
import { SignInForm, SignUpForm } from "./Auth";
import { useContext, useState } from "react";
import { Context } from "../data/settings";
import { Snackbar } from "react-native-paper";

export const Overlay_Auth = ({ isVisible, setIsVisible }) => {

    const [ifSignUp, setSignUp] = useState(false);
    const SignTitleName = ['Регистрация', 'Вход'];

    const [SnackShow, setSnackShow] = useState(false);

    const { isLogin } = useContext(Context);

    setIsVisible(isLogin ? false : isVisible);

    return <Overlay isVisible={isVisible} overlayStyle={{ width: '100%', padding: 0 }}>
        <ScrollView
            style={{
                width: '100%',
                height: '100%',
                paddingVertical: 5,
            }}
        >
            <View
                style={{
                    width: 40,
                    justifyContent: "center",
                }}
            >
                <Icon type='entypo' name="cross" color={'black'} size={40} onPress={() => { setIsVisible(!isVisible); setSignUp(false) }} />
            </View>
            <View
                style={{
                    //justifyContent: 'center',
                    height: '100%',
                    width: '90%',
                    marginTop: 40,
                    alignSelf: 'center',
                    gap: 15,
                }}
            >
                {
                    ifSignUp ?
                        <>
                            < SignUpForm />
                            <Button buttonStyle={{ borderRadius: 25 }} onPress={() => setSignUp(!ifSignUp)}>{SignTitleName[1]}</Button>
                        </>
                        :
                        <>
                            < SignInForm setSnackShow={setSnackShow} />
                            <Button buttonStyle={{ borderRadius: 25 }} onPress={() => setSignUp(!ifSignUp)}>{SignTitleName[0]}</Button>
                        </>
                }


                <View
                    style={{
                        borderTopWidth: 1.5,
                        borderTopColor: 'gray',
                        paddingVertical: 15,
                        paddingHorizontal: 25,
                        justifyContent: 'space-around',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <SocialIcon type="google" />
                    <SocialIcon type="vk" />
                    <SocialIcon type="pinterest" />
                </View>

            </View>


        </ScrollView>

        <Snackbar
            visible={SnackShow}
            onDismiss={() => setSnackShow(!SnackShow)}
            duration={2000}
            iconAccessibilityLabel="action"
            //action={{
            //    label: 'close',
            //    onPress: () => {
            //        setSnackShow(false)
            //    },
            //}}
            elevation={5}
            wrapperStyle={{
            }}
        >
            Неправильный логин или пароль
        </Snackbar>

    </Overlay >

}