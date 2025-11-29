import { Ionicons } from '@expo/vector-icons'; // Using Ionicons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import ChatList from './ChatList';
import Eprofile from './Eprofile';
import HomeStack from './HomeStack';
import MyApplications from './MyApplications';
import Search from './Search';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <View style={{ flex: 1 }}>

            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color} /> }} name="Home" component={HomeStack} />
                <Tab.Screen options={{ tabBarIcon: ({ color }) => <MaterialIcons name="search" size={25} color="black" /> }} name="Search" component={Search} />
                <Tab.Screen options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="application" size={20} color="black" /> }} name="application" component={MyApplications} />
                <Tab.Screen options={{ headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={22} color="black" /> }} name="Chats" component={ChatList} />
                <Tab.Screen options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={25} color="black" /> }} name="Profile" component={Eprofile} />

            </Tab.Navigator>
        </View>

    );
}
