import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class SearchPage extends Component {
    static navigationOptions = {
        headerTitle: '豆瓣电影',
      };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent SearchPage</Text>
      </View>
    );
  }
}

