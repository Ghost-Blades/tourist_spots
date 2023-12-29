import { ThemeProvider } from "@rneui/themed";
import { theme } from "./src/data/settings";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNav } from "./src/navigate/BottomNav";
import { AuthProvider, Point_category } from "./src/data/AuthProvider";

export default function App() {

  return (
    <AuthProvider>
      <Point_category>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <BottomTabNav />
            <StatusBar backgroundColor={theme.lightColors.primary} />
          </NavigationContainer>
        </ThemeProvider>
      </Point_category>
    </AuthProvider>
  );
}
