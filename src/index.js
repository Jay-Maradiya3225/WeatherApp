import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import WeatherForecast from './components/WeatherForecast';
import {COLORS} from './Assets/theme/COLOR';
import {Provider} from 'react-redux';
import configureStore from './Redux/store';
const windowWidth = Dimensions.get('window').width;

const App = () => {
  return (
    <View style={styles.homeContainer}>
      <Provider store={configureStore().store}>
        <WeatherForecast />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  homeContainer: {
    padding: 8,
    paddingTop: 22,
    backgroundColor: '#fff',
    flex: 1,
  },
});
