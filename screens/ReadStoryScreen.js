import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView, TextInput, Touchable, TouchableOpacity} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };


  retrieveStories=()=>{
    try {
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              
              allStories.push(doc.data())
              console.log('this are the stories',allStories)
          })
          this.setState({allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item)=> {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View style ={styles.container}>
          <View style={styles.SearchBar}>
        <TextInput style = {styles.bar} placeholder = "Enter Book ID Or Student ID" onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity style = {styles.searchButton}
          onPress={()=>{this.searchTransactions(this.state.search)}}>
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
           <Header 
                backgroundColor = {'pink'}
                centerComponent = {{
                    text : 'Bed Time Stories',
                    style : { color: 'white', fontSize: 20}
                }}
            />
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>
          
          <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>  Title: {item.title}</Text>
                    <Text>  Author : {item.author}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                /> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'pink',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'pink',
    justifyContent:'center',
    alignSelf: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  }
});
