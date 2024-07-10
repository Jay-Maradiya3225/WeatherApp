import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {AppImages} from '../Assets/Images';
import {COLORS} from '../Assets/theme/COLOR';
import {translation} from '../utils/language';
import { getTranslation } from './WeatherForecast';
const {height, width} = Dimensions.get('window');

// LanguagesModal component for selecting languages
const LanguagesModal = ({
  langModalVisible,
  setLangModalVisible,
  onSelectLang,
  selectedLanguage,
}) => {
  const [selectedLang, setSelectedLang] = useState(0);
  const [languages, setLangauges] = useState([
    {name: 'English', selected: true},
    {name: 'தமிழ்', selected: false},
    {name: 'हिन्दी', selected: false},
    {name: 'ਪੰਜਾਬੀ', selected: false},
    {name: 'اردو', selected: false},
  ]);

  // Function to handle language selection
  const onSelect = index => {
    const temp = languages.map((item, ind) => ({
      ...item,
      selected: index === ind ? !item.selected : false,
    }));
    setLangauges(temp);
    setSelectedLang(index);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={langModalVisible}
      onRequestClose={() => setLangModalVisible(!langModalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            {getTranslation(translation, selectedLanguage, 0)}
          </Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={languages}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    {
                      borderColor: item.selected
                        ? COLORS.primary
                        : COLORS.dark_shade,
                    },
                  ]}
                  onPress={() => onSelect(index)}>
                  <Image
                    source={
                      item.selected ? AppImages.selected : AppImages.nonSelected
                    }
                    style={[
                      styles.icon,
                      {tintColor: item.selected ? COLORS.primary : undefined},
                    ]}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 18,
                      color: item.selected ? COLORS.primary : COLORS.dark_shade,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => setLangModalVisible(false)}>
              <Text style={{color: COLORS.dark_shade}}>
                {getTranslation(translation, selectedLanguage, 1)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => {
                setLangModalVisible(false);
                onSelectLang(selectedLang);
              }}>
              <Text style={{color: COLORS.white}}>
                {getTranslation(translation, selectedLanguage, 2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguagesModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    width: width - 20,
    // height: height / 2,

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.dark_shade,
  },
  languageItem: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  btn1: {
    width: '40%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    width: '40%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
