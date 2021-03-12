import React from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-native';
import { ListItem, Card, Button, Icon } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'react-router';
import { TABLES_LIST_ENDPOINT } from '../api/endpoints';


class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tables: [],
      doneLoading: false
     
    }
  }


  async getAuthData (){
    try {
      const isLogged = await AsyncStorage.getItem('isLogged')
      this.setState({
        isLogged: true,
        loading: false
      })
    } catch(e){
      this.setState({
        isLogged: false,
        loading: false
      })
    }
  }

  getTables(){
    axiosInstance.get(TABLES_LIST_ENDPOINT)
      .then(respData=>{
        this.setState({
          doneLoading: true,
          tables: respData.data
        })
      })
  }

  componentDidMount(){
    this.getAuthData()
  }

  render(){
    const {doneLoading, tables} = this.state;
    const { isLoggedIn, navigation }  = this.props;
    console.log('isLoggedIn', isLoggedIn)
    
    if (!isLoggedIn){
      console.log('here')
        navigation.navigate('Login')
    } else {
      console.log('ba')
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Hello HomeScreen </Text>
            {doneLoading ? <Text>hello</Text>: <Text>Not hello</Text>}
        </View>
    )
    
    
  }

}


const mapStateToProps = state =>({
  isLoggedIn: state.authReducer.isLoggedIn
})


export default connect(mapStateToProps, {})(HomeScreen);