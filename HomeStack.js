import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Main from '../Pages/Main';
import Forgotpass from '../Pages/Forgotpass';
import Splash from '../Pages/Splash';


// Import Screens


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        // <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Forgotpass" component={Forgotpass} />
                <Stack.Screen name="Splash" component={Splash} />


                {/* <Stack.Screen name="Home" component={Home} /> */}


            </Stack.Navigator>
        </SafeAreaView>
        // </NavigationContainer>
    );
};

export default HomeStack;