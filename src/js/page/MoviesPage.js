import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, Button ,
  TouchableWithoutFeedback,
} from 'react-native'
import { scaleSizeW, scaleSizeH } from '../../util/ScreenUtils';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';
import {withNavigation } from 'react-navigation'


const HOT_URL = "https://api.douban.com/v2/movie/in_theaters?city=北京&start=0&count=5";

const INCOMING_SOON_URL = "https://api.douban.com/v2/movie/coming_soon?start=0&count=5";
const TOP250_URL = "http://api.douban.com/v2/movie/top250?start=0&count=5";



export default class MoviesPage extends Component {
  static navigationOptions = {
    tabBarLabel: '电影',
    header: null,
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
 this.fetchIncomingSoonData();
 this.fetchTop250Data();
}
constructor(props) {
  super(props)
  this.state = {
     isHotLoad:false,
     isIncomingLoad:false,
     isTop250Load:false,
     hotData:[],
     incomingData:[],
     top250Data:[],

  }
  this.fetchHotData = this.fetchHotData.bind(this);
  this.fetchIncomingSoonData = this.fetchIncomingSoonData.bind(this);
  this.fetchTop250Data = this.fetchTop250Data.bind(this);
}
/**
 * 请求热门电影数据
 */
fetchHotData(){
  fetch(HOT_URL)
  .then(data => data.json())
  .then(respData =>{
    console.log(respData)
    this.setState({
      isHotLoad:true,
      hotData:this.state.hotData.concat(respData.subjects),
    })
  })
}
/**
 * 请求即将上映电影
 */
fetchIncomingSoonData(){
  fetch(INCOMING_SOON_URL)
  .then(data => data.json())
  .then(respData =>{
    console.log(respData)
    this.setState({
      isIncomingLoad:true,
      incomingData:this.state.incomingData.concat(respData.subjects),
    })
  })
}
/**
 * 请求top250电影
 */
fetchTop250Data(){
  fetch(TOP250_URL)
  .then(data => data.json())
  .then(respData =>{
    console.log(respData)
    this.setState({
      isTop250Load:true,
      top250Data:this.state.top250Data.concat(respData.subjects),
    })
  })
}

  render() {
    // if(!this.setState.isHotLoad ){
    //   return (<Text></Text>);
    // }
    return (
      <ScrollView style = {{backgroundColor: '#FDFDFD',}}>
      {/* 搜索栏 */}
      <TouchableWithoutFeedback onPress={()=>{this.searchPress()}}>
        <View style={styles.searchBG} >
          <Image style={{ width: 10, height: 10 }} source={require('../../img/search.png')}>
          </Image>
          <Text style={styles.searchText} >搜索</Text>
        </View>
        </TouchableWithoutFeedback>


        <DefaultItem data = {this.state.hotData} title = '热映' type = '1' navigation={this.props.navigation} ></DefaultItem>
        <DefaultItem data = {this.state.incomingData} title = '即将上映' type = '2' navigation={this.props.navigation}></DefaultItem>
        <DefaultItem data = {this.state.top250Data} title = 'TOP250' type = '3' navigation={this.props.navigation} ></DefaultItem>
      </ScrollView>
    )
  }

  searchPress(){
    console.log("this.props:",this.props ,"   +++")
      this.props.navigation.navigate('SearchPage',{})
  }
}

  
/**
 * 每一个类别的布局
 */
class DefaultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      title:'',
      type:'',
      isLoad:false,
    };
    this.itemClick = this.itemClick.bind(this);
    this.renderItemView =this.renderItemView.bind(this)
  }

  render() {
    
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
  /**
   * FlatList Item 布局
   * @param {*} param0 
   */
  renderItemView ({item }){
    return (<TouchableWithoutFeedback onPress = {()=> this.itemClick(item.title,item.id)}>
    <View style = {styles.itemStyle}>
      <Image style = {{width:scaleSizeW(290),height:scaleSizeH(400)}} source = {{uri :item.images.large}}/>
      <Text style= {{marginTop:scaleSizeH(10),marginBottom:scaleSizeH(10)}} numberOfLines={1}>{item.title} </Text>
      <Text>{item.rating.average}</Text>
    </View>
    </TouchableWithoutFeedback>);
  }
  itemClick(title ,id){
    console.log(title,id)
    this.props.navigation.navigate('MovieDetails',{
      title:title,
      id:id,
    })
  }
}
// export default withNavigation(DefaultItem);

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
