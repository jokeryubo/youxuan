import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { scaleSizeH, scaleSizeW } from '../../util/ScreenUtils';
import { white } from 'ansi-colors';

const SEARCH_URL ="https://api.douban.com/v2/movie/search?q=";
export default class SearchPage extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text:'',
    };
    this.searchMovies = this.searchMovies.bind(this);
  }

  render() {
    return (
      <View style={styles.searchbg}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <TouchableWithoutFeedback onPress = {()=> this.props.navigation.pop()}>
            <Image source={require('../../img/back.png')} style={{ width: 30, height: 30 }} />
          </TouchableWithoutFeedback>

          <TextInput style={styles.TextInputStyle} placeholder="请输入电影名称" placeholderTextColor='#8a8a8a'
            onChangeText={(inputText) =>this.setState({text:inputText}) }></TextInput>

          <TouchableWithoutFeedback onPress = {() => this.searchMovies()}>
            <Text style={styles.SearchButtonStyle} >搜索</Text>
          </TouchableWithoutFeedback>

        </View>
      </View>
    );
  }
  searchMovies(){
    var text = SEARCH_URL+this.state.text+'&start=1&count=5' ;
    console.log(text);
    fetch(text)
    .then(resp => resp.json())
    .then((respData) =>{
      console.log('respData:',respData);
    })
  }
}
const styles = StyleSheet.create({
  searchbg: {
    backgroundColor: '#43BB5A',
    height: scaleSizeH(150),
    padding: scaleSizeH(20),
  },
  TextInputStyle: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 20,
    color: 'black',
    paddingLeft: scaleSizeW(30),
    marginLeft: scaleSizeW(15),
    marginRight: scaleSizeW(15),
    borderWidth: scaleSizeH(1),
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  SearchButtonStyle: {
    color: 'white',
  },
});

