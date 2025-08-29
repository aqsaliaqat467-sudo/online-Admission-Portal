import { Ionicons } from '@expo/vector-icons'; // Using Ionicons
import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import HomeStack from './HomeStack'


const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (

        <Tab.Navigator>
            <Tab.Screen options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} name="Home" component={HomeStack} />
            <Tab.Screen options={{ tabBarIcon: ({ color }) => <AntDesign name="profile" size={24} color="black" /> }} name="Login" component={Login} />



        </Tab.Navigator>

    );
}