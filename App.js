import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';

// Sayfalar ve bileşenler
import LoginPage from './pages/LoginPage';
import SignPage from './pages/SignPage';
import RoomsPage from './pages/RoomsPage';
import ProfilePage from './pages/ProfilePage';
import Icon from './components/Icon';
import {colors} from './style/colors';
import AuthProvider, {useAuthContext} from './context/AuthContext'; // AuthContext'ten kullanıcı bilgisi alıyoruz
import RoomDetailPage from './pages/RoomDetailPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Giriş yapılmış kullanıcılar için TabNavigator
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="RoomsNavigator"
        component={RoomsNavigator}
        options={{
          tabBarIcon: () => (
            <Icon
              iconName="comment"
              iconColor={colors.mainOrange}
              iconSize={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: () => (
            <Icon iconName="user" iconColor={colors.mainOrange} iconSize={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RoomsNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="RoomsPage" component={RoomsPage} />
      <Stack.Screen name="RoomDetailPage" component={RoomDetailPage} />
    </Stack.Navigator>
  );
}
// Giriş yapılmamış kullanıcılar için StackNavigator
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignPage" component={SignPage} />
    </Stack.Navigator>
  );
}

// Ana App bileşeni
export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <AuthProvider>
        <NavigationContainer >
          <AuthOrApp />
          <FlashMessage position="bottom" />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

// AuthProvider içinde kullanıcıyı kontrol eden bir bileşen oluşturuyoruz
function AuthOrApp() {
  const {user} = useAuthContext(); // AuthContext'ten kullanıcı bilgilerini alıyoruz
  return user ? <AppTabs /> : <AuthStack />; // Kullanıcıya göre uygun navigatörü render ediyoruz
}
