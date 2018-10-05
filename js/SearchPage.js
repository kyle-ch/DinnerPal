import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

const textLines = [
  "What do you have to cook?",
  "What are you feeling today?",
  "What are you hungry for?"
];

export default class SearchPage extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      text: ''
    };
  }

  componentDidMount() {
    return;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
            placeholder={textLines[Math.floor((Math.random()*textLines.length))]}
            onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('SingleResult', { text: this.state.text.trim()});
          }}
          title={this.state.text ? "Search" : "Surprise Me!"}
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
