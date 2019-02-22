import React, { Component } from 'react';
import { View, Text ,Image , StyleSheet} from 'react-native';
import { scaleSizeW, scaleSizeH } from '../../util/ScreenUtils';


export default class MyPage extends Component {

    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused ,tintColor}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/my_focus.png')}/>
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/my.png')}/>
            );
        },
    }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent MyPage </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: scaleSizeW(48),
        height: scaleSizeH(48),
        marginTop: 3,
    }
});
