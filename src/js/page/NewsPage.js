import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity ,TouchableWithoutFeedback} from 'react-native'
import { scaleSizeW, scaleSizeH } from '../../util/ScreenUtils';
import LoadingView from '../view/LoadingView';
import { FlatList } from 'react-native-gesture-handler';



const URL = "https://www.apiopen.top/journalismApi";

export default class NewsPage extends Component {
    static navigationOptions = {
        tabBarLabel: '新闻',
        header: null,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../img/news_focus.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../img/news.png')} />
            );
        },
    }
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoad: false,
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount---")
        this.fetchData();
    }
    fetchData() {
        fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                if (responseData.code == 200) {
                    this.setState({
                        data: this.state.data.concat(responseData.data.auto),
                        isLoad: true,
                    })
                }
            }).catch(error => {
                console.error(error);

            })
    }

    render() {
        console.log("isLoad :", this.state.isLoad)
        if (!this.state.isLoad) {
            return (<LoadingView />)
        }
        return (
            <View >
                <FlatList
                    data={this.state.data}
                    style={{ marginBottom: 10, marginTop: 3 }}
                    renderItem={this.renderItemView.bind(this)}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        )

    }

    _keyExtractor = (item, index) => item.key;

    renderItemView({ item, index }) {
        return (
            <View style={styles.flatListItem}  >
                <TouchableWithoutFeedback onPress={() => { this.onItemClick(index, item.link) }}>
                    <View style={styles.renderItemTopContanier}>
                        <View style={{ flex: 8, justifyContent: 'space-between' , }}>
                            <Text style={styles.textStyle}>{item.title}</Text>
                            <Text>{item.source}{item.ptime} </Text>
                        </View>

                        <Image style={styles.sourceImgStyle}
                            source={{ uri: item.picInfo[0].url }}
                        ></Image>
                    </View>

                </TouchableWithoutFeedback>
            </View>
        );
    }

    onItemClick(index, link) {
        // alert("点击了:" + link);
        this.props.navigation.navigate('Details', {
            link : link
        })
    }
    // onPress = { () =>{this.onItemClick(index,item.link)}}
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: scaleSizeW(52),
        height: scaleSizeH(52),
        marginTop: 3,
    },
    flatListItem: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    renderItemTopContanier: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textStyle: {
        fontSize: 16,
        color:'black',
    },
    sourceImgStyle: {
        flex: 3,
        width: scaleSizeW(280),
        height: scaleSizeH(198),
        borderRadius: 5,
        alignSelf: 'center',
    },
});