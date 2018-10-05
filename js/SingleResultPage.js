import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TouchableHighlight, Button, ActivityIndicator } from 'react-native';

export default class SingleResultPage extends React.Component {
  constructor(props){
    super(props);
    const { navigation } = this.props;
    this.state ={
      isLoading: true,
      text: navigation.getParam('text', ''),
      page:  Math.floor(Math.random() * 10),
      dataSource: []
    };
  }

  loadRecipes() {
    console.log(this.state);
    return fetch(`http://food2fork.com/api/search?key=25fd765d221465b2b6fd0577f6a66594&q=${this.state.text}&page=${this.state.page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(responseJson.recipes),
          fetched: true
        }, function(){
          this.newRecipe();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.loadRecipes();
    console.log(this.state);
    if (this.state.dataSource.length === 0 && this.state.fetched) {
      console.log("Re-request");
      this.setState({
        page: 1
      });
      this.loadRecipes();
    }
  }

  componentDidUpdate() {
    // console.log(this.state.refreshCounter);
    if (this.state.item !== this.state.dataSource[this.state.index]) {
      if (this.state.item
        && !this.state.text.includes("dog")
        && this.state.item.title.includes("Dog")
        && this.state.item.title.includes("Food")) {
        this.loadRecipes();
      }
      this.setState({item: this.state.dataSource[this.state.index]});
    }
  }

  newRecipe() {
    console.log(this.state.dataSource.length)
    var index = this.state.dataSource.indexOf(this.state.item);
    if (index !== -1) this.state.dataSource.splice(index, 1);
    this.setState({
      index: Math.floor(Math.random() * this.state.dataSource.length),
      refreshCounter: this.state.refreshCounter + 1
    })
  }

  render() {
    unescapeChars = (string) => {
      return decodeURIComponent(string.replace(/&amp;/g, '&'));
    };
    const {item} = this.state;

    if (item) {
      return (
        <View style={styles.container}>
          <Text>
            {`Let's make ${unescapeChars(item.title)}!`}
          </Text>
          <TouchableHighlight
            onPress={() => Linking.openURL(item.source_url)}
            style={{padding: 30}}
            style={styles.recipe}>
            <Image style={{width: 240, height: 240, padding: 20, borderRadius: 50}}
              source={{uri: item.image_url}}
            />
          </TouchableHighlight>
          <Button
            onPress={() => {
              this.newRecipe();
            }}
            title="New Recipe"
          />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipe: {
    backgroundColor: '#fff',
  }
});
