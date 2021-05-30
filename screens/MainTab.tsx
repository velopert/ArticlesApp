import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MainTabParamList,
  MainTabRouteProp,
  RootStackNavigationProp,
} from './types';
import ArticlesScreen from './ArticlesScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import UserMenuScreen from './UserMenuScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function getHeaderTitle(route: MainTabRouteProp) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Articles';
  switch (routeName) {
    case 'Articles':
      return '게시글 목록';
    case 'UserMenu':
      return '사용자 메뉴';
  }
}

function MainTab() {
  const route = useRoute<MainTabRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      title: getHeaderTitle(route),
    });
  }, [route, navigation]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UserMenu"
        component={UserMenuScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
