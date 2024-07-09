import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../Assets/theme/COLOR';
import moment from 'moment';
import { getWeatherIcon } from '../utils';
const windowWidth = Dimensions.get('window').width;

const HourlyInfo = ({ data }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{moment(data.datetime, 'HH:mm:ss').format('h:mm A')}</Text>
            <Text style={styles.tempText}>{`${data?.temp?.toFixed(1)}° ${data?.temperatureUnit}`}</Text>
            <Image
                source={getWeatherIcon(data.conditions)}
                style={styles.currentWeatherIcon}
            />
        </View>
    );
};

export default HourlyInfo;

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        height: 70,
        marginVertical: 10,
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    timeText: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    tempText: {
        fontSize: 24,
        color: COLORS.light_shade,
        fontWeight: 'bold'
    },
    currentWeatherIcon: {
        height: '80%',
        width: 80,
        marginTop: -30

    }
});
