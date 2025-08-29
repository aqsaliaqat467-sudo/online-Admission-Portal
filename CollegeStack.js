import { createNativeStackNavigator } from '@react-navigation/native-stack';
import College from '../Pages/College';
import Courses from '../Pages/Courses';
import Profile from '../Pages/Profile';
import Stories from '../Pages/Stories';
const Stack = createNativeStackNavigator();

const CollegeStack = () => {
    return (
        <Stack.Navigator initialRouteName="College" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="College" component={College} />
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Stories" component={Stories} />
        </Stack.Navigator>
    );
};

export default CollegeStack;
