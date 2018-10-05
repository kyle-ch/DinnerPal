import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SearchPage from './js/SearchPage';
import ResultsPage from './js/ResultsPage';
import SingleResultPage from './js/SingleResultPage';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  };
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: SearchPage,
      navigationOptions: {title: "DinnerPal"}
    },
    Results: {
      screen: ResultsPage,
      navigationOptions: {title: "DinnerPal"}
    },
    SingleResult: {
      screen: SingleResultPage,
      navigationOptions: {title: "DinnerPal"}
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
