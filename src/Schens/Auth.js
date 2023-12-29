import { Button, Icon, SocialIcon, Text } from "@rneui/themed"
import { useState } from "react";
import { SignInForm, SignUpForm } from "../UI/Auth";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";


export const Auth = () => {

    const [ifSignUp, setSignUp] = useState(false);
    const SignTitleName = ['Регистрация', 'Вход'];

    const [SnackShow, setSnackShow] = useState(false);

    return <>
        <View style={{ padding: 15, gap: 15, alignSelf: 'center', paddingTop: 25, width: '100%' }} >

            <View style={{ width: '100%', alignItems: "baseline", paddingLeft: 5 }}>
                {
                    ifSignUp ? <Icon name="arrow-back-ios" size={30} onPress={() => setSignUp(!ifSignUp)} /> : <></>
                }

            </View>

            {
                ifSignUp ?
                    <>
                        < SignUpForm />
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

        </View >

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
            style={{
                marginTop: -115
            }}
            wrapperStyle={{

            }}
        >
            Неправильный логин или пароль
        </Snackbar>

    </>

}