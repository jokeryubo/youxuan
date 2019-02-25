import React, { Component } from 'react';
import { View, Text ,WebView } from 'react-native';

export default class NewsDetails extends Component {
  static navigationOptions ={
    header:null
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <WebView source = {{uri : this.props.navigation.getParam('link','')}}/>
    );
  }
}
