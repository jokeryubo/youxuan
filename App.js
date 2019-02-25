import React, { Component } from 'react';
import { View, Text ,StyleSheet ,Image} from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator ,createMaterialTopTabNavigator} from 'react-navigation'
import MoviesPage from './src/js/page/MoviesPage'
import NewsPage from './src/js/page/NewsPage'
import RecommendPage from './src/js/page/RecommendPage'
import MyPage from './src/js/page/MyPage'
import { scaleSizeH, setSpText ,scaleSizeW} from './src/util/ScreenUtils';
import NewsDetails from './src/js/page/NewsDetails';
import SearchPage from './src/js/page/SearchPage';

const moviesNavigator  = createStackNavigator({
  movies: MoviesPage,
  SearchPage:SearchPage,
},{
  initialRouteName:'movies',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#43BB5A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}
);
const newsNavigator  = createStackNavigator({
  news: NewsPage,
  Details: NewsDetails,
});
const recommendNavigator  = createStackNavigator({
  recommend: RecommendPage,
});
const myNavigator  = createStackNavigator({
  my: MyPage
});

myNavigator.navigationOptions = {
  tabBarLabel: '我的',
        tabBarIcon: ({focused ,tintColor}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('./src/img/my_focus.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('./src/img/my.png')}/>
            );
        },
};
recommendNavigator.navigationOptions = {
  tabBarLabel: '推荐',
  tabBarIcon: ({focused ,tintColor}) => {
      if (focused) {
          return (
              <Image style={styles.tabBarIcon} source={require('./src/img/recommend_focus.png')}/>
          );
      }
      return (
          <Image style={styles.tabBarIcon} source={require('./src/img/recommend.png')}/>
      );
  },
};
newsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: '新闻',
    tabBarIcon: ({ focused, tintColor }) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('./src/img/news_focus.png')} />
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('./src/img/news.png')} />
        );
    },
  };
};
moviesNavigator.navigationOptions =
({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: '电影',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('./src/img/movies_focus.png')} />
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('./src/img/movies.png')} />
      );
    },
    
  };
}; 

const TabNavigator = createBottomTabNavigator({
  
  moviesNavigator: moviesNavigator,
  newsNavigator: newsNavigator,
  recommendNavigator: recommendNavigator,
  myNavigator: myNavigator
},
  {
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
TabNavigator.navigationOptions = {
 header:null
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: scaleSizeW(48),
    height: scaleSizeH(48),
    marginTop: 3,
  },
});
export default createAppContainer(TabNavigator);
