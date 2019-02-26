import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image } from 'react-native'
import { scaleSizeH ,scaleSizeW} from '../../util/ScreenUtils';
import { scryptSync } from 'crypto';

export default class MovieDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header:null,
      title: navigation.getParam('title', ''),
    };
  };
  constructor(props) {
    super(props)
  
    this.state = {
       imgUri:'',
    }
  }
  
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Image style={styles.poster} source = {{uri:this.state.imgUri}}></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  poster:{
    width:scaleSizeW(150),
    height:scaleSizeH(220),
  }
})
