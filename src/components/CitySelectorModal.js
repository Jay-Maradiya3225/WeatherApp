import React, {useEffect, useState} from 'react';
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
import {COLORS} from '../Assets/theme/COLOR';
import {getTranslation} from './WeatherForecast';
import {translation} from '../utils/language';
import {cities_en, states_en} from '../utils/languagues/english';
import {cities_ta, states_ta} from '../utils/languagues/tamil';
import {cities_hi, states_hi} from '../utils/languagues/hindi';
import {cities_pa, states_pa} from '../utils/languagues/panjabi';
import {cities_ur, states_ur} from '../utils/languagues/urdu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Define a map of cities and states for quick access
const cityStateMap = {
  0: { cities: cities_en, states: states_en },
  1: { cities: cities_ta, states: states_ta },
  2: { cities: cities_hi, states: states_hi },
  3: { cities: cities_pa, states: states_pa },
  4: { cities: cities_ur, states: states_ur },
};

// Modal component for selecting a city and state
const CitySelectorModal = ({
  visible,
  onClose,
  onSelectCity,
  selectedLanguage,
}) => {
  const [searchCity, setSearchCity] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  // UseEffect to set initial states based on selectedLanguage
  useEffect(() => {
    resetModal();
  }, [selectedLanguage]);

  // Function to reset modal state
  const resetModal = () => {
    const { cities, states } = cityStateMap[selectedLanguage] || {};
    if (cities && states) {
      setFilteredStates(states);
      setFilteredCities(cities);
    } else {
      setFilteredStates([]);
      setFilteredCities([]);
    }
    setSearchCity('');
  };

  // Function to handle city search and filter states and cities based on language
  const handleSearch = (text) => {
    setSearchCity(text);
    if (text.trim() === '') {
      setFilteredStates(cityStateMap[selectedLanguage]?.states || []);
      setFilteredCities(cityStateMap[selectedLanguage]?.cities || []);
    } else {
      const filteredCities = cityStateMap[selectedLanguage]?.cities.filter(city =>
        city.name.toLowerCase().includes(text.toLowerCase())
      ) || [];
      const stateIds = filteredCities.map(city => city.stateId);
      const uniqueStateIds = Array.from(new Set(stateIds));
      const filteredStates = cityStateMap[selectedLanguage]?.states.filter(state =>
        uniqueStateIds.includes(state.id)
      ) || [];
      setFilteredStates(filteredStates);
      setFilteredCities(filteredCities);
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    resetModal();
    onClose();
  };

  // Function to handle selecting a city and fetching its corresponding stateName
  const handleCitySelection = (cityName, stateId) => {
    const stateName = filteredStates.find(state => state.id === stateId)?.name || '';
    onSelectCity(cityName, stateName);
    handleCloseModal();
  };

  // Render method for displaying cities
  const renderCities = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCitySelection(item.name, item.stateId)}>
      <Text style={styles.cityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render method for displaying states with filtered cities
  const renderStates = ({ item }) => (
    <View>
      <Text style={styles.stateName}>{item.name}</Text>
      <View style={styles.cityInfoContent}>
        <FlatList
          data={
            filteredCities.length > 0
              ? filteredCities.filter(city => city.stateId === item.id)
              : cityStateMap[selectedLanguage]?.cities.filter(city => city.stateId === item.id)
          }
          renderItem={renderCities}
          keyExtractor={city => city.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCloseModal}>
      <View style={styles.modalContent}>
        <View style={styles.regionInfoContent}>
          <Text style={styles.modalHeaderText}>
            {getTranslation(translation, selectedLanguage, 8)}
          </Text>
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
            <Text style={styles.closeText}>
              {getTranslation(translation, selectedLanguage, 9)}
            </Text>
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
