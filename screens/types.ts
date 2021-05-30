import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

/* MainTab */
export type MainTabParamList = {
  Articles: undefined;
  UserMenu: undefined;
};
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

/* RootStack */
export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Article: {
    id: number;
  };
  Register: undefined;
  Login: undefined;
  MyArticles: undefined;
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
