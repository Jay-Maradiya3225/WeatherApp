import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../Assets/theme/COLOR';
import {AppImages} from '../Assets/Images';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {ChevronDownIcon} from 'react-native-heroicons/mini';
import CitySelectorModal from './CitySelectorModal';

const CityInfo = props => {
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  return (
    <View>
      <TouchableOpacity
        style={styles.cityInfoContainer}
        onPress={() => setShowModal(true)}>
        <View style={styles.cityNameContainer}>
          <MapPinIcon
            color={COLORS.primary}
            size={20}
            style={{marginRight: 6}}
          />
          <View>
            <Text style={styles.cityInfoText}>
              {props.city}, {props.state}
            </Text>
            <Text style={styles.todayDate}>{today.toDateString()}</Text>
          </View>
          <ChevronDownIcon color={COLORS.dark_shade} size={20} />
        </View>
        <Image style={styles.cityInfoImage} source={AppImages.map} />
      </TouchableOpacity>
      <CitySelectorModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default CityInfo;

const styles = StyleSheet.create({
  cityInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  cityNameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.white,
    elevation: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityInfoText: {
    fontSize: 16,
    // width: '60%',
    color: COLORS.dark_shade,
    fontWeight: 'bold',
    marginRight: 5,
  },
  cityInfoImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  todayDate: {
    fontSize: 11,
    color: COLORS.windSpeedText,
  },
});
