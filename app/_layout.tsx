import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Settings } from 'react-native';
import Splash from './Pages/Splash';
import Home from './Pages/Home';
import College from './Pages/College'
import Courses from './Pages/Courses'
import BS from './Pages/BS'
import Cdetails from './Pages/Cdetails'
import Main from './Pages/Main'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Setting from './Pages/Setting'
import Privacy from './Pages/Privacy'
import Delete from './Pages/Delete'
import Password from './Pages/Password'
import Admission from './Pages/Admission'
import Stories from './Pages/Stories'
import Chatsupport from './Pages/Chatsupport'
import Privacypolicy from './Pages/Privacypolicy'
import Terms from './Pages/Terms'
import Clgprofile from './Pages/Clgprofile'
import Profile from './Pages/Profile'
import Eprofile from './Pages/Eprofile'
import Chat from './Pages/Chat'
import ADP from './Pages/ADP'
import ADA from './Pages/ADA'
import ADS from './Pages/ADS'
import ADSdetails from './Pages/ADSdetail'
import Intake from './Pages/Intake'
import Forgotpass from './Pages/Forgotpass'
import Slider from './Pages/Slider'
import BottomTab from './(tabs)/BottomTab'
// import HomeStack from './Pages/HomeStack'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="College" component={College} />
        <Stack.Screen name="Courses" component={Courses} />
        {/* <Stack.Screen name="BS" component={BS} /> */}
        <Stack.Screen name="Cdetails" component={Cdetails} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Delete" component={Delete} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Admission" component={Admission} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Clgprofile" component={Clgprofile} />
        <Stack.Screen name="Chatsupport" component={Chatsupport} />
        <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Eprofile" component={Eprofile} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ADP" component={ADP} />
        <Stack.Screen name="ADA" component={ADA} />
        <Stack.Screen name="ADS" component={ADS} />
        <Stack.Screen name="ADSdetails" component={ADSdetails} />
        <Stack.Screen name="Intake" component={Intake} />
        <Stack.Screen name="Forgotpass" component={Forgotpass} />
        <Stack.Screen name="Slider" component={Slider} />

        <Stack.Screen name="Bottom" component={BottomTab} />
        {/* <Stack.Screen name="HomeStack" component={HomeStack} /> */}

      </Stack.Navigator>
    </SafeAreaView>

  );
};

export default App;