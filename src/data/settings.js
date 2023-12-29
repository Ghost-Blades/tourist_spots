import { color } from '@rneui/base';
import { createTheme, darkColors, lightColors } from '@rneui/themed';
import { createContext } from 'react';
import { Platform } from 'react-native';

//import { mobile_setting } from "./data/User";


export const DataContext = createContext();
export const Context = createContext();

export const theme = createTheme({

    lightColors: {
        primary: "#50A1AC",
    },
    darkColors: {
        primary: "#50A1AC",
    },

    mode: 'light',

    components: {

        Button: (props, theme) => ({
            //containerStyle: {
            //    borderBottomWidth: 2,
            //    borderBottomColor: theme.colors.colorTitle,
            //},
            titleStyle: {
                //color: theme.colors.colorTitle,
                fontSize: 23 || 12,

            },
            //radius: "lg",
            type: 'solid'
        }),
        SpeedDial: (props, theme) => ({
            //color: theme.colors.tertiary
        }),
        SpeedDialAction: (props, theme) => ({
            //color: theme.colors.tertiary
        }),
        Icon: (props, theme) => ({
            color: theme.colors.primary,
            //reverseColor: "white"
            //reverseColor: theme.colors.accent
        }),
        Switch: (props, theme) => ({
            trackColor: { false: '#767577', true: theme.colors.secondary },
            //thumbColor: { true: '#f5dd4b', false: "black" }
            //color: theme.colors.primary,
            //reverseColor: "white"
            //reverseColor: theme.colors.accent
        }),
        SearchBar: (props, theme) => ({
            platform: "ios",
            cursorColor: theme.colors.primary


        }),

        Input: (props, theme) => ({
            selectionColor: theme.colors.primary,
            cursorColor: theme.colors.primary,

        }),
        LinearProgress: (props, theme) => ({
            style: { backgroundColor: theme.colors.grey2 }
        }),

    }

});
