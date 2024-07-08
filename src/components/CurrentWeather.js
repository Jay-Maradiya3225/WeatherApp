import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../Assets/theme/COLOR';
import { AppImages } from '../Assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import { getWeatherIcon } from '../utils';
const windowWidth = Dimensions.get('window').width;

const CurrentWeather = ({ currentWeather }) => {
  const currentDate = new Date();

  const currentTime = currentDate.toLocaleTimeString();
  return (
    // <View style={styles.currentWeatherContainer}>
    <LinearGradient colors={['rgb(115,230,251)', 'rgb(82,146,256)',]} start={{ x: 0.25, y: 0.25 }} end={{ x: 0.5, y: 0.75 }}
      locations={[0, 0.9]} style={styles.currentWeatherContainer}>
      <View style={styles.todayWeatherContainer}>
        <Image
          source={getWeatherIcon(currentWeather.conditions)}
          style={styles.currentWeatherIcon}
        />
        <View>
          <View style={{ position: 'absolute', top: 15 }}>
            <Text style={styles.weatherCondition}>
              {currentWeather.conditions}
            </Text>
            <Text style={styles.currentTime}>{currentTime}</Text>
          </View>
        </View>
        <View style={{ marginTop: 12, width: '40%' }}>
          <Text style={styles.todayTemp}>{currentWeather.temp}°C</Text>
          <Text style={styles.feelsLike}>
            Feel like {currentWeather.feelslike}
          </Text>
          <Image
            source={AppImages.windWave}
            style={styles.windWavePng}
          />
        </View>
      </View>
      <View style={styles.extraInfoCard}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.extraInfo}>
            <Image
              source={AppImages.heavyRain}
              style={styles.extraInfoImg}
            />
          </View>
          <Text style={styles.extraInfoText}>{currentWeather.cloudcover}%</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.extraInfo}>
            <Image
              source={AppImages.wind}
              style={styles.extraInfoImg}
            />
          </View>
          <Text style={styles.extraInfoText}>{currentWeather.windspeed}km/h</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.extraInfo}>
            <Image
              source={AppImages.sun}
              style={styles.extraInfoImg}
            />
          </View>
          <Text style={styles.extraInfoText}>{currentWeather.humidity}%</Text>
        </View>
      </View>
    </LinearGradient>
    // </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  currentWeatherContainer: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: COLORS.temp,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  todayWeatherContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: (windowWidth * 0.9) / 2,
  },
  currentWeatherIcon: {
    height: (windowWidth * 0.65) / 2,
    width: (windowWidth * 0.8) / 2,
    position: 'absolute',
    top: -30,
    left: 10,
  },
  weatherCondition: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.tempText,
    textTransform: 'uppercase',
    marginTop: 10
  },
  currentTime: {
    fontSize: 11,
    color: COLORS.white,
    textTransform: 'uppercase',
    marginTop: 5
  },
  todayTemp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.light_shade,
    marginBottom: 8,
  },
  feelsLike: {
    fontSize: 16,
    color: COLORS.white,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  windWavePng: {
    width: '60%',
    height: 40,
    // backgroundColor: 'red'
  },
  extraInfoCard: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%'
  },
  extraInfo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  extraInfoText: {
    fontSize: 12,
    color: COLORS.white,
    marginTop: 3
  },
  extraInfoImg: {
    height: '70%',
    width: '70%'
  }
});
