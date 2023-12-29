import { Button, Card, Icon, Input, Text } from "@rneui/themed"
import { useContext, useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import { MinLength, Valide, isNull } from "../data/Validate"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthSignIn, AuthSignUp } from "../data/Request"
import { Pressable } from "react-native"
import { Context } from "../data/settings"


export const SignInForm = ({ setSnackShow }) => {
    const [Login, setLogin] = useState(null);
    const [Password, setPassword] = useState(null);

    const [IsVisblePassword, setIsVisblePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginError, setISLoginError] = useState([]);
    const [isPasswordError, setIsPasswordError] = useState([]);

    const { updateLoginStatus, setUser_date } = useContext(Context)

    const entry = async () => {

        if (Login !== null && Password !== null) {
            try {
                setIsLoading(true);
                const lt = await AuthSignIn(Login, Password);

                setTimeout(async () => {
                    await AsyncStorage.setItem("Login", JSON.stringify(lt));
                    //console.log(lt.toString());
                    setUser_date(lt['User_name']);
                    updateLoginStatus()
                }, 500)

            } catch {
                setSnackShow(true)
                setIsLoading(false)
            }
            finally {
                //setIsLoading(false)
            }
        } else {
            if (Password === null) {
                setIsPasswordError([true, "Пароль не должен быть пустым"])
            }
            if (Login === null) {
                setISLoginError([true, "Логин не должен быть пустым"])
            }
            setSnackShow(true)
            setIsLoading(false)
        }

    }

    const inputLogin = (text) => {
        setISLoginError(isNull(text))
        setLogin(text)
    }

    const inputPassword = (text) => {
        setIsPasswordError(isNull(text))
        setPassword(text)
    }

    return <>

        <View style={{ marginTop: 0 }}>

            <Text h1 h1Style={{
                textAlign: 'left',
            }}>Спасибо, что вернулись к нам!</Text>
            < View
                style={{
                    marginTop: 25
                }}
            >

                <Input
                    value={Login}
                    onChangeText={inputLogin}
                    placeholder="Логин"
                    leftIconContainerStyle={{ marginRight: 7.5 }}
                    leftIcon={<Icon type="font-awesome" name="user" size={25} />}
                    errorMessage={isLoginError[1]}

                />

                <Input
                    value={Password}
                    onChangeText={inputPassword}
                    errorMessage={isPasswordError[1]}
                    placeholder="Пароль"
                    leftIconContainerStyle={{ marginRight: 7.5 }}
                    leftIcon={<Icon type="font-awesome" name="lock" size={25} />}
                    rightIcon={<Icon onPress={() => setIsVisblePassword(!IsVisblePassword)} type="entypo" name={IsVisblePassword ? "eye-with-line" : "eye"} size={25} />}
                    secureTextEntry={IsVisblePassword}
                />

            </View>

            <View style={{ alignItems: 'center', position: 'relative' }}>
                <Pressable onPress={() => Alert.alert("fssd")}>
                    <Text
                        style={{ fontWeight: "900", fontSize: 15, color: 'gray', alignItems: 'center' }}

                    >Forgot password?</Text>
                </Pressable>
                <View style={{
                    width: '100%', paddingVertical: 15
                }}>

                    <Button
                        loading={isLoading}
                        onPress={entry}
                        buttonStyle={{
                            borderRadius: 25
                        }}
                    >Вход</Button>
                </View>

            </View>


        </View >


    </>

}

export const SignUpForm = ({ setSnackShow }) => {

    const [User_name, setUser_name] = useState(null);
    const [Login, setLogin] = useState(null);
    const [Password, setPassword] = useState(null);

    const [IsVisblePassword, setIsVisblePassword] = useState(true);
    const [lengthPassword, setLengthPassword] = useState(false);
    const [SpecСharPassword, setSpecСharPassword] = useState(false);

    const [lengthLogin, setLengthLogin] = useState(null);
    const [lengthUser_name, setLengthUser_name] = useState(null);
    const [isErrorPassword, setIsErrorPassword] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const { updateLoginStatus, setUser_date } = useContext(Context)

    const SignUp = async () => {

        if (User_name !== null && Login !== null && Password !== null) {
            try {
                setIsLoading(true);
                const resulteSignUp = await AuthSignUp(User_name, Login, Password);
                console.log(resulteSignUp)
                if (resulteSignUp["success"]) {
                    setTimeout(async () => {
                        const lt = await AuthSignIn(Login, Password);
                        await AsyncStorage.setItem("Login", JSON.stringify(lt));
                        //console.log(lt.toString());
                        setUser_date(lt['User_name']);
                        updateLoginStatus()
                    }, 500)
                }

            } catch {
                setIsLoading(false)
            }
        } else {
            if (Password === null) {
                setIsErrorPassword([true, "Пароль не должен быть пустым"])
            }
            if (Login === null) {
                setLengthLogin([true, "Логин не должен быть пустым"])
            }
            if (User_name === null) {
                setLengthUser_name([true, "Имя пользователя не должно быть пустым"])
            }
            //setSnackShow([true])
            //setIsLoading(false)
        }

    }

    const inputPassword = (text) => {
        setLengthPassword(MinLength(text, 10));
        setSpecСharPassword(Valide(text, /[_-]/));
        setPassword(text)
    }

    const inputLogin = (text) => {
        setLengthLogin(!MinLength(text, -1) ? "Недолжно быть пустым"
            : MinLength(text, 5) ? null : "Не менее 5-ти символов")
        setLogin(text);
    }

    const inputUser_name = (text) => {
        setLengthUser_name(!MinLength(text, 5) ? "Не менее 5-ти символов" : null)
        setUser_name(text)
    }

    return <>

        <View style={{ marginTop: 0 }}>

            <Text h1>Давайте путешествовать вместе!</Text>
            <View
                style={{
                    marginTop: 25,
                    marginBottom: 15
                }}
            >

                <Input
                    value={User_name}
                    placeholder="Имя пользователя"
                    //leftIconContainerStyle={{ marginRight: 7.5 }}
                    //leftIcon={<Icon type="font-awesome" name="user" size={25} />}
                    onChangeText={inputUser_name}
                    errorMessage={lengthUser_name}
                />

                <Input
                    value={Login}
                    placeholder="Логин"
                    leftIconContainerStyle={{ marginRight: 7.5 }}
                    leftIcon={<Icon type="font-awesome" name="user" size={25} />}
                    onChangeText={inputLogin}
                    errorMessage={lengthLogin}
                />

                <Input
                    value={Password}
                    placeholder="Пароль"
                    leftIconContainerStyle={{ marginRight: 7.5 }}
                    leftIcon={<Icon type="font-awesome" name="lock" size={25} />}
                    rightIcon={
                        <Icon
                            onPress={() => setIsVisblePassword(!IsVisblePassword)}
                            type="entypo" name={IsVisblePassword ? "eye-with-line" : "eye"}
                            size={25}
                        />
                    }
                    secureTextEntry={IsVisblePassword}
                    onChangeText={inputPassword}
                    errorMessage={isErrorPassword}
                />
                <Card style={{
                    marginTop: -15,
                }}>

                    <Text
                        style={{ color: lengthPassword ? 'green' : 'red' }}
                    >1. Не менее 10 символов</Text>
                    <Text
                        style={{ color: SpecСharPassword ? 'green' : 'red' }}
                    >2. Содержит специальный символ</Text>

                </Card>

            </View>

            <Button
                loading={isLoading}
                onPress={SignUp}
                buttonStyle={{
                    borderRadius: 25
                }}
            >Регистрация</Button>


        </View>

    </>

}