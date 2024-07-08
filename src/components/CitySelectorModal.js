import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS} from '../Assets/theme/COLOR';
import {cities, states} from '../Assets/theme/appDataConfig';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CitySelectorModal = ({visible, onClose}) => {
  const renderStates = ({item}) => (
    <View>
      <Text style={styles.stateName}>{item.name}</Text>
      <View style={styles.cityInfoContent}>
        <FlatList
          data={cities.filter(city => city.stateId === item.id)}
          renderItem={renderCities}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );

  const renderCities = ({item}) => (
    <TouchableOpacity onPress={() => {}}>
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
          <Text style={styles.modalHeaderText}>Select Your State</Text>
          <FlatList
            data={states}
            renderItem={renderStates}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
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
});
