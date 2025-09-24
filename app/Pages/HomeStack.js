import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import BS from './BS';
import Cdetails from './Cdetails';
import College from './College';
import Courses from './Courses';
import Home1 from './Home1';
// Import Screens


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        // <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Stack.Navigator initialRouteName="Home1">
                <Stack.Screen name="Home1" component={Home1} />
                <Stack.Screen name="College" component={College} />
                <Stack.Screen name="Courses" component={Courses} />
                <Stack.Screen name="BS" component={BS} />
                <Stack.Screen name="Cdetails" component={Cdetails} />
            </Stack.Navigator>
        </SafeAreaView>
        // </NavigationContainer>
    );
};

export default HomeStack;