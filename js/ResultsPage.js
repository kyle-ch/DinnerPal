import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Linking } from 'react-native';

export default class ResultsPage extends React.Component {
  constructor(props){
    super(props);
    const { navigation } = this.props;
    this.state ={
      isLoading: true,
      text: navigation.getParam('text', '')
    };
  }

  componentDidMount() {
    return fetch(`http://food2fork.com/api/search?key=25fd765d221465b2b6fd0577f6a66594&q=${this.state.text}`, {
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
          dataSource: responseJson.recipes,
        }, function(){
          console.log(this.state.dataSource);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    unescapeChars = (string) => {
      return decodeURIComponent(string.replace(/&amp;/g, '&'));
    };

    return (
      <View style={styles.container}>
        <Text>
          {this.state.text}
        </Text>

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View>
              <Image style={{width: 240, height: 240, padding: 20}}
                source={{uri: item.image_url}}
                onPress={() => Linking.openURL(item.source_url)}
              />
              <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(item.source_url)}>
                {unescapeChars(item.title)}
              </Text>
            </View>
          }
          keyExtractor={(item, index) => `${item.title}-${item.publisher}${index}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
