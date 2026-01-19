import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import Cdetails from './Cdetails';
import College from './College';
import Courses from './Courses';
import Home from './Home';
// Import Screens


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        // <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="College" component={College} />
                <Stack.Screen name="Courses" component={Courses} />
                <Stack.Screen name="Cdetails" component={Cdetails} />
            </Stack.Navigator>
        </SafeAreaView>
        // </NavigationContainer>
    );
};

export default HomeStack;