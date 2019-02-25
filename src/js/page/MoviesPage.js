import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, Button } from 'react-native'
import { scaleSizeW, scaleSizeH } from '../../util/ScreenUtils';
import HotShowing from './HotShowing';
import Incoming from './Incoming';
import Top250 from './Top250';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';

const HOT_URL = "https://api.douban.com/v2/movie/in_theaters?city=北京&start=0&count=5";


export default class MoviesPage extends Component {
  static navigationOptions = {
    tabBarLabel: '电影',
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('../../img/movies_focus.png')} />
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('../../img/movies.png')} />
      );
    },
  }

componentDidMount(){
 this.fetchHotData();
}
constructor(props) {
  super(props)
  this.state = {
     isLoad:false,
     hotData:[],
  }
  this.fetchHotData = this.fetchHotData.bind(this);
}

fetchHotData(){
  fetch(HOT_URL)
  .then(data => data.json())
  .then(respData =>{
    console.log(respData)
    this.setState({
      isLoad:true,
      hotData:this.state.hotData.concat(respData.subjects),
    })
  })
}
  render() {
    
    return (
      <ScrollView style = {{backgroundColor: '#FDFDFD',}}>
        <View style={styles.searchBG}>
          <Image style={{ width: 10, height: 10 }} source={require('../../img/search.png')}>
          </Image>
          <Text style={styles.searchText} >搜索</Text>
        </View>
        
        <DefaultItem data = {this.state.hotData} title = '热映' type = '1'></DefaultItem>
        <DefaultItem data = {this.state.hotData} title = '热映' type = '1'></DefaultItem>
        <DefaultItem data = {this.state.hotData} title = '热映' type = '1'></DefaultItem>
      </ScrollView>
    )
  }
}


class DefaultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      title:'',
      type:'',
    };
  }

  render() {
    console.log("data:",this.props.data[0])
    return (
      <View style = {{margin:scaleSizeW(20),}}>
          <View style = {styles.textRow}>
          <Text style = {{fontSize:22,color:'black'}}>{this.props.title}</Text>
          <Text style = {{fontSize:16,color:'#43BB5A'}}>更多</Text>
          </View>
          <FlatList
            data = {this.props.data}
            renderItem = {this.renderItemView.bind(this)}
            horizontal= {true}
            keyExtractor = {item => item.id}
            showsHorizontalScrollIndicator = {false}
          />
        </View>
    );
  }

  renderItemView ({item ,id}){
    return (<View style = {styles.itemStyle}>
      <Image style = {{width:scaleSizeW(290),height:scaleSizeH(400)}} source = {{uri :item.images.large}}/>
      <Text style= {{marginTop:scaleSizeH(10),marginBottom:scaleSizeH(10)}} numberOfLines={1}>{item.title} </Text>
      <Text>{item.rating.average}</Text>
    </View>);
  }
}


const styles = StyleSheet.create({
  tabBarIcon: {
    width: scaleSizeW(48),
    height: scaleSizeH(48),
    marginTop: 3,
  },
  searchText: {
    marginLeft: scaleSizeW(20),
    marginRight: scaleSizeW(20),
    borderRadius: 5,
    color: 'white',
  },
  searchBG: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43BB5A',
    width: scaleSizeW(1035),
    borderRadius: 5,
    marginLeft: scaleSizeW(20),
    marginTop: scaleSizeH(40),
    marginBottom: scaleSizeH(40),
    height: scaleSizeH(120),
  },
  textRow:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:scaleSizeH(10),
  },
  itemStyle:{
    marginLeft:scaleSizeW(30),
    marginTop:scaleSizeH(20),
    width:scaleSizeW(290),
  },
});
