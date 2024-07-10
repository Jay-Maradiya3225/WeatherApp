import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { COLORS } from '../Assets/theme/COLOR';
import { cities, states } from '../Assets/theme/appDataConfig';
import { getTranslation } from './WeatherForecast';
import { translation } from '../utils/language';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Modal component for selecting a city and state
const CitySelectorModal = ({ visible, onClose, onSelectCity,selectedLanguage }) => {
  const [searchCity, setSearchCity] = useState('');
  const [filteredStates, setFilteredStates] = useState(states);
  const [filteredCities, setFilteredCities] = useState([]);

  // Function to handle city search and filter states and cities based on input
  const handleSearch = (text) => {
    setSearchCity(text);
    if (text.trim() === '') {
      setFilteredStates(states);
      setFilteredCities([]);
    } else {
      const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(text.toLowerCase())
      );
      const stateIds = filteredCities.map(city => city.stateId);
      const uniqueStateIds = Array.from(new Set(stateIds));
      const filteredStates = states.filter(state =>
        uniqueStateIds.includes(state.id)
      );
      setFilteredStates(filteredStates);
      setFilteredCities(filteredCities);
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSearchCity('');
    setFilteredStates(states);
    setFilteredCities([]);
    onClose();
  };

  // Function to handle selecting a city and fetching its corresponding state
  const handleCitySelection = (city, stateId) => {
    const stateName = states.find(state => state.id === stateId)?.name;
    onSelectCity(city, stateName);
    handleCloseModal();
  };

  // Function to render states with filtered cities
  const renderStates = ({ item }) => (
    <View>
      <Text style={styles.stateName}>{item.name}</Text>
      <View style={styles.cityInfoContent}>
        <FlatList
          data={filteredCities.length > 0 ? filteredCities.filter(city => city.stateId === item.id) : cities.filter(city => city.stateId === item.id)}
          renderItem={renderCities(item.id)}
          keyExtractor={city => city.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
  
  // Render method for displaying cities
  const renderCities = (stateId) => ({ item }) => (
    <TouchableOpacity onPress={() => handleCitySelection(item.name, stateId)}>
      <Text style={styles.cityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContent}>
        <View style={styles.regionInfoContent}>
          <Text style={styles.modalHeaderText}>{getTranslation(translation, selectedLanguage, 8)}</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search city..."
            onChangeText={handleSearch}
            value={searchCity}
          />
          <FlatList
            data={filteredStates}
            renderItem={renderStates}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.closeText}>{getTranslation(translation, selectedLanguage, 9)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CitySelectorModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  regionInfoContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  stateName: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.dark_shade,
  },
  cityName: {
    fontSize: 14,
    marginBottom: 10,
    color: COLORS.windSpeedText,
  },
  closeText: {
    fontSize: 16,
    color: COLORS.temp,
    marginTop: 10,
  },
  cityInfoContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 9,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: COLORS.dark_shade,
  },
});
