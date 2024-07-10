import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {COLORS} from '../Assets/theme/COLOR';
import {request_weather_data} from '../Redux/Actions/publicDataActions';
import {getWeatherIcon} from '../utils';
import CityInfo from './CityInfo';
import CurrentWeather from './CurrentWeather';
import HourlyInfo from './HourlyInfo';
import LanguagesModal from './LanguagesModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../utils/language';
const windowWidth = Dimensions.get('window').width;

//Global Function to get translation text based on selected language and index
export const getTranslation = (translations, selectedLanguage, index) => {
  const languageKeys = ['English', 'Tamil', 'Hindi', 'Punjabi', 'Urdu'];
  return translations[index][languageKeys[selectedLanguage]] || '';
};

const WeatherForecast = () => {
  const [selectedCity, setSelectedCity] = useState('Surat');
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [selectedDayDate, setSelectedDayDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [temperatureUnit, setTemperatureUnit] = useState('C');
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const {weather_data, weather_loading} = useSelector(state => state.params);
  const dispatch = useDispatch();

  // Function to request location permission
  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        fetchLocationAndWeather();
      } else {
        console.error('Location permission not granted');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch current location and weather data
  const fetchLocationAndWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position?.coords;
        dispatch(request_weather_data({latitude, longitude}));
      },
      error => {
        console.error(error.code, error.message);
        dispatch(request_weather_data(selectedCity));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result === RESULTS.GRANTED) {
        fetchLocationAndWeather();
      } else {
        requestLocationPermission();
      }
    });
  }, [dispatch]);

  // Function to save the selected language to AsyncStorage
  const saveSelectedLanguage = async index => {
    try {
      await AsyncStorage.setItem('LANG', index.toString());
      setSelectedLanguage(index);
    } catch (error) {
      console.error('Error saving selected language:', error);
    }
  };

  // Function to fetch the stored language from AsyncStorage
  const fetchStoredLanguage = async () => {
    try {
      const storedLanguageIndex = await AsyncStorage.getItem('LANG');
      if (storedLanguageIndex !== null) {
        setSelectedLanguage(parseInt(storedLanguageIndex, 10));
      }
    } catch (error) {
      console.error('Error fetching stored language:', error);
    }
  };

  useEffect(() => {
    fetchStoredLanguage();
  }, []);

  // Function to change the selected city and fetch new weather data
  const changeCity = useCallback(
    (city, state) => {
      setSelectedCity(city);
      setSelectedState(state);
      dispatch(request_weather_data(city));
    },
    [dispatch],
  );

  // Function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = useCallback(celsius => {
    return (celsius * 9) / 5 + 32;
  }, []);

  // Component to render current weather cards
  const RenderCurrentWeatherCards = React.memo(({item}) => {
    const today = new Date();
    const cardDate = new Date(item?.datetime);

    let dateString = cardDate.toLocaleDateString();
    if (cardDate.getDate() === today.getDate()) {
      dateString = getTranslation(translation, selectedLanguage, 3);
    } else if (cardDate.getDate() === today.getDate() + 1) {
      dateString = getTranslation(translation, selectedLanguage, 4);
    }

    const weatherIcon = getWeatherIcon(item.conditions);
    const temp =
      temperatureUnit === 'F' ? celsiusToFahrenheit(item.temp) : item.temp;

    return (
      <TouchableOpacity
        style={[
          styles.forecastCard,
          item.datetime === selectedDayDate
            ? {backgroundColor: COLORS.primary}
            : {},
        ]}
        onPress={() => {
          setSelectedDayDate(item.datetime);
        }}>
        <Text
          style={[
            styles.forecastDate,
            item.datetime === selectedDayDate
              ? {color: COLORS.light_shade}
              : {},
          ]}>
          {dateString}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image source={weatherIcon} style={styles.forecastCondition} />
        </View>
        <Text
          style={[
            styles.forecastTempText,
            item.datetime === selectedDayDate
              ? {color: COLORS.light_shade}
              : {},
          ]}>
          {`${temp.toFixed(1)}° ${temperatureUnit}`}
        </Text>
      </TouchableOpacity>
    );
  });

  // Function to render hourly information
  const renderHourlyInfo = ({item, index}) => {
    const temp =
      temperatureUnit === 'F' ? celsiusToFahrenheit(item.temp) : item.temp;
    return <HourlyInfo data={{...item, temp, temperatureUnit}} />;
  };

  // Get hours and day data for the selected date
  const getSelectedDateHours =
    weather_data?.days?.filter(a => a.datetime == selectedDayDate)?.[0]
      ?.hours || [];
  const getSelectedDay =
    weather_data?.days?.filter(a => a.datetime == selectedDayDate)?.[0] || [];

  return (
    <View>
      <CityInfo
        city={selectedCity}
        state={selectedState}
        onSelectCity={changeCity}
        selectedLanguage={selectedLanguage}
      />

      <View style={styles.toggle}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              temperatureUnit === 'C' ? styles.activeToggle : {},
            ]}
            onPress={() => setTemperatureUnit('C')}>
            <Text
              style={[
                styles.toggleText,
                temperatureUnit === 'C' ? styles.activeText : {},
              ]}>
              °C
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              temperatureUnit === 'F' ? styles.activeToggle : {},
            ]}
            onPress={() => setTemperatureUnit('F')}>
            <Text
              style={[
                styles.toggleText,
                temperatureUnit === 'F' ? styles.activeText : {},
              ]}>
              °F
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => {
              setLangModalVisible(!langModalVisible);
            }}>
            <Text style={styles.toggleText}>
              {getTranslation(translation, selectedLanguage, 5)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {weather_loading ? (
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        ) : (
          <>
            {weather_data && (
              <FlatList
                data={weather_data.days}
                renderItem={({item}) => (
                  <RenderCurrentWeatherCards item={item} />
                )}
                keyExtractor={item => item.datetime}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
            )}

            {getSelectedDay && (
              <CurrentWeather
                currentWeather={{
                  ...getSelectedDay,
                  temp:
                    temperatureUnit === 'F'
                      ? celsiusToFahrenheit(getSelectedDay.temp)
                      : getSelectedDay.temp,
                  temperatureUnit,
                  selectedLanguage,
                  feelslike:
                    temperatureUnit === 'F'
                      ? celsiusToFahrenheit(getSelectedDay.feelslike)
                      : getSelectedDay.feelslike,
                }}
              />
            )}

            <FlatList
              data={getSelectedDateHours}
              renderItem={renderHourlyInfo}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.datetime}
              style={styles.list}
              contentContainerStyle={{alignItems: 'center'}}
            />
          </>
        )}
      </ScrollView>
      <LanguagesModal
        langModalVisible={langModalVisible}
        setLangModalVisible={setLangModalVisible}
        onSelectLang={x => {
          setSelectedLanguage(x);
          saveSelectedLanguage(x);
        }}
        selectedLanguage={selectedLanguage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  forecastContainer: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: 12,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: COLORS.dark_shade,
  },
  selectCity: {
    padding: 10,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  selectCityText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  weatherCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8,
  },
  forecastCard: {
    // width: (windowWidth * 0.4) / 2,
    height: (windowWidth * 0.65) / 2,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 40,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
    marginBottom: 8,
    marginTop: 8,
    marginHorizontal: 7,
    alignSelf: 'center',
  },
  forecastDate: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
  },
  forecastCondition: {width: 50, height: 60},

  forecastTempText: {
    color: COLORS.temp,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollFlat: {
    marginTop: 22,
    width: windowWidth,
    alignSelf: 'center',
    marginBottom: (windowWidth * 0.2) / 2,
    marginLeft: 14,
  },
  selectCityHeaderText: {color: COLORS.windSpeedText, fontStyle: 'italic'},
  list: {
    alignSelf: 'center',
    marginTop: 20,
    width: '100%',
    marginBottom: 125,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginTop: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    paddingRight: '15%',
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  toggleText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  activeText: {
    color: '#fff',
  },
});

export default WeatherForecast;
