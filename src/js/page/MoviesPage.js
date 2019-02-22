import React, { Component } from 'react'
import { Text, View ,Image ,StyleSheet} from 'react-native'
import { scaleSizeW, scaleSizeH } from '../../util/ScreenUtils';

export default class MoviesPage extends Component {
  static navigationOptions = {
    tabBarLabel: '电影',
    tabBarIcon: ({focused ,tintColor}) => {
        if (focused) {
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/movies_focus.png')}/>
            );
        }
        return (
            <Image style={styles.tabBarIcon} source={require('../../img/movies.png')}/>
        );
    },
}

  render() {
    return (
      <View>
        <Text> textInComponent MoviesPage</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    tabBarIcon: {
        width: scaleSizeW(48),
        height: scaleSizeH(48),
        marginTop: 3,
    }
});
