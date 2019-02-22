import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import MoviesPage from './src/js/page/MoviesPage'
import NewsPage from './src/js/page/NewsPage'
import RecommendPage from './src/js/page/RecommendPage'
import MyPage from './src/js/page/MyPage'
import { scaleSizeH, setSpText } from './src/util/ScreenUtils';
import NewsDetails from './src/js/page/NewsDetails';

const TabNavigator = createBottomTabNavigator({
  news: NewsPage,
  movies: MoviesPage,
  recommend: RecommendPage,
  my: MyPage
},
  {
    // tabBarOptions: {
    //   activeTintColor: '#d4237a',
    //   inactiveTintColor: '#8a8a8a',
    //   style: {
    //     backgroundColor: '#000000',
    //     paddingBottom: 1,
    //     borderTopWidth: 0.2,
    //     paddingTop: 1,
    //     borderTopColor: '#532432',
    //   },
    // }
    tabBarOptions: {
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: '#d4237a',
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#8a8a8a',
      //是否显示tab bar的图标，默认是false
      showIcon: true,
      //showLabel - 是否显示tab bar的文本，默认是true
      // showLabel: true,
      // //是否将文本转换为大小，默认是true
      // upperCaseLabel: false,
      // //material design中的波纹颜色(仅支持Android >= 5.0)
      // pressColor: '#788493',
      // //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      // pressOpacity: 0.8,
      // //tab bar的样式
      style: {
          backgroundColor: '#fff',
          paddingBottom: 1,
          borderTopWidth: 0.2,
          paddingTop:1,
          height:scaleSizeH(110),
          borderTopColor: '#ccc',
      },
      //tab bar的文本样式
      labelStyle: {
          fontSize: 12,
          marginBottom: 2,
          marginTop: 2,
      },
      // //tab 页指示符的样式 (tab页下面的一条线).
      // indicatorStyle: {height: 2},
  },
  // //tab bar的位置, 可选值： 'top' or 'bottom'
  // tabBarPosition: 'bottom',
  // //是否允许滑动切换tab页
  // swipeEnabled: true,
  // //是否在切换tab页时使用动画
  // animationEnabled: false,
  // //是否懒加载
  // lazy: true,
  // //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
  // backBehavior: 'none',
  }
)
const RootStack = createStackNavigator(
  {
    Details: NewsDetails,
  },
  {
  }
);

export default createAppContainer(TabNavigator,RootStack);
