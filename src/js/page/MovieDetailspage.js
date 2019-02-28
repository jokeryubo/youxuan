import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image } from 'react-native'
import { scaleSizeH ,scaleSizeW} from '../../util/ScreenUtils';
import LoadingView from '../view/LoadingView';


const SERACH_URL = 'http://api.douban.com/v2/movie/subject/'

export default class MovieDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title', ''),
    };
  };
  constructor(props) {
    super(props)
  
    this.state = {
      imgUri:'',
      data:'',
      isLoad:false,
    }
    this.fetchDetailsData = this.fetchDetailsData.bind(this)
  }
  
  componentDidMount(){
    var id = this.props.navigation.getParam('id','');
    this.fetchDetailsData(id);
   }

   fetchDetailsData(id){
    fetch(SERACH_URL+id)
    .then(resp => resp.json())
    .then(respData =>{
      console.log(respData);
       this.setState({
        imgUri:respData.images.large,
        data:respData,
        isLoad:true,
       });
    })
   }
  render() {
    var title = this.props.navigation.getParam('title','');
    var id = this.props.navigation.getParam('id','');
    console.log("title:",title," id",id);
    var {data} = this.state;
    let directors = [];
    let directorsName= '';

    let actors = [];
    let actorsName =''
    actors = data.casts;
    directors = data.directors;
    
    let moviesType = [];
    moviesType = data.genres;
    moviestypes = '';


    if(directors != null ){
      directors.map(function(item,index,orign){
        directorsName = directorsName+item.name
      })
    }
    if (actors != null){
      actors.map(function ( item ,index ,orgin){
        actorsName = actorsName+item.name
        if(index+1 != actors.length){
          actorsName = actorsName+' / '
        }
      })
      console.log(actorsName)
    }
    if(moviesType != null){
      moviesType.map(function (item ,index ,orgin){
        moviestypes = moviestypes + item
        if(index+1 != moviesType.length){
          moviestypes = moviestypes+' / '
        }
      })
    }

    if(!this.state.isLoad){
      return (<LoadingView/>)
    }
    return (
      <View style={styles.rootContanier}>
        <View style = {styles.titleContanier}>
        <Image style={styles.poster} source = {{uri:this.state.imgUri}}></Image>
          <View style = {styles.TextContanier}>
            <Text >片名: {data.title} ({data.year}) </Text>
            <Text>{data.rating.average}</Text>
            <Text>导演: {directorsName} </Text>
            <Text style= {{ width:scaleSizeW(600),flexWrap:'wrap',}}  >主演: {actorsName} </Text>
            <Text>{moviestypes}</Text>
          </View> 
        </View>

        <View >
            <Text style = {{fontSize:18,margin:15}}>剧情简介</Text>
            <Text >  {data.summary}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rootContanier:{
    flexDirection: 'column',
    margin: scaleSizeW(20),
  },
  titleContanier:{
    flexDirection:'row',
  },
  poster:{
    width:scaleSizeW(290),
    height:scaleSizeH(400),
    
  },
  TextContanier:{
    marginLeft:scaleSizeW(30),
    marginRight:scaleSizeW(30),
    justifyContent: 'space-between',
  },
})
