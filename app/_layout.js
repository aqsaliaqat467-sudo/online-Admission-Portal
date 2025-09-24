import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Admission from './Pages/Admission';
import BS from './Pages/BS';
import Cdetails from './Pages/Cdetails';
import Chatsupport from './Pages/Chatsupport';
import Clgprofile from './Pages/Clgprofile';
import College from './Pages/College';
import Courses from './Pages/Courses';
import Delete from './Pages/Delete';
import Eprofile from './Pages/Eprofile';
import Login from './Pages/Login';
import Password from './Pages/Password';
import Privacy from './Pages/Privacy';
import Privacypolicy from './Pages/Privacypolicy';
import Profile from './Pages/Profile';
import Setting from './Pages/Setting';
import Signup from './Pages/Signup';
import Splash from './Pages/Splash';
import Stories from './Pages/Stories';
import Terms from './Pages/Terms';
import { persistor, store } from "./redux/store/index";
// import Chat from './Pages/Chat'
import { SafeAreaView } from 'react-native-safe-area-context';
import ADA from './Pages/ADA';
import ADP from './Pages/ADP';
import ADS from './Pages/ADS';
import ADSdetails from './Pages/ADSdetails';
import ApplicationDetails from './Pages/ApplicationDetails';
import BottomTab from './Pages/BottomTab';
import Clghome from './Pages/ClgHome';
import Forgotpass from './Pages/Forgotpass';
import Home1 from './Pages/Home1';
import HomeStack from './Pages/HomeStack';
import Intake from './Pages/Intake';
import MyApplications from './Pages/MyApplications';
import Notification from './Pages/Notification';
import Search from './Pages/Search';
const Stack = createNativeStackNavigator();

const StudentStack = () => {
  return (

    <Stack.Navigator initialRouteName="BottomTab">
      <Stack.Screen name="Home1" component={Home1} />
      <Stack.Screen name="Clghome" component={Clghome} />
      <Stack.Screen options={{ headerShown: false }} name="College" component={College} />
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="BS" component={BS} />
      <Stack.Screen name="Cdetails" component={Cdetails} />
      <Stack.Screen name="Splash" component={Splash} />
      {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} /> */}
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
      <Stack.Screen name="Profile12" component={Profile} />
      <Stack.Screen name="Eprofile" component={Eprofile} />
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
      <Stack.Screen name="ADP" component={ADP} />
      <Stack.Screen name="ADA" component={ADA} />
      <Stack.Screen name="ADS" component={ADS} />
      <Stack.Screen name="ADSdetails" component={ADSdetails} />
      <Stack.Screen name="Intake" component={Intake} />
      <Stack.Screen name="Forgotpass" component={Forgotpass} />
      <Stack.Screen options={{ headerShown: false }} name="BottomTab" component={BottomTab} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="MyApplications" component={MyApplications} />
      <Stack.Screen name="ApplicationDetails" component={ApplicationDetails} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Search" component={Search} />

    </Stack.Navigator>


  );
};
const RenderStack = () => {
  const role = useSelector((state) => state.home.role);

  // alert (role)

  switch (role) {
    case "Student":
      return <StudentStack />;
    default:
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="BottomTab" component={BottomTab} />


        </Stack.Navigator>
      );
  }
};
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

          <RenderStack />

        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
