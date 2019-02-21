import React, { Component } from 'react'
import { Text, View ,StyleSheet ,Image} from 'react-native'
export default class NewsPage extends Component {
    static navigationOptions = {
        tabBarLabel: '好友',
        tabBarIcon: ({focused ,tintColor}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/news_focus.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/news.png')}/>
            );
        },
    }
  render() {
    return (
      <View style = {}>
        <Text> textInComponent NewsPage</Text>
       
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color:'#d4237a'
    },
    tabBarIcon: {
        width: 32,
        height: 32,
    }
});
